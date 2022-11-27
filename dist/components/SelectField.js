import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View, } from 'react-native';
import { Colors, Styles } from '../constants';
import { useActionColor } from '../hooks/useActionColor';
import { useDarkTheme } from '../hooks/useDarkTheme';
import { useErrorField } from '../hooks/useErrorField';
import { Button } from './Button';
import { Dialog } from './Dialog';
import { IconButton } from './IconButton';
import { Label } from './Label';
import { SearchField } from './SearchField';
import { TagField } from './TagField';
import { Text } from './Text';
export function SelectField(props) {
    const valueKey = 'value';
    const labelKey = 'label';
    const convert = useCallback((options, query) => {
        const results = [];
        options.forEach((option) => {
            const optionValue = option[props.valueKey || valueKey];
            const optionLabel = option[props.labelKey || labelKey];
            if (!query || optionLabel.indexOf(query) !== -1) {
                results.push({
                    [valueKey]: optionValue,
                    [labelKey]: optionLabel,
                });
            }
        });
        if (props.placeholder) {
            results.unshift({
                [valueKey]: null,
                [labelKey]: props.placeholder,
            });
        }
        return results;
    }, [props.labelKey, props.placeholder, props.valueKey]);
    const correctValue = useCallback((v) => {
        const defaultValue = props.multiple ? [] : null;
        return v ?? defaultValue;
    }, [props.multiple]);
    const [query, setQuery] = useState('');
    const [value, setValue] = useState(correctValue(props.value));
    const [items, setItems] = useState(convert(props.items));
    const [filteredItems, setFilteredItems] = useState(convert(props.items, query));
    const [visible, setVisible] = useState(false);
    const [selectedValues, setSelectedValues] = useState([]);
    const [error, onErrorChange] = useErrorField(props.error);
    const getActionColor = useActionColor(props.disabled);
    const isDarkTheme = useDarkTheme();
    const onValueChange = (v) => {
        onErrorChange();
        setValue(v);
        props.onValueChange(v);
    };
    const getIndex = (v, key) => {
        return items.findIndex((item) => {
            return (item[key] || '').toString() === (v || '').toString();
        });
    };
    const getLabel = (v) => {
        const index = getIndex(v, valueKey);
        if (index >= 0) {
            return items[index][labelKey];
        }
        return '';
    };
    const getValue = (l) => {
        const index = getIndex(l, labelKey);
        if (index >= 0) {
            return items[index][valueKey];
        }
        return null;
    };
    const keyExtractor = (item) => {
        return (item[valueKey] || '').toString();
    };
    const isSelected = (v) => {
        return selectedValues.indexOf(v) !== -1;
    };
    const toggleSelection = (v) => {
        if (v === null) {
            setSelectedValues([v]);
        }
        else {
            const hasV = selectedValues.indexOf(v) !== -1;
            let newSelectedValues = selectedValues.filter((_v) => {
                return _v !== v && _v !== null;
            });
            if (!hasV) {
                if (props.multiple) {
                    newSelectedValues.push(v);
                }
                else {
                    newSelectedValues = [v];
                }
            }
            if (newSelectedValues.length === 0) {
                newSelectedValues.push(v);
            }
            setSelectedValues(newSelectedValues);
        }
    };
    const selectValue = () => {
        hideDialog();
        const values = selectedValues.filter((v) => {
            return !!v;
        });
        handleValueChanges(values);
    };
    const showDialog = () => {
        if (!props.disabled) {
            if (props.multiple) {
                const v = value.length === 0 ? [null] : value;
                setSelectedValues(v);
            }
            else {
                setSelectedValues([value]);
            }
            setFilteredItems(convert(props.items, query));
            setVisible(true);
        }
    };
    const hideDialog = () => {
        setVisible(false);
    };
    const searchInItems = (q) => {
        if (props.onSearch) {
            props.onSearch(q);
        }
        setQuery(q);
        setFilteredItems(convert(props.items, q));
    };
    const onValuesChange = (tags) => {
        const values = tags.map((tag) => {
            return getValue(tag);
        });
        handleValueChanges(values);
    };
    const handleValueChanges = (values) => {
        if (props.multiple) {
            onValueChange(values);
        }
        else {
            onValueChange(values[0] || null);
        }
    };
    const getTags = () => {
        let results = [];
        if (props.multiple) {
            results = value.map((v) => {
                return getLabel(v);
            });
        }
        else if (value) {
            results = [getLabel(value)];
        }
        return results.filter((result) => {
            return !!result;
        });
    };
    const getActionButtons = () => {
        return [
            <IconButton key={0} iconName="expand-more" containerStyle={Styles.fieldIconButton} iconColor={getActionColor()} onPress={showDialog}/>,
        ];
    };
    const selectedItemStyle = isDarkTheme
        ? styles.selectedItemDark
        : styles.selectedItemLight;
    useEffect(() => {
        setValue(correctValue(props.value));
    }, [props.value, correctValue]);
    useEffect(() => {
        setItems(convert(props.items));
        setFilteredItems(convert(props.items, query));
    }, [props.items, props.required, props.placeholder, query, convert]);
    return (<View style={[styles.container, props.containerStyle]}>
            <Label text={props.label} required={props.required} disabled={props.disabled} desc={props.desc} onPressDesc={props.onPressDesc}/>
            <TagField style={[props.style, styles.selectInput]} values={getTags()} onValuesChange={onValuesChange} onPress={showDialog} error={error} placeholder={props.placeholder} required={props.required} disabled={props.disabled} actionButtons={getActionButtons()}/>
            <Dialog visible={visible} title={props.label} onClose={hideDialog} buttons={[
            <Button key={0} title={props.okText} onPress={selectValue}/>,
        ]}>
                <SearchField value={query} onValueChange={searchInItems} placeholder={props.searchPlaceholder}/>
                <FlatList style={[
            styles.flatList,
            isDarkTheme
                ? styles.flatListDark
                : styles.flatListLight,
        ]} removeClippedSubviews={true} keyExtractor={keyExtractor} data={filteredItems} renderItem={({ item }) => (<TouchableOpacity activeOpacity={Styles.activeOpacity} onPress={() => toggleSelection(item[valueKey])}>
                            <Text style={[
                styles.itemText,
                isSelected(item[valueKey])
                    ? selectedItemStyle
                    : null,
            ]}>
                                {item[labelKey]}
                            </Text>
                        </TouchableOpacity>)}/>
            </Dialog>
        </View>);
}
const styles = StyleSheet.create({
    container: {},
    selectInput: {
        paddingRight: 40,
    },
    flatList: {
        maxHeight: 175,
        borderRadius: 3,
        borderWidth: 1,
    },
    flatListDark: {
        backgroundColor: 'rgba(255, 255, 255, .03)',
        borderColor: 'rgba(255, 255, 255, .1)',
    },
    flatListLight: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderColor: 'rgba(0, 0, 0, .1)',
    },
    itemText: {
        fontFamily: Styles.fontFamilyBodyRegular,
        fontWeight: '400',
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 3,
    },
    selectedItemLight: {
        backgroundColor: Colors.inputDefaultLight,
    },
    selectedItemDark: {
        backgroundColor: Colors.inputDefaultDark,
    },
});
//# sourceMappingURL=SelectField.js.map