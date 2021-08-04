import React from 'react';
import {StyleProp, TextInput} from 'react-native';
import styles from './SearchbarStyles';

const Searchbar: React.FunctionComponent<{style: StyleProp<any>}> = ({
  style,
}) => {
  return (
    <TextInput style={{...style, ...styles.textInput}} placeholder="Search" />
  );
};

export default Searchbar;
