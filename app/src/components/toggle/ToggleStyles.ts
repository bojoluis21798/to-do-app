import {StyleSheet} from 'react-native';
import Theme from '../../theme/Theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.white,
    borderColor: Theme.shadowGrey,
    width: 15,
    height: 15,
    marginRight: 10,
    borderWidth: 2,
  },
  toggled: {
    backgroundColor: Theme.blue,
  },
});

export default styles;
