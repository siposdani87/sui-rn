import React, { useCallback, useEffect, useMemo, useState, } from 'react';
import { FlatList, StyleSheet, Pressable, View } from 'react-native';
import { Colors, Styles } from '../constants';
import { useDarkTheme, useErrorField, useActionColor } from '../hooks';
import { Button } from './Button';
import { Dialog } from './Dialog';
import { IconButton } from './IconButton';
import { Label } from './Label';
import { SearchField } from './SearchField';
import { TagField } from './TagField';
import { Text } from './Text';
export function SelectField(props) {
    const valueKey = props.valueKey ?? 'value';
    const labelKey = props.labelKey ?? 'label';
    const convert = useCallback((options, query) => {
        const results = [];
        options.forEach((option) => {
            const optionValue = option[valueKey];
            const optionLabel = option[labelKey];
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
    }, [labelKey, props.placeholder, valueKey]);
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
    const onValueChange = useCallback((v) => {
        onErrorChange();
        setValue(v);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        props.onValueChange(v);
    }, [onErrorChange, props.onValueChange]);
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
    const getValue = useCallback((l) => {
        const index = getIndex(l, labelKey);
        if (index >= 0) {
            return items[index][valueKey];
        }
        return null;
    }, [items, labelKey, valueKey]);
    const keyExtractor = useCallback((item) => {
        return (item[valueKey] || '').toString();
    }, [valueKey]);
    const isSelected = (v) => {
        return selectedValues.indexOf(v) !== -1;
    };
    const toggleSelection = useCallback((v) => {
        if (v === null) {
            setSelectedValues([v]);
        }
        else {
            setSelectedValues((prev) => {
                const hasV = prev.indexOf(v) !== -1;
                let newSelectedValues = prev.filter((_v) => {
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
                return newSelectedValues;
            });
        }
    }, [props.multiple]);
    const hideDialog = useCallback(() => {
        setVisible(false);
    }, []);
    const handleValueChanges = useCallback((values) => {
        if (props.multiple) {
            onValueChange(values);
        }
        else {
            onValueChange(values[0] || null);
        }
    }, [props.multiple, onValueChange]);
    const selectValue = useCallback(() => {
        hideDialog();
        const values = selectedValues.filter((v) => {
            return !!v;
        });
        handleValueChanges(values);
    }, [hideDialog, selectedValues, handleValueChanges]);
    const showDialog = useCallback(() => {
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
    }, [props.disabled, props.multiple, props.items, value, query, convert]);
    const searchInItems = useCallback((q) => {
        const query = q ?? '';
        props.onSearch?.(query);
        setQuery(query);
        setFilteredItems(convert(props.items, query));
    }, [props.onSearch, props.items, convert]);
    const onValuesChange = useCallback((tags) => {
        const values = tags.map((tag) => {
            return getValue(tag);
        });
        handleValueChanges(values);
    }, [getValue, handleValueChanges]);
    const tags = useMemo(() => {
        let results = [];
        if (props.multiple) {
            results =
                value?.map?.((v) => {
                    return getLabel(v);
                }) ?? [];
        }
        else if (value) {
            results = [getLabel(value)];
        }
        return results.filter((result) => {
            return !!result;
        });
    }, [props.multiple, value, items, labelKey, valueKey]);
    const actionButtons = useMemo(() => [
        <IconButton key={0} iconName="expand-more" containerStyle={Styles.fieldIconButton} iconColor={getActionColor()} onPress={showDialog}/>,
    ], [getActionColor, showDialog]);
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
            <TagField style={[props.style, styles.selectInput]} values={tags} onValuesChange={onValuesChange} onPress={showDialog} error={error} placeholder={props.placeholder} required={props.required} disabled={props.disabled} actionButtons={actionButtons}/>
            <Dialog visible={visible} title={props.label} onClose={hideDialog} buttons={[
            <Button key={0} title={props.okText} onPress={selectValue}/>,
        ]}>
                <SearchField value={query} onValueChange={searchInItems} placeholder={props.searchPlaceholder}/>
                <FlatList style={[
            styles.flatList,
            isDarkTheme
                ? styles.flatListDark
                : styles.flatListLight,
        ]} removeClippedSubviews={true} keyExtractor={keyExtractor} data={filteredItems} renderItem={({ item }) => (<Pressable onPress={() => toggleSelection(item[valueKey])}>
                            <Text style={[
                styles.itemText,
                isSelected(item[valueKey])
                    ? selectedItemStyle
                    : null,
            ]}>
                                {item[labelKey]}
                            </Text>
                        </Pressable>)}/>
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