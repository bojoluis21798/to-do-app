import {StyleSheet} from 'react-native';
import Theme from '../../../../theme/Theme';

const styles = StyleSheet.create({
  todo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,

    borderWidth: 1,
    borderColor: Theme.shadowGrey,
  },
  todoStatus: {
    backgroundColor: Theme.blue,
    width: 15,
    height: 15,
    marginRight: 10,
  },
});

export default styles;
