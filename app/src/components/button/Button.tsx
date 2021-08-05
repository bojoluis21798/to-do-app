import React from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleProp,
  Text,
  TouchableOpacity,
} from 'react-native';
import Theme from '../../theme/Theme';
import styles from './ButtonStyles';

const Button: React.FunctionComponent<{
  disabled?: boolean;
  onPress?: (e: GestureResponderEvent) => void;
  style: StyleProp<any>;
  loading?: boolean;
}> = ({loading, children, disabled, onPress, style}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={{
        ...styles.buttonContainer,
        ...(disabled || loading ? styles.disabled : {}),
        ...style,
      }}>
      {loading ? (
        <ActivityIndicator size="small" color={Theme.white} />
      ) : typeof children === 'string' ? (
        <Text style={styles.button}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

export default Button;
