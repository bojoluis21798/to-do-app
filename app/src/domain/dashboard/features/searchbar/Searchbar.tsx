import React from 'react';
import {TextInput} from 'react-native';
import styles from './SearchbarStyles';

const Searchbar: React.FunctionComponent = () => {
  return <TextInput style={styles.textInput} placeholder="Search" />;
};

export default Searchbar;
