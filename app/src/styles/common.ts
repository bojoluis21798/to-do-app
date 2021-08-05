import {StyleSheet} from 'react-native';
import Theme from '../theme/Theme';

const common = StyleSheet.create({
  fullScreenCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    color: Theme.darkBlue,
    fontWeight: 'bold',
  },
  containWidth: {
    width: '100%',
  },
});

export default common;
