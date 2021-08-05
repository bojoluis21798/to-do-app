import {StyleSheet} from 'react-native';
import Theme from '../../../../theme/Theme';

const styles = StyleSheet.create({
  container: {
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowColor: Theme.shadowGrey,
    borderWidth: 1,
    borderColor: Theme.borderGrey,
    elevation: 5,
    padding: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
