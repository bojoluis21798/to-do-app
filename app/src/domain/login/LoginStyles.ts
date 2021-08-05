import {StyleSheet} from 'react-native';
import Theme from '../../theme/Theme';
import commonStyles from '../../styles/common';

const styles = StyleSheet.create({
  container: {
    ...commonStyles.fullScreenCenter,
    padding: 25,
  },
  title: {
    ...commonStyles.title,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    ...commonStyles.containWidth,
    marginBottom: 10,
    marginTop: 10,
  },
  loginContainer: {
    ...commonStyles.containWidth,
    marginBottom: 10,
    marginTop: 10,
  },
  createAccount: {
    color: Theme.darkBlue,
  },
});

export default styles;
