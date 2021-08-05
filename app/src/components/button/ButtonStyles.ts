import {StyleSheet} from 'react-native';
import Theme from '../../theme/Theme';

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: Theme.darkBlue,
    borderRadius: 5,
    padding: 10,
  },
  button: {
    color: Theme.white,
  },
  disabled: {
    opacity: 0.3,
  },
});

export default styles;
