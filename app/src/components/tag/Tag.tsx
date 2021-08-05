import React from 'react';
import {StyleProp, Text, TouchableOpacity, View} from 'react-native';
import styles from './TagStyles';

const Tag: React.FunctionComponent<{
  text: string;
  activeColor: string;
  active: boolean;
  style: StyleProp<any>;
}> = ({text, activeColor, active, style}) => {
  return (
    <TouchableOpacity>
      <View
        style={{
          ...style,
          ...styles.container,
          ...(active && activeColor ? {backgroundColor: activeColor} : {}),
        }}>
        <Text style={styles.active}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Tag;
