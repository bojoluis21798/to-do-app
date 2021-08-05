import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Input from '../../components/input/Input';
import styles from './LoginStyles';

const Login: React.FunctionComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>To Do App</Text>
      <Input placeholder="Email" style={styles.input} />
      <Input placeholder="Password" style={styles.input} />
      <TouchableOpacity style={styles.loginContainer}>
        <Text style={styles.login}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.createAccount}>Create an Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
