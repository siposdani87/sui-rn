import React, { useState, useEffect } from 'react';
import Label from './Label';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Colors, Styles } from '../constants';
import useErrorField from '../hooks/useErrorField';
import IconButton from './IconButton';
import Dialog from './Dialog';
import Text from './Text';
import Button from './Button';
import SearchField from './SearchField';
import TagField from './TagField';
import useDarkTheme from '../hooks/useDarkTheme';
import useActionColor from '../hooks/useActionColor';

export default function SelectField(props: { value: any, items: any, onValueChange: (_value: any) => void, okText: string, multiple?: boolean, onSearch?: (_value: any) => void, label?: string, error?: any, required?: boolean, disabled?: boolean, desc?: string, onPressDesc?: () => void, placeholder?: string, labelKey?: string, valueKey?: string, searchPlaceholder?: string, containerStyle?: any, style?: any }) {
  const valueKey = 'value';
  const labelKey = 'label';

  const [query, setQuery] = useState('');
  const [value, setValue] = useState(correctValue(props.value));
  const [items, setItems] = useState(convert(props.items));
  const [filteredItems, setFilteredItems] = useState(convert(props.items, query));
  const [visible, setVisible] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);
  const [error, onErrorChange] = useErrorField(props.error);
  const getActionColor = useActionColor(props.disabled);
  const isDarkTheme = useDarkTheme();

  useEffect(() => {
    setValue(correctValue(props.value));
  }, [props.value]);

  useEffect(() => {
    setItems(convert(props.items));
    setFilteredItems(convert(props.items, query));
  }, [props.items, props.required, props.placeholder]);

  function onValueChange(v) {
    onErrorChange();
    setValue(v);
    props.onValueChange(v);
  }

  function convert(options: any[], query?: string) {
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
  }

  function correctValue(v) {
    const defaultValue = props.multiple ? [] : null;
    return v ?? defaultValue;
  }

  function getIndex(v, key) {
    return items.findIndex((item) => {
      return (item[key] || '').toString() === (v || '').toString();
    });
  }

  function getLabel(v) {
    const index = getIndex(v, valueKey);
    if (index >= 0) {
      return items[index][labelKey];
    }
    return '';
  }

  function getValue(l){
    const index = getIndex(l, labelKey);
    if (index >= 0) {
      return items[index][valueKey];
    }
    return null;
  }

  function keyExtractor(item): string {
    return (item[valueKey] || '').toString();
  }

  function isSelected(v): boolean {
    return selectedValues.indexOf(v) !== -1;
  }

  function toggleSelection(v) {
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
  }

  function selectValue() {
    hideDialog();
    if (props.multiple) {
      onValueChange(selectedValues);
    } else {
      onValueChange(selectedValues[0] ?? null);
    }
  }

  function showDialog() {
    if (!props.disabled) {
      if (props.multiple) {
        setSelectedValues(value);
      } else {
        setSelectedValues([value]);
      }
      setFilteredItems(convert(props.items, query));
      setVisible(true);
    }
  }

  function hideDialog() {
    setVisible(false);
  }

  function searchInItems(q) {
    if (props.onSearch) {
      props.onSearch(q);
    }
    setQuery(q);
    setFilteredItems(convert(props.items, q));
  }

  function getReadonly(): boolean {
    return props.multiple ? !value[0] : !value;
  }

  function onValuesChange(values) {
    const v = values.map((_l) => {
      return getValue(_l);
    });
    if (props.multiple) {
      onValueChange(v);
    } else {
      onValueChange(v[0] ?? null);
    }
  }

  function getTags(): string[] {
    let results = [];
    if (props.multiple) {
      results = value.map((_v) => {
        return getLabel(_v);
      });
    } else {
      results = [getLabel(value)];
    }
    return results.filter((_v) => {
      return _v;
    })
  }

  function getActionButtons(): any[]{
    const actionButtons = [];
    actionButtons.push(<IconButton iconName='expand-more' containerStyle={Styles.fieldIconButton} iconColor={getActionColor()} onPress={showDialog} />);
    return actionButtons;
  }

  return (
    <View style={[styles.container, props.containerStyle]}>
      <Label text={props.label} required={props.required} disabled={props.disabled} desc={props.desc} onPressDesc={props.onPressDesc} />
      <TagField style={[props.style, styles.selectInput]} values={getTags()} onValuesChange={onValuesChange} onPress={showDialog} error={error} placeholder={props.placeholder} required={props.required} disabled={props.disabled} readonly={getReadonly()} actionButtons={getActionButtons()} />
      <Dialog visible={visible} title={props.label} onClose={hideDialog} buttons={[
        <Button key={0} title={props.okText} onPress={selectValue} />,
      ]}>
        <SearchField value={query} onValueChange={searchInItems} placeholder={props.searchPlaceholder} />
        <FlatList style={[styles.flatList, isDarkTheme ? styles.flatListDark : styles.flatListLight]} removeClippedSubviews={true} keyExtractor={keyExtractor} data={filteredItems} renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={Styles.activeOpacity} onPress={() => toggleSelection(item[valueKey])}>
            <Text style={[styles.itemText, isSelected(item[valueKey]) ? (isDarkTheme ? styles.selectedItemDark : styles.selectedItemLight) : null]}>{item[labelKey]}</Text>
          </TouchableOpacity>
        )} />
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
