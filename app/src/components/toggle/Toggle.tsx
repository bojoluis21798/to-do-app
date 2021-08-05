import React from 'react';
import {View} from 'react-native';
import styles from './ToggleStyles';

const Toggle: React.FunctionComponent<{toggled: boolean}> = ({toggled}) => {
  return (
    <View style={{...styles.container, ...(toggled ? styles.toggled : {})}} />
  );
};

export default Toggle;
