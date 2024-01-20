import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { loginFormState } from '../../data';
import { ILoginForm, IUserContext } from '../../interfaces';
import FormInput from '../Shared/Input/FormInput';
import { AiOutlineLock, AiOutlineMail } from 'react-icons/ai';
import { Link as RouterLink } from 'react-router-dom';
import BasicSpinner from '../Shared/BasicSpinner';
import { Client } from '../../util/client';
import { UserContext } from '../../context/user';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const navigate = useNavigate();
  const { stowTokens, updateUser } = useContext(UserContext) as IUserContext;
  const [form, setForm] = useState<ILoginForm>(loginFormState);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const skipConfirmPassword = (name: string, attribute: string) => {
    return name === 'confirmPassword' && attribute === 'type';
  };

  const updateField = (name: string, value: string, attribute: string) => {
    if (skipConfirmPassword(name, attribute)) return;
    setForm((prevState) => ({
      ...prevState,
      [name]: { ...prevState[name as keyof ILoginForm], [attribute]: value },
    }));
  };

  const checkForErrors = (form: ILoginForm) => {
    let errors = false;
    for (const prop of Object.keys(form)) {
      const { value, error } = form[prop as keyof ILoginForm];
      if (value.trim().length === 0 || error.length > 0) {
        setError('There are errors present');
        errors = true;
      }
    }
    return errors;
  };

  const clearErrors = () => {
    setError('');
    for (const prop of Object.keys(form)) {
      updateField(prop, '', 'error');
    }
  };

  const signIn = (form: ILoginForm) => {
    setIsLoading(true);
    Client.signIn(form)
      .then((res) => {
        const { refreshToken, token, user } = res.data;
        stowTokens({ refreshToken, token });
        updateUser(user);
        setIsLoading(false);
        navigate(`/${user.slug}/latest`);
      })
      .catch((err) => {
        setError(err.response.data.message);
        setIsLoading(false);
      });
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearErrors();
    if (checkForErrors(form)) {
      return;
    }
    signIn(form);
  };

  return (
    <Box
      minH="600px"
      width={['100%', '100%', '95%']}
      maxW="600px"
      borderRadius={8}
      p="1rem"
    >
      <Heading color="primary.light" fontSize="3rem" textAlign="left" my="5rem">
        Sign In
      </Heading>

      <form onSubmit={handleOnSubmit} style={{ paddingTop: '3rem' }}>
        <Box my="2rem">
          <FormInput
            updateField={updateField}
            name={form.email.name}
            value={form.email.value}
            error={form.email.error}
            type={form.email.type}
            label="Email"
            id="email"
            width="100%"
            errorField="Email"
            placeholder="Enter your email"
            icon={<AiOutlineMail />}
          />
        </Box>
        <Box my="2rem">
          <FormInput
            updateField={updateField}
            name={form.password.name}
            value={form.password.value}
            error={form.password.error}
            type={form.password.type}
            label="Password"
            id="password"
            width="100%"
            errorField="Password"
            placeholder="Create a password"
            icon={<AiOutlineLock />}
          />
        </Box>
        <Flex my="2rem" justify="space-between">
          <Flex color="primary.dark" fontWeight="bold">
            <RouterLink to="/forgot-password">Forgot Password?</RouterLink>
          </Flex>
          <Flex fontSize="1rem" justify="flex-end">
            <Text color="primary.light" mr="0.5rem">
              Don't have an account?
            </Text>
            <Box color="primary.dark" fontWeight="bold">
              <RouterLink to="/register">Sign Up</RouterLink>
            </Box>
          </Flex>
        </Flex>
        {error.length > 0 && (
          <Flex justify="center">
            <Text color="red">{error}</Text>
          </Flex>
        )}
        {isLoading && (
          <BasicSpinner message="Authenticating user..." color="text.primary" />
        )}
        {!isLoading && (
          <Flex mt="8rem" mb="2rem">
            <Button
              type="submit"
              height="35px"
              fontSize="1.4rem"
              colorScheme="purple"
              bg="primary.dark"
              width="100%"
            >
              Sign Up
            </Button>
          </Flex>
        )}
      </form>
    </Box>
  );
};

export default Form;
