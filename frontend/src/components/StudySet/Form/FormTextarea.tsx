import { FormControl, FormLabel, Text, Textarea } from '@chakra-ui/react';

export interface IFormTextareaProps {
  updateField: (name: string, value: string, attribute: string) => void;
  name: string;
  value: string;
  error: string;
  label: string;
  maxLength: number;
  height: string;
}

const FormTextarea = ({
  updateField,
  name,
  value,
  error,
  label,
  maxLength = 200,
  height = '80px',
}: IFormTextareaProps) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateField(name, value, 'value');
  };

  const handleOnFocus = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name } = e.target;
    updateField(name, '', 'error');
  };

  const handleOnBlur = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (value.trim().length === 0 || value.length > maxLength) {
      const error = `${name} must be between 1 and ${maxLength} characters`;
      updateField(name, error, 'error');
    }
  };

  return (
    <FormControl
      _focus={{ borderBottom: '3px solid #864af9' }}
      my="2.5rem"
      bg="form.primary"
      p="0.5rem"
      pl="1.5rem"
      borderRadius={8}
    >
      <FormLabel fontWeight="bold" fontSize="1.2rem" htmlFor={name} m="0">
        {label}
      </FormLabel>
      <Textarea
        onChange={handleOnChange}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        _focus={{ boxShadow: 'none' }}
        height={height}
        fontWeight="bold"
        fontSize="1.4rem"
        id={name}
        name={name}
        value={value}
        border="none"
        resize="none"
        overflow="hidden"
      />
      {error.length > 0 && <Text color="red">{error}</Text>}
    </FormControl>
  );
};

export default FormTextarea;
