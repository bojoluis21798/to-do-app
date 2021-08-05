import React from 'react';
import {
  NativeSyntheticEvent,
  StyleProp,
  TextInput,
  TextInputChangeEventData,
} from 'react-native';
import InputStyles from './InputStyles';

const Input: React.FunctionComponent<{
  placeholder: string;
  onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  style?: StyleProp<any>;
}> = ({style, ...props}) => {
  return <TextInput {...props} style={{...style, ...InputStyles.container}} />;
};

export default Input;
