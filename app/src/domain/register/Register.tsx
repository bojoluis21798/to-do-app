import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import Button from '../../components/button/Button';
import ErrorText from '../../components/errorText/ErrorText';
import Input from '../../components/input/Input';
import {register} from '../../service/auth';
import {FullScreen, Title} from '../../styles/common';
import messages from '../../utils/messages';
import patterns from '../../utils/patterns';
import styles from './RegisterStyles';

interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FunctionComponent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const {
    control,
    handleSubmit,
    getValues,
    formState: {isDirty, errors},
  } = useForm<RegisterForm>();

  const onSubmit = async ({confirmPassword, ...payload}: RegisterForm) => {
    try {
      setLoading(true);
      await register(payload);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(e.message);
    }
  };

  return (
    <FullScreen style={styles.container}>
      <Title style={styles.title}>Sign Up</Title>
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
            placeholder="Email Address"
            style={styles.input}
            hasErrors={invalid}
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
            hasErrors={invalid}
            secureTextEntry
            placeholder="Password"
            style={styles.input}
          />
        )}
        name="password"
        defaultValue=""
      />
      {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: messages.isRequired,
          },
          validate: confirmPass => confirmPass === getValues('password'),
        }}
        render={({field: {onChange, value}, fieldState: {invalid}}) => (
          <Input
            onChangeText={onChange}
            value={value}
            secureTextEntry
            hasErrors={invalid}
            placeholder="Confirm Password"
            style={styles.input}
          />
        )}
        name="confirmPassword"
      />
      {errors.confirmPassword && (
        <ErrorText>Confirm Password must match</ErrorText>
      )}
      {error && <ErrorText>{error}</ErrorText>}
      <Button
        loading={loading}
        onPress={handleSubmit(onSubmit)}
        disabled={!isDirty}
        style={styles.registerContainer}>
        Register
      </Button>
    </FullScreen>
  );
};

export default Register;
