import React from 'react';
import Searchbar from './features/searchbar';
import styles from './DashboardStyles';
import {ScrollView} from 'react-native';
import Todo from './features/todo/Todo';

const Dashboard: React.FunctionComponent = () => {
  return (
    <ScrollView style={styles.container}>
      <Searchbar style={styles.searchbar} />
      <Todo />
    </ScrollView>
  );
};

export default Dashboard;
