import {StyleSheet} from 'react-native';
import Theme from '../../theme/Theme';

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderWidth: 1,
    borderColor: Theme.shadowGrey,
    borderRadius: 5,
  },
  active: {
    color: Theme.white,
  },
});

export default styles;
