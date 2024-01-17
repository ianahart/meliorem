import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import FormInput from '../Shared/Input/FormInput';
import { useState } from 'react';
import { forgotPasswordForm } from '../../data';
import { IForgotPasswordForm } from '../../interfaces';
import { AiOutlineMail } from 'react-icons/ai';
import { Link as RouterLink } from 'react-router-dom';
import { Client } from '../../util/client';
import BasicSpinner from '../Shared/BasicSpinner';

const Form = () => {
  const [form, setForm] = useState<IForgotPasswordForm>(forgotPasswordForm);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const updateField = (name: string, value: string, attribute: string) => {
    setForm((prevState) => ({
      ...prevState,
      [name]: {
        ...prevState[name as keyof IForgotPasswordForm],
        [attribute]: value,
      },
    }));
  };

  const checkForErrors = (
    forgotPasswordForm: IForgotPasswordForm,
    maxLength: number
  ) => {
    let errors = false;

    for (const prop of Object.keys(forgotPasswordForm)) {
      const { value, error } =
        forgotPasswordForm[prop as keyof IForgotPasswordForm];
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

  const clearErrors = (forgotPasswordForm: IForgotPasswordForm) => {
    for (const prop of Object.keys(forgotPasswordForm)) {
      updateField(prop, '', 'error');
    }
  };

  const sendForgotPasswordEmail = (forgotPasswordForm: IForgotPasswordForm) => {
    setIsLoading(true);
    Client.sendForgotPasswordEmail(forgotPasswordForm.email.value)
      .then(() => {
        setIsLoading(false);
        setSuccessMessage(
          'Please check your inbox for a password reset email. If you do not see it check your spam folder.'
        );
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.response.data.message);
      });
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    clearErrors(form);
    if (checkForErrors(form, 200)) {
      return;
    }

    sendForgotPasswordEmail(form);
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
        <Heading mb="1rem">Forgot your password?</Heading>
        {successMessage.length <= 0 && (
          <Text>
            Please enter your email you use to sign in to{' '}
            <Box as="span" color="primary.dark" fontWeight="bold">
              Meliorem
            </Box>
          </Text>
        )}
        {error.length > 0 && (
          <Text my="2rem" fontSize="1.2rem" color="red">
            {error}
          </Text>
        )}
        {isLoading && (
          <Flex my="2rem" justify="center">
            <BasicSpinner
              color="primary.dark"
              message="Sending email... Please wait."
            />
          </Flex>
        )}
        {successMessage.length > 0 && (
          <Flex my="2rem" flexDir="column">
            <Text fontSize="1.2rem" fontWeight="bold" mb="0.5rem">
              Email was sent to: <Box as="span">{form.email.value}</Box>
            </Text>
            <Text color="primary.light" fontSize="1.2rem">
              {successMessage}
            </Text>
          </Flex>
        )}
        {!isLoading && successMessage.length <= 0 && (
          <form onSubmit={handleOnSubmit}>
            <Box my="4rem">
              <FormInput
                updateField={updateField}
                name={form.email.name}
                value={form.email.value}
                error={form.email.error}
                type={form.email.type}
                label="Your email"
                id="email"
                width="100%"
                errorField="Email"
                placeholder="Enter your email"
                icon={<AiOutlineMail />}
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
                Request password reset
              </Button>
            </Flex>
          </form>
        )}
        <Flex
          fontSize="1.2rem"
          color="primary.dark"
          justify="center"
          fontWeight="bold"
          my="3rem"
        >
          <RouterLink to="/login">Back to Sign in</RouterLink>
        </Flex>
      </Box>
    </Box>
  );
};

export default Form;
