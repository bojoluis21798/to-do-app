import React from 'react';
import styles from './DashboardStyles';
import {ScrollView} from 'react-native';
import Todo from './features/todo/Todo';
import Tags from './features/tags/Tags';

const Dashboard: React.FunctionComponent = () => {
  return (
    <ScrollView style={styles.container}>
      <Tags style={styles.tags} />
      <Todo />
    </ScrollView>
  );
};

export default Dashboard;
