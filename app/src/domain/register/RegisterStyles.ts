import {StyleSheet} from 'react-native';
import commonStyles from '../../styles/common';

const styles = StyleSheet.create({
  container: {
    ...commonStyles.fullScreenCenter,
    padding: 25,
  },
  title: {
    ...commonStyles.title,
    margin: 10,
  },
  input: {
    ...commonStyles.containWidth,
    marginBottom: 10,
    marginTop: 10,
  },
  registerContainer: {
    ...commonStyles.containWidth,
    marginBottom: 10,
    marginTop: 10,
  },
});

export default styles;
