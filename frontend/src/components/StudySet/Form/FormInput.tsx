import {
  Flex,
  useOutsideClick,
  FormControl,
  FormLabel,
  Input,
  Text,
  Box,
} from '@chakra-ui/react';
import { useRef, useState, useContext } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { StudySetContext } from '../../../context/studyset';
import { IStudySetContext } from '../../../interfaces';
import { nanoid } from 'nanoid';

export interface IFormInputProps {
  updateField: (name: string, value: string, attribute: string) => void;
  name: string;
  value: string;
  error: string;
  label: string;
  data: any[];
  dataKey: string;
  maxLength: number;
  hasDropDown: boolean;
  debouncedSearch?: (name: string, query: string) => void;
}

const FormInput = ({
  updateField,
  name,
  value,
  error,
  label,
  data,
  dataKey,
  hasDropDown,
  debouncedSearch,
  maxLength = 200,
}: IFormInputProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { handleSetUniversities } = useContext(StudySetContext) as IStudySetContext;
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useOutsideClick({
    ref: ref,
    handler: (e) => {
      if (e.target === inputRef.current) return;
      setDropdownOpen(false);
    },
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateField(name, value, 'value');
    if (debouncedSearch !== undefined) {
      debouncedSearch(name, value);
    }
  };

  const handleOnFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    updateField(name, '', 'error');
    setDropdownOpen(true);
  };

  const handleOnBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value.trim().length === 0 || value.length > maxLength) {
      const error = `${name} must be between 1 and ${maxLength} characters`;
      updateField(name, error, 'error');
    }
  };

  const handleOnClick = (name: string, item: string) => {
    updateField(name, item, 'value');
    setDropdownOpen(false);
    handleSetUniversities([]);
  };

  return (
    <FormControl
      py="0.5rem"
      _focus={{ borderBottom: '3px solid #864af9' }}
      my="2.5rem"
      bg="form.primary"
      borderRadius={8}
      pos="relative"
    >
      {hasDropDown && value.length > 0 && !dropdownOpen && (
        <Flex
          cursor="pointer"
          onClick={() => handleOnClick(name, '')}
          pos="absolute"
          top="0"
          right="0"
          p="0.5rem"
          fontSize="2rem"
        >
          <AiOutlineCloseCircle />
        </Flex>
      )}

      <FormLabel pl="1.5rem" fontWeight="bold" fontSize="1.2rem" htmlFor={name} m="0">
        {label}
      </FormLabel>
      <Box pos="relative" pl="1.5rem">
        <Input
          ref={inputRef}
          pointerEvents={
            value.length > 0 && hasDropDown && !dropdownOpen ? 'none' : 'unset'
          }
          onChange={handleOnChange}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          autoComplete="off"
          _focus={{ boxShadow: 'none' }}
          fontWeight="bold"
          fontSize="1.4rem"
          id={name}
          name={name}
          value={value}
          type="text"
          border="none"
        />
        {error.length > 0 && <Text color="red">{error}</Text>}
        {dropdownOpen && data.length > 0 && (
          <Box
            ref={ref}
            borderBottomRadius={8}
            padding="0.5rem"
            background="rgba(0,0,0, 0.8)"
            width="100%"
            left="0"
            height="120px"
            zIndex={5}
            className="overflow-scroll"
            pos="absolute"
            overflowY="auto"
          >
            {data.map((item) => {
              return (
                <Text
                  key={nanoid()}
                  cursor="pointer"
                  fontWeight="bold"
                  borderBottom="3px solid transparent"
                  _hover={{ borderColor: 'primary.dark' }}
                  fontSize="1.3rem"
                  my="1rem"
                  onClick={() => handleOnClick(name, item[dataKey])}
                >
                  {item[dataKey]}
                </Text>
              );
            })}
          </Box>
        )}
      </Box>
    </FormControl>
  );
};

export default FormInput;
