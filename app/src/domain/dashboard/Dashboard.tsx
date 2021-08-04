import React from 'react';
import Searchbar from './features/searchbar/Searchbar';
import styles from './DashboardStyles';
import {ScrollView} from 'react-native';

const Dashboard: React.FunctionComponent = () => {
  return (
    <ScrollView style={styles.container}>
      <Searchbar />
    </ScrollView>
  );
};

export default Dashboard;
