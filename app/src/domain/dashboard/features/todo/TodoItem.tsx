import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Toggle from '../../../../components/toggle/Toggle';
import styles from './TodoStyles';

const TodoItem: React.FunctionComponent = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <TouchableOpacity onPress={() => setToggle(!toggle)}>
      <View style={styles.container}>
        <Toggle toggled={toggle} />
        <Text>Hi</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TodoItem;
