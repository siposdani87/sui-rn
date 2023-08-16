import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import {
    FlatList,
    StyleProp,
    StyleSheet,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import { Colors, Styles } from '../constants';
import { useDarkTheme, useErrorField, useActionColor } from '../hooks';
import { Button } from './Button';
import { Dialog } from './Dialog';
import { ErrorValueType } from './ErrorField';
import { IconButton } from './IconButton';
import { Label } from './Label';
import { SearchField } from './SearchField';
import { TagField } from './TagField';
import { Text } from './Text';

type ValueType = any;

type LabelType = string;

export function SelectField<T, K>(
    props: {
        items: T[];
        okText: string;
        onSearch?: (value: string) => void;
        label?: string;
        error?: ErrorValueType;
        required?: boolean;
        disabled?: boolean;
        desc?: string;
        onPressDesc?: () => void;
        placeholder?: string;
        labelKey?: keyof T;
        valueKey?: keyof T;
        searchPlaceholder?: string;
        containerStyle?: StyleProp<ViewStyle>;
        style?: StyleProp<ViewStyle>;
    } & (
        | {
              multiple: true;
              value: K[] | null | undefined;
              onValueChange: (value: K[] | null | undefined) => void;
          }
        | {
              multiple?: false;
              value: K | null | undefined;
              onValueChange: (value: K | null | undefined) => void;
          }
    ),
) {
    type PropValueType = typeof props.value;
    const valueKey = props.valueKey ?? ('value' as keyof T);
    const labelKey = props.labelKey ?? ('label' as keyof T);

    const convert = useCallback(
        (options: T[], query?: string): T[] => {
            const results = [];
            options.forEach((option) => {
                const optionValue = option[valueKey] as ValueType;
                const optionLabel = option[labelKey] as LabelType;
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
            return results as T[];
        },
        [labelKey, props.placeholder, valueKey],
    );

    const correctValue = useCallback(
        (v: PropValueType): PropValueType => {
            const defaultValue = props.multiple ? [] : null;
            return v ?? defaultValue;
        },
        [props.multiple],
    );

    const [query, setQuery] = useState<string>('');
    const [value, setValue] = useState<PropValueType>(
        correctValue(props.value),
    );
    const [items, setItems] = useState<T[]>(convert(props.items));
    const [filteredItems, setFilteredItems] = useState<T[]>(
        convert(props.items, query),
    );
    const [visible, setVisible] = useState<boolean>(false);
    const [selectedValues, setSelectedValues] = useState<ValueType[]>([]);
    const [error, onErrorChange] = useErrorField(props.error);
    const getActionColor = useActionColor(props.disabled);
    const isDarkTheme = useDarkTheme();

    const onValueChange = (v: PropValueType): void => {
        onErrorChange();
        setValue(v);
        props.onValueChange(v as any);
    };

    const getIndex = (v: ValueType | LabelType, key: keyof T): number => {
        return items.findIndex((item) => {
            return (item[key] || '').toString() === (v || '').toString();
        });
    };

    const getLabel = (v: ValueType): LabelType => {
        const index = getIndex(v, valueKey);
        if (index >= 0) {
            return items[index][labelKey] as LabelType;
        }
        return '';
    };

    const getValue = (l: LabelType): ValueType => {
        const index = getIndex(l, labelKey);
        if (index >= 0) {
            return items[index][valueKey] as ValueType;
        }
        return null;
    };

    const keyExtractor = (item: T): string => {
        return (item[valueKey] || '').toString();
    };

    const isSelected = (v: ValueType): boolean => {
        return selectedValues.indexOf(v) !== -1;
    };

    const toggleSelection = (v: ValueType): void => {
        if (v === null) {
            setSelectedValues([v]);
        } else {
            const hasV = selectedValues.indexOf(v) !== -1;
            let newSelectedValues = selectedValues.filter((_v) => {
                return _v !== v && _v !== null;
            });
            if (!hasV) {
                if (props.multiple) {
                    newSelectedValues.push(v);
                } else {
                    newSelectedValues = [v];
                }
            }
            if (newSelectedValues.length === 0) {
                newSelectedValues.push(v);
            }
            setSelectedValues(newSelectedValues);
        }
    };

    const selectValue = (): void => {
        hideDialog();
        const values = selectedValues.filter((v) => {
            return !!v;
        });
        handleValueChanges(values);
    };

    const showDialog = (): void => {
        if (!props.disabled) {
            if (props.multiple) {
                const v = (value as K[]).length === 0 ? [null] : (value as K[]);
                setSelectedValues(v);
            } else {
                setSelectedValues([value]);
            }
            setFilteredItems(convert(props.items, query));
            setVisible(true);
        }
    };

    const hideDialog = (): void => {
        setVisible(false);
    };

    const searchInItems = (q: string): void => {
        props.onSearch?.(q);
        setQuery(q);
        setFilteredItems(convert(props.items, q));
    };

    const onValuesChange = (tags: string[]): void => {
        const values = tags.map((tag) => {
            return getValue(tag);
        });
        handleValueChanges(values);
    };

    const handleValueChanges = (values: K[]): void => {
        if (props.multiple) {
            onValueChange(values);
        } else {
            onValueChange(values[0] || null);
        }
    };

    const getTags = (): string[] => {
        let results: string[] = [];
        if (props.multiple) {
            results =
                (value as K[])?.map?.((v) => {
                    return getLabel(v);
                }) ?? [];
        } else if (value) {
            results = [getLabel(value)];
        }
        return results.filter((result) => {
            return !!result;
        });
    };

    const getActionButtons = (): ReactNode[] => {
        return [
            <IconButton
                key={0}
                iconName="expand-more"
                containerStyle={Styles.fieldIconButton}
                iconColor={getActionColor()}
                onPress={showDialog}
            />,
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

    return (
        <View style={[styles.container, props.containerStyle]}>
            <Label
                text={props.label}
                required={props.required}
                disabled={props.disabled}
                desc={props.desc}
                onPressDesc={props.onPressDesc}
            />
            <TagField
                style={[props.style, styles.selectInput]}
                values={getTags()}
                onValuesChange={onValuesChange}
                onPress={showDialog}
                error={error}
                placeholder={props.placeholder}
                required={props.required}
                disabled={props.disabled}
                actionButtons={getActionButtons()}
            />
            <Dialog
                visible={visible}
                title={props.label}
                onClose={hideDialog}
                buttons={[
                    <Button
                        key={0}
                        title={props.okText}
                        onPress={selectValue}
                    />,
                ]}
            >
                <SearchField
                    value={query}
                    onValueChange={searchInItems}
                    placeholder={props.searchPlaceholder}
                />
                <FlatList
                    style={[
                        styles.flatList,
                        isDarkTheme
                            ? styles.flatListDark
                            : styles.flatListLight,
                    ]}
                    removeClippedSubviews={true}
                    keyExtractor={keyExtractor}
                    data={filteredItems}
                    renderItem={({ item }: { item: T }) => (
                        <TouchableOpacity
                            activeOpacity={Styles.activeOpacity}
                            onPress={() => toggleSelection(item[valueKey])}
                        >
                            <Text
                                style={[
                                    styles.itemText,
                                    isSelected(item[valueKey])
                                        ? selectedItemStyle
                                        : null,
                                ]}
                            >
                                {item[labelKey] as LabelType}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            </Dialog>
        </View>
    );
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
