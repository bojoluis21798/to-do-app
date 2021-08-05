import React from 'react';
import {StyleProp, TextInput} from 'react-native';
import InputStyles from './InputStyles';

const Input: React.FunctionComponent<{
  placeholder: string;
  onChangeText?: (text: string) => void;
  style?: StyleProp<any>;
  value?: string | undefined;
  secureTextEntry?: boolean;
  hasErrors?: boolean;
}> = ({style, hasErrors, ...props}) => {
  return (
    <TextInput
      {...props}
      style={{
        ...style,
        ...InputStyles.container,
        ...(hasErrors ? InputStyles.hasError : {}),
      }}
    />
  );
};

export default Input;
