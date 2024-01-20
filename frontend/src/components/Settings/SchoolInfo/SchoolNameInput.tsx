import {
  Box,
  useOutsideClick,
  FormControl,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react';
import { useState, useCallback, useContext, useRef, useEffect } from 'react';
import { Client } from '../../../util/client';
import { debounce } from 'lodash';
import { StudySetContext } from '../../../context/studyset';
import { IProfileContext, IStudySetContext, IUserContext } from '../../../interfaces';
import { nanoid } from 'nanoid';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { UserContext } from '../../../context/user';
import { ProfileContext } from '../../../context/profile';

const SchoolNameInput = () => {
  const { universities, handleSetUniversities } = useContext(
    StudySetContext
  ) as IStudySetContext;
  const { user } = useContext(UserContext) as IUserContext;
  const { profile } = useContext(ProfileContext) as IProfileContext;

  const [schoolName, setSchoolName] = useState('');
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const shouldRun = useRef(true);

  useOutsideClick({
    ref: dropDownRef,
    handler: (e) => {
      if (e.target === inputRef.current) return;
      setIsDropDownOpen(false);
    },
  });

  useEffect(() => {
    if (shouldRun.current && profile.id !== 0) {
      shouldRun.current = false;
      setSchoolName(profile.schoolName);
    }
  }, [shouldRun.current, profile.id, profile.schoolName, setSchoolName]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSchoolName(value);
    debouncedSearch(value);
    if (value.trim().length <= 1) {
      setIsDropDownOpen(false);
    } else {
      setIsDropDownOpen(true);
    }
  };

  const preformDebounce = debounce((query) => {
    applySearch(query);
  }, 250);

  const debouncedSearch = useCallback((query: string) => preformDebounce(query), []);

  const applySearch = (query: string) => {
    if (!query.trim().length) return;
    Client.getUniversities(query)
      .then((res) => {
        handleSetUniversities(res.data.universities);
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  const clearInput = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setSchoolName('');
    setReadOnly(false);
    updateSchoolName('');
  };

  const updateSchoolName = (name: string) => {
    Client.updateProfileSchoolName(name, user.profileId)
      .then(() => {})
      .catch((err) => {
        throw new Error(err);
      });
  };

  const handleOnSelectSchool = (name: string) => {
    setSchoolName(name);
    setIsDropDownOpen(false);
    setReadOnly(true);
    updateSchoolName(name);
  };

  return (
    <FormControl mt="3rem">
      <FormLabel
        htmlFor="schoolName"
        fontSize="1.2rem"
        display="block"
        pb="2.5rem"
        textTransform="uppercase"
      >
        Current School
      </FormLabel>
      <Box pos="relative">
        <Input
          id="schoolName"
          name="schoolName"
          ref={inputRef}
          value={schoolName}
          fontSize="1.2rem"
          onChange={handleOnChange}
          _placeholder={{ fontSize: '1.2rem' }}
          placeholder="Enter your school name"
          border="none"
          readOnly={readOnly}
          autoComplete="off"
          _focus={{ boxShadow: 'none' }}
          borderRadius={0}
          borderBottom="2px solid #fff"
        />
        {!isDropDownOpen && schoolName !== null && schoolName.trim().length > 0 && (
          <Box
            onClick={clearInput}
            pos="absolute"
            right="0"
            top="0"
            fontSize="1.5rem"
            zIndex={10}
            cursor="pointer"
          >
            <AiOutlineCloseCircle />
          </Box>
        )}
        {isDropDownOpen && universities.length > 0 && (
          <Box
            ref={dropDownRef}
            position="absolute"
            zIndex={3}
            left="0"
            width="100%"
            className="overflow-scroll"
            overflowY="auto"
            bg="rgba(0, 0, 0, 0.8)"
            height="200px"
          >
            {universities.map(({ displayName }) => {
              return (
                <Box
                  onClick={() => handleOnSelectSchool(displayName)}
                  _hover={{ background: 'primary.dark' }}
                  cursor="pointer"
                  p="0.5rem"
                  my="0.25rem"
                  key={nanoid()}
                >
                  <Text fontSize="1.2rem">{displayName}</Text>
                </Box>
              );
            })}
          </Box>
        )}
      </Box>
    </FormControl>
  );
};

export default SchoolNameInput;
