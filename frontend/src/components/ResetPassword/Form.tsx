import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import FormInput from '../Shared/Input/FormInput';
import { useState } from 'react';
import { resetPasswordFormState } from '../../data';
import { IResetPasswordForm } from '../../interfaces';
import { AiOutlineLock } from 'react-icons/ai';
import { Client } from '../../util/client';
import BasicSpinner from '../Shared/BasicSpinner';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { nanoid } from 'nanoid';

const Form = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token') as string;
  const id = searchParams.get('uid') as string;
  const [form, setForm] = useState<IResetPasswordForm>(resetPasswordFormState);
  const [serverErrors, setServerErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const updateField = (name: string, value: string, attribute: string) => {
    setForm((prevState) => ({
      ...prevState,
      [name]: {
        ...prevState[name as keyof IResetPasswordForm],
        [attribute]: value,
      },
    }));
  };

  const checkForErrors = (
    forgotPasswordForm: IResetPasswordForm,
    maxLength: number
  ) => {
    let errors = false;

    for (const prop of Object.keys(forgotPasswordForm)) {
      const { value, error } =
        forgotPasswordForm[prop as keyof IResetPasswordForm];
      if (
        value.trim().length === 0 ||
        value.length > maxLength ||
        error.length > 0
      ) {
        errors = true;
      }
    }
    return errors;
  };

  const clearErrors = (forgotPasswordForm: IResetPasswordForm) => {
    for (const prop of Object.keys(forgotPasswordForm)) {
      updateField(prop, '', 'error');
    }
  };

  const handleSetServerErrors = (data: any) => {
    console.log(data);
    if (Object.keys(data).includes('message')) {
      setServerErrors((prevState) => [...prevState, data.message]);
      return;
    }

    for (let prop in data) {
      setServerErrors((prevState) => [...prevState, data[prop]]);
    }
  };

  const resetPassword = (resetPasswordForm: IResetPasswordForm) => {
    const { password: newPassword, confirmPassword } = resetPasswordForm;
    setIsLoading(true);
    Client.resetPassword(
      Number.parseInt(id),
      token,
      newPassword.value,
      confirmPassword.value
    )
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        navigate('/login');
      })
      .catch((err) => {
        handleSetServerErrors(err.response.data);
        setIsLoading(false);
      });
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerErrors([]);
    clearErrors(form);
    if (checkForErrors(form, 200)) {
      return;
    }

    resetPassword(form);
  };

  return (
    <Box
      bg="#2b2b2d"
      borderRadius={8}
      minH="400px"
      width="500px"
      boxShadow="md"
      p="4rem"
    >
      <Box color="primary.light">
        <Heading mb="1rem">Reset Password</Heading>
        <Text>Your password cannot be the same as your old password</Text>
        {serverErrors.map((serverError) => {
          return (
            <Text key={nanoid()} my="0.25rem" fontSize="1.2rem" color="red">
              {serverError}
            </Text>
          );
        })}
        {isLoading && (
          <Flex my="2rem" justify="center">
            <BasicSpinner
              color="primary.dark"
              message="Resetting password... Please wait."
            />
          </Flex>
        )}
        {!isLoading && (
          <form onSubmit={handleOnSubmit}>
            <Box my="4rem">
              <FormInput
                updateField={updateField}
                name={form.password.name}
                value={form.password.value}
                error={form.password.error}
                type={form.password.type}
                label="Your new password"
                id="password"
                width="100%"
                errorField="New passowrd"
                placeholder="Enter your new password"
                icon={<AiOutlineLock />}
              />
              <FormInput
                updateField={updateField}
                name={form.confirmPassword.name}
                value={form.confirmPassword.value}
                error={form.confirmPassword.error}
                type={form.confirmPassword.type}
                label="Confirm password"
                id="confirmPassword"
                width="100%"
                errorField="Confirm passowrd"
                placeholder="Retype your new password"
                icon={<AiOutlineLock />}
              />
            </Box>
            <Flex>
              <Button
                type="submit"
                width="100%"
                height="35px"
                fontSize="1.2rem"
                colorScheme="purple"
              >
                Reset password
              </Button>
            </Flex>
          </form>
        )}
      </Box>
    </Box>
  );
};

export default Form;
