import { Box, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export interface IFormInputProps {
  updateField: (name: string, value: string, attribute: string) => void;
  name: string;
  icon?: React.ReactNode;
  value: string;
  error: string;
  type: string;
  label: string;
  id: string;
  width: string;
  errorField: string;
  placeholder: string;
}

const FormInput = ({
  updateField,
  name,
  icon,
  value,
  error,
  type,
  label,
  id,
  width,
  errorField,
  placeholder,
}: IFormInputProps) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateField(name, value, 'value');
  };

  const handleOnFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    updateField(name, '', 'error');
  };

  const handleOnBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = `${errorField} must be between 1 and 200 characters`;

    if (value.trim().length === 0 || value.length > 200) {
      updateField(name, error, 'error');
    }
  };

  const handlePasswordVisibility = () => {
    const password = type === 'password' ? 'text' : 'password';
    updateField('password', password, 'type');
    updateField('confirmPassword', password, 'type');
  };

  return (
    <FormControl>
      <FormLabel color="primary.dark" fontWeight="bold" fontSize="1.2rem" htmlFor={id}>
        {label}
      </FormLabel>
      <Box pos="relative">
        {icon && (
          <Box
            pos="absolute"
            zIndex={2}
            fontSize="1.4rem"
            color="gray"
            top="10px"
            left="2px"
          >
            {icon}
          </Box>
        )}
        <Input
          onChange={handleOnChange}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          _placeholder={{ color: 'gray', fontSize: '1.2rem' }}
          height="35px"
          border="none"
          bg="#fbf6f6"
          color="text.secondary"
          textIndent="1rem"
          type={type}
          name={name}
          width={width}
          id={id}
          value={value}
          placeholder={placeholder}
        />
        {name === 'password' && (
          <Box
            onClick={handlePasswordVisibility}
            pos="absolute"
            top="10px"
            right="2px"
            zIndex={2}
            cursor="pointer"
            fontSize="1.4rem"
            color="gray"
          >
            {type === 'password' ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </Box>
        )}
      </Box>
      {error.length > 0 && (
        <Text color="red" my="0.5rem">
          {error}
        </Text>
      )}
    </FormControl>
  );
};

export default FormInput;
