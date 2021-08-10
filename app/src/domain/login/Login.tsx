import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Link} from 'react-router-native';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import styles from './LoginStyles';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import patterns from '../../utils/patterns';
import messages from '../../utils/messages';
import ErrorText from '../../components/errorText/ErrorText';
import {ColoredText, FullScreen, Title} from '../../styles/common';

interface LoginForm {
  email: string;
  password: string;
}

const Login: React.FunctionComponent = () => {
  const {
    control,
    handleSubmit,
    formState: {isDirty, errors},
  } = useForm<LoginForm>();

  const onSubmit: SubmitHandler<LoginForm> = data => console.log(data);

  return (
    <FullScreen style={styles.container}>
      <Title style={styles.title}>Just a simple to do app</Title>
      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: messages.isRequired,
          },
          pattern: {
            value: patterns.email,
            message: messages.emailInvalid,
          },
        }}
        render={({field: {onChange, value}, fieldState: {invalid}}) => (
          <Input
            onChangeText={onChange}
            value={value}
            hasErrors={invalid}
            placeholder="Email"
            style={styles.input}
          />
        )}
        name="email"
        defaultValue=""
      />
      {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: messages.isRequired,
          },
          pattern: {
            value: patterns.password,
            message: messages.invalidPassword,
          },
        }}
        render={({field: {onChange, value}, fieldState: {invalid}}) => (
          <Input
            onChangeText={onChange}
            value={value}
            placeholder="Password"
            style={styles.input}
            hasErrors={invalid}
            secureTextEntry
          />
        )}
        name="password"
        defaultValue=""
      />
      {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
      <Button
        disabled={!isDirty}
        onPress={handleSubmit(onSubmit)}
        style={styles.loginContainer}>
        Login
      </Button>
      <Link to="/register" component={TouchableOpacity}>
        <ColoredText>Create an Account</ColoredText>
      </Link>
    </FullScreen>
  );
};

export default Login;
