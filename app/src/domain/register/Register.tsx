import React from 'react';
import {Text, View} from 'react-native';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import styles from './RegisterStyles';

const Register: React.FunctionComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Input placeholder="Email Address" style={styles.input} />
      <Input placeholder="Password" style={styles.input} />
      <Input placeholder="Confirm Password" style={styles.input} />
      <Button disabled style={styles.registerContainer}>
        Register
      </Button>
    </View>
  );
};

export default Register;
