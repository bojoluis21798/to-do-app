import React from 'react';
import {Text, View} from 'react-native';
import styles from './TodoStyles';

const Todo: React.FunctionComponent = () => {
  return (
    <View style={styles.todo}>
      <View style={styles.todoStatus} />
      <Text>Hi</Text>
    </View>
  );
};

export default Todo;
