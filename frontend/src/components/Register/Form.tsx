import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { registerFormState } from '../../data';
import { IRegisterForm } from '../../interfaces';
import FormInput from '../Shared/Input/FormInput';
import { AiOutlineLock, AiOutlineMail, AiOutlineUser } from 'react-icons/ai';
import { Link as RouterLink } from 'react-router-dom';

const Form = () => {
  const [form, setForm] = useState<IRegisterForm>(registerFormState);

  const updateField = (name: string, value: string, attribute: string) => {
    setForm((prevState) => ({
      ...prevState,
      [name]: { ...prevState[name as keyof IRegisterForm], [attribute]: value },
    }));
  };

  return (
    <Box
      minH="600px"
      width={['100%', '100%', '95%']}
      maxW="600px"
      borderRadius={8}
      p="1rem"
    >
      <Heading color="primary.dark" fontSize="3rem" textAlign="left" my="2rem" mt="auto">
        Sign up
      </Heading>
      <form style={{ paddingTop: '3rem' }}>
        <Box my="2rem">
          <FormInput
            updateField={updateField}
            name={form.firstName.name}
            value={form.firstName.value}
            error={form.firstName.error}
            type={form.firstName.type}
            label="First Name"
            id="firstName"
            width="100%"
            errorField="First name"
            placeholder="Enter your first name"
            icon={<AiOutlineUser />}
          />
        </Box>
        <Box my="2rem">
          <FormInput
            updateField={updateField}
            name={form.lastName.name}
            value={form.lastName.value}
            error={form.lastName.error}
            type={form.lastName.type}
            label="Last Name"
            id="lastName"
            width="100%"
            errorField="Last name"
            placeholder="Enter your last name"
            icon={<AiOutlineUser />}
          />
        </Box>
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
        <Box my="2rem">
          <FormInput
            updateField={updateField}
            name={form.confirmPassword.name}
            value={form.confirmPassword.value}
            error={form.confirmPassword.error}
            type={form.confirmPassword.type}
            label="Confirm Password"
            id="confirmPassword"
            width="100%"
            errorField="Confirm password"
            placeholder="Retype your password"
            icon={<AiOutlineLock />}
          />
        </Box>
        <Flex my="2rem" fontSize="1rem" justify="flex-end">
          <Text mr="0.5rem">Already have an account?</Text>
          <Box color="primary.light" fontWeight="bold">
            <RouterLink to="/login">Sign In</RouterLink>
          </Box>
        </Flex>
        <Flex mt="8rem" mb="2rem">
          <Button
            type="submit"
            height="35px"
            fontSize="1.4rem"
            colorScheme="purple"
            bg="primary.light"
            width="100%"
          >
            Sign Up
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default Form;
