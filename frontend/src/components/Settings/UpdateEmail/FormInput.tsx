import { FormControl, FormLabel, Input } from '@chakra-ui/react';

interface IFormInputProps {
  updateField: (name: string, value: string, attribute: string) => void;
  name: string;
  id: string;
  label: string;
  error: string;
  value: string;
  type: string;
}

const FormInput = ({ updateField, name, id, label, error, value, type }: IFormInputProps) => {
  console.log(error);
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateField(name, value, 'value');
  };

  const handleOnFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    updateField(name, '', 'error');
  };

  return (
    <FormControl mt="3rem">
      <Input
        id={id}
        name={name}
        value={value}
        type={type}
        onChange={handleOnChange}
        onFocus={handleOnFocus}
        fontSize="1.2rem"
        border="none"
        _focus={{ boxShadow: 'none' }}
        borderRadius={0}
        borderBottom="2px solid #fff"
      />
      <FormLabel htmlFor={name} mt="1rem" textTransform="uppercase">
        {label}
      </FormLabel>
    </FormControl>
  );
};

export default FormInput;
