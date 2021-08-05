import React from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  Text,
  TouchableOpacity,
} from 'react-native';
import styles from './ButtonStyles';

const Button: React.FunctionComponent<{
  disabled?: boolean;
  onPress?: (e: GestureResponderEvent) => void;
  style: StyleProp<any>;
}> = ({children, disabled, onPress, style}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        ...styles.buttonContainer,
        ...(disabled ? styles.disabled : {}),
        ...style,
      }}>
      {typeof children === 'string' ? (
        <Text style={styles.button}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

export default Button;
