import {StyleSheet} from 'react-native';
import Theme from '../../theme/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },
  title: {
    fontSize: 30,
    margin: 10,
    color: Theme.darkBlue,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    marginBottom: 10,
    marginTop: 10,
  },
  loginContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: Theme.darkBlue,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  login: {
    color: Theme.white,
  },
  createAccount: {
    color: Theme.darkBlue,
  },
});

export default styles;
