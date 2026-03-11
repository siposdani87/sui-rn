import React, {
    ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { FlatList, StyleSheet, Pressable, View } from 'react-native';
import { Colors, Styles, Tokens } from '../constants';
import { useDarkTheme, useErrorField, useActionColor } from '../hooks';
import { Button } from './Button';
import { Dialog } from './Dialog';
import { IconButton } from './IconButton';
import { Label } from './Label';
import { SearchField } from './SearchField';
import { TagField } from './TagField';
import { Text } from './Text';
import { BaseFieldProps } from './BaseFieldProps';

type LabelType = string;

export function SelectField<T, K>(
    props: BaseFieldProps & {
        items: T[];
        okText: string;
        onSearch?: (value: string) => void;
        placeholder?: string;
        labelKey?: keyof T;
        valueKey?: keyof T;
        searchPlaceholder?: string;
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
    type ValueType = K | null;
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

    const onValueChange = useCallback(
        (v: PropValueType): void => {
            onErrorChange();
            setValue(v);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (props.onValueChange as (value: any) => void)(v);
        },
        [onErrorChange, props.onValueChange],
    );

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

    const getValue = useCallback(
        (l: LabelType): ValueType => {
            const index = getIndex(l, labelKey);
            if (index >= 0) {
                return items[index][valueKey] as ValueType;
            }
            return null;
        },
        [items, labelKey, valueKey],
    );

    const keyExtractor = useCallback(
        (item: T): string => {
            return (item[valueKey] || '').toString();
        },
        [valueKey],
    );

    const isSelected = (v: ValueType): boolean => {
        return selectedValues.indexOf(v) !== -1;
    };

    const toggleSelection = useCallback(
        (v: ValueType): void => {
            if (v === null) {
                setSelectedValues([v]);
            } else {
                setSelectedValues((prev) => {
                    const hasV = prev.indexOf(v) !== -1;
                    let newSelectedValues = prev.filter((_v) => {
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
                    return newSelectedValues;
                });
            }
        },
        [props.multiple],
    );

    const hideDialog = useCallback((): void => {
        setVisible(false);
    }, []);

    const handleValueChanges = useCallback(
        (values: K[]): void => {
            if (props.multiple) {
                onValueChange(values);
            } else {
                onValueChange(values[0] || null);
            }
        },
        [props.multiple, onValueChange],
    );

    const selectValue = useCallback((): void => {
        hideDialog();
        const values = selectedValues.filter((v) => {
            return !!v;
        });
        handleValueChanges(values as K[]);
    }, [hideDialog, selectedValues, handleValueChanges]);

    const showDialog = useCallback((): void => {
        if (!props.disabled) {
            if (props.multiple) {
                const v = (value as K[]).length === 0 ? [null] : (value as K[]);
                setSelectedValues(v);
            } else {
                setSelectedValues([value as ValueType]);
            }
            setFilteredItems(convert(props.items, query));
            setVisible(true);
        }
    }, [props.disabled, props.multiple, props.items, value, query, convert]);

    const searchInItems = useCallback(
        (q: string | null | undefined): void => {
            const query = q ?? '';
            props.onSearch?.(query);
            setQuery(query);
            setFilteredItems(convert(props.items, query));
        },
        [props.onSearch, props.items, convert],
    );

    const onValuesChange = useCallback(
        (tags: string[]): void => {
            const values = tags.map((tag) => {
                return getValue(tag);
            });
            handleValueChanges(values as K[]);
        },
        [getValue, handleValueChanges],
    );

    const tags = useMemo((): string[] => {
        let results: string[] = [];
        if (props.multiple) {
            results =
                (value as K[])?.map?.((v) => {
                    return getLabel(v);
                }) ?? [];
        } else if (value) {
            results = [getLabel(value as ValueType)];
        }
        return results.filter((result) => {
            return !!result;
        });
    }, [props.multiple, value, items, labelKey, valueKey]);

    const actionButtons = useMemo(
        (): ReactNode[] => [
            <IconButton
                key={0}
                iconName="expand-more"
                containerStyle={Styles.fieldIconButton}
                iconColor={getActionColor()}
                onPress={showDialog}
            />,
        ],
        [getActionColor, showDialog],
    );

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
                values={tags}
                onValuesChange={onValuesChange}
                onPress={showDialog}
                error={error}
                placeholder={props.placeholder}
                required={props.required}
                disabled={props.disabled}
                actionButtons={actionButtons}
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
                        <Pressable
                            onPress={() =>
                                toggleSelection(item[valueKey] as ValueType)
                            }
                        >
                            <Text
                                style={[
                                    styles.itemText,
                                    isSelected(item[valueKey] as ValueType)
                                        ? selectedItemStyle
                                        : null,
                                ]}
                            >
                                {item[labelKey] as LabelType}
                            </Text>
                        </Pressable>
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
        maxHeight: Tokens.selectListMaxHeight,
        borderRadius: Tokens.borderRadiusInput,
        borderWidth: Tokens.inputBorderWidth,
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
        fontWeight: Tokens.fontWeightRegular,
        fontSize: Tokens.fontSizeBody,
        paddingHorizontal: Tokens.inputPaddingHorizontal,
        paddingVertical: Tokens.spacingSm,
        borderRadius: Tokens.borderRadiusInput,
    },
    selectedItemLight: {
        backgroundColor: Colors.inputDefaultLight,
    },
    selectedItemDark: {
        backgroundColor: Colors.inputDefaultDark,
    },
});
