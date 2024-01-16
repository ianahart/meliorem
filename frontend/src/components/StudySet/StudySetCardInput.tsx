import { FormControl, FormLabel, Input } from '@chakra-ui/react';

export interface IStudySetCardInputProps {
  label: string;
  placeHolder: string;
  color: string;
  value: string;
  name: string;
  updateField: (name: string, value: string) => void;
}

const StudySetCardInput = ({
  label,
  placeHolder,
  color,
  value,
  name,
  updateField,
}: IStudySetCardInputProps) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateField(name, value);
  };

  return (
    <FormControl>
      <Input
        onChange={handleOnChange}
        value={value}
        name={name}
        id={name}
        color={color}
        fontSize="1.2rem"
        border="none"
        borderRadius={0}
        borderBottom="3px solid #fff"
        type="text"
        _focus={{ boxShadow: 'none' }}
        placeholder={placeHolder}
        _placeholder={{ color: '#f4f4f4', fontSize: '1.2rem' }}
      />
      <FormLabel fontWeight="bold" mt="0.5rem" htmlFor={name}>
        {label}
      </FormLabel>
    </FormControl>
  );
};

export default StudySetCardInput;
