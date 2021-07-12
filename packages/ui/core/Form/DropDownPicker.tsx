import React, {useState} from 'react';
import styled, {DefaultTheme, css} from 'styled-components/native';
import DropDownPicker from 'react-native-dropdown-picker';

export type ValueType = string | number | boolean;

interface DropDownItem {
  label: string;
  value: string;
}

interface DropDownProps {
  items: DropDownItem[];
  placeholder: string;
  value: string;
  onChange: (callback: (state: ValueType | ValueType[] | null) => ValueType | ValueType[] | null) => void;
}

type DropDownComponentType = React.FC<DropDownProps & {theme: DefaultTheme}>;

const DropDown: DropDownComponentType = ({items, placeholder, value, onChange}) => {
  const [genderOpen, setGenderOpen] = useState(false);
  return (
    <DropDownPicker
      items={[
        {
          label: items[0].label,
          value: items[0].value,
        },
        {
          label: items[1].label,
          value: items[1].value,
        },
      ]}
      placeholder={placeholder}
      value={value}
      open={genderOpen}
      setOpen={open => {
        setGenderOpen(open);
      }}
      setValue={onChange}
    />
  );
};

export default DropDown as React.FC<DropDownProps>;
