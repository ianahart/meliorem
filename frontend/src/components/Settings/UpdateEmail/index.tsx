import { Box, Button, Divider, Heading, Text } from '@chakra-ui/react';
import SettingsTitle from '../SettingsTitle';
import SettingsContent from '../SettingsContent';
import SettingsContainer from '../SettingsContainer';
import { AiOutlineMail } from 'react-icons/ai';
import { useContext, useState } from 'react';
import { UserContext } from '../../../context/user';
import {
  IProfileContext,
  IStudySetContext,
  IUpdateEmailForm,
  IUserContext,
} from '../../../interfaces';
import { profileState, studySetFormState, updateEmailFormState } from '../../../data';
import FormInput from './FormInput';
import { ProfileContext } from '../../../context/profile';
import { StudySetContext } from '../../../context/studyset';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { Client } from '../../../util/client';

const UpdateEmail = () => {
  const navigate = useNavigate();
  const { user, updateUser, logout } = useContext(UserContext) as IUserContext;
  const { handleSetProfile } = useContext(ProfileContext) as IProfileContext;
  const { handleSetStudySetForm } = useContext(StudySetContext) as IStudySetContext;

  const [form, setForm] = useState<IUpdateEmailForm>(updateEmailFormState);
  const [errors, setErrors] = useState<string[]>([]);

  const goToResetPassword = () => {
    logout();
    handleSetProfile(profileState);
    handleSetStudySetForm(studySetFormState);

    navigate('/forgot-password');
  };

  const updateField = (name: string, value: string, attribute: string) => {
    setForm((prevState) => ({
      ...prevState,
      [name]: { ...prevState[name as keyof IUpdateEmailForm], [attribute]: value },
    }));
  };

  const validate = (form: IUpdateEmailForm) => {
    const { email, password } = form;
    let errors = false;

    [email, password].forEach((field) => {
      const isValid = !(field.value.trim().length === 0 || field.value.length > 200);
      if (!isValid) {
        const error = `${field.name} must be between 1 and 200 characters`;
        setErrors((prevState) => [...prevState, error]);
        errors = true;
      }
    });
    return !errors;
  };

  const setServerErrors = <T extends object>(data: T) => {
    for (let prop in data) {
      setErrors((prevState) => [...prevState, data[prop] as string]);
    }
  };

  const updateUserEmail = (form: IUpdateEmailForm) => {
    const email = form.email.value;
    const password = form.password.value;

    Client.updateUserEmail(email, password, user.id)
      .then((res) => {
        const updatedUser = { ...user, email: res.data.email };
        updateUser(updatedUser);
      })
      .catch((err) => {
        setServerErrors(err.response.data);
        throw new Error(err);
      });
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setErrors([]);
    e.preventDefault();
    if (!validate(form)) {
      return;
    }
    updateUserEmail(form);
  };

  return (
    <SettingsContainer>
      <SettingsTitle>
        <Box color="#fff" fontSize="3rem">
          <AiOutlineMail />
        </Box>
        <Heading as="h4" textAlign="center">
          Change your Email
        </Heading>
      </SettingsTitle>
      <SettingsContent>
        <Heading fontSize="2rem" as="h2">
          Update your email address
        </Heading>
        <Box my="1.5rem">
          <Text fontSize="1.2rem">Your email is currently {user.email}</Text>
        </Box>
        <Divider orientation="horizontal" />
        <Box as="section" mt="3rem">
          {errors.map((error) => {
            return (
              <Text key={nanoid()} color="red">
                {error}
              </Text>
            );
          })}
        </Box>

        <Box as="section" my="2rem">
          <form onSubmit={handleOnSubmit}>
            <FormInput
              updateField={updateField}
              name={form.email.name}
              id={form.email.name}
              label="New Email"
              error={form.email.error}
              value={form.email.value}
              type={form.email.type}
            />
            <FormInput
              updateField={updateField}
              name={form.password.name}
              id={form.password.name}
              label="Meliorem password"
              error={form.password.error}
              value={form.password.value}
              type={form.password.type}
            />
            <Box as="section">
              <Button type="submit" size="lg" colorScheme="purple" my="2rem">
                Submit
              </Button>
              <Text my="2rem">
                If your forgot your password you can
                <Box
                  cursor="pointer"
                  onClick={goToResetPassword}
                  color="primary.dark"
                  ml="0.3rem"
                  fontWeight="bold"
                  as="span"
                >
                  reset your password
                </Box>
              </Text>
            </Box>
          </form>
        </Box>
      </SettingsContent>
    </SettingsContainer>
  );
};

export default UpdateEmail;
