import { useContext, useCallback } from 'react';
import { IStudySetContext, IStudySetForm, IUserContext } from '../../interfaces';
import { StudySetContext } from '../../context/studyset';
import FormInput from './FormInput';
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Select,
  Text,
} from '@chakra-ui/react';
import FormTextarea from './FormTextarea';
import { debounce } from 'lodash';
import { Client } from '../../util/client';
import StudySetCards from './StudySetCards';
import { IoSettingsOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/user';
import { studySetFormCards, studySetFormState } from '../../data';

type TStudySetForm = Omit<IStudySetForm, 'cards'>;

const Form = () => {
  const {
    studySetForm,
    setStudySetForm,
    universities,
    studySetFolders,
    handleSetStudySetFolders,
    handleSetUniversities,
    handleSetStudySetForm,
  } = useContext(StudySetContext) as IStudySetContext;
  const folderLimit = 10;
  const folderPage = -1;
  const navigate = useNavigate();
  const { user } = useContext(UserContext) as IUserContext;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const updateField = (name: string, value: string, attribute: string) => {
    const updatedForm = {
      ...studySetForm,
      [name]: { ...studySetForm[name as keyof IStudySetForm], [attribute]: value },
    };
    setStudySetForm(updatedForm);
  };

  const preformDebounce = debounce((name, query) => {
    applySearch(name, query);
  }, 250);

  const debouncedSearch = useCallback(
    (name: string, query: string) => preformDebounce(name, query),
    []
  );

  const getUniversities = (query: string) => {
    Client.getUniversities(query)
      .then((res) => {
        handleSetUniversities(res.data.universities);
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  const getFolders = (query: string) => {
    Client.getStudySetFolders(query, folderLimit, folderPage, 'next')
      .then((res) => {
        handleSetStudySetFolders(res.data.studySetFolders);
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  const applySearch = (name: string, query: string) => {
    if (name === 'schoolName' && query.trim().length) {
      getUniversities(query);
      return;
    }
    if (name === 'folder' && query.trim().length) {
      getFolders(query);
    }
  };

  const clearEmptyStudySetCards = () => {
    const cards = [...studySetForm.cards]
      .filter(
        ({ term, definition }) =>
          term.trim().length !== 0 && definition.trim().length !== 0
      )
      .map((card, index) => {
        return { ...card, order: index };
      });

    handleSetStudySetForm({ ...studySetForm, cards });
  };

  const checkForErrors = () => {
    let errors = false;
    const exclude = ['cards'];
    for (const prop of Object.keys(studySetForm)) {
      if (!exclude.includes(prop)) {
        const { value, error } = studySetForm[prop as keyof TStudySetForm];
        if (value.trim().length === 0 || error.length > 0) {
          errors = true;
        }
      }
    }

    return errors;
  };

  const createStudySet = () => {
    const data = {
      title: studySetForm.title.value,
      folder: studySetForm.folder.value,
      schoolName: studySetForm.schoolName.value,
      description: studySetForm.description.value,
      course: studySetForm.course.value,
      visibility: studySetForm.visibility.value,
      cards: studySetForm.cards,
    };

    Client.createStudySet(data)
      .then(() => {
        handleSetStudySetForm({ ...studySetFormState, cards: [...studySetFormCards] });
        navigate(`/${user.slug}/latest`);
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearEmptyStudySetCards();
    if (checkForErrors()) {
      return;
    }
    createStudySet();
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <FormInput
        updateField={updateField}
        name={studySetForm.folder.name}
        value={studySetForm.folder.value}
        error={studySetForm.folder.error}
        debouncedSearch={debouncedSearch}
        label="Folder"
        hasDropDown={true}
        data={studySetFolders}
        dataKey="folder"
        maxLength={200}
      />
      <FormInput
        updateField={updateField}
        name={studySetForm.title.name}
        value={studySetForm.title.value}
        error={studySetForm.title.error}
        label="Title"
        hasDropDown={false}
        data={[]}
        dataKey=""
        maxLength={200}
      />
      <Flex
        flexDir={['column', 'column', 'row']}
        as="section"
        justify={['unset', 'unset', 'space-between']}
        width="100%"
      >
        <Box width={['100%', '100%', '50%']} mr="1rem">
          <FormTextarea
            updateField={updateField}
            name={studySetForm.description.name}
            value={studySetForm.description.value}
            error={studySetForm.description.error}
            label="Description"
            maxLength={300}
            height="105px"
          />
        </Box>
        <Box width={['100%', '100%', '50%']}>
          <FormInput
            updateField={updateField}
            name={studySetForm.schoolName.name}
            value={studySetForm.schoolName.value}
            error={studySetForm.schoolName.error}
            label="School Name"
            debouncedSearch={debouncedSearch}
            hasDropDown={true}
            data={universities}
            dataKey="displayName"
            maxLength={200}
          />
          <FormInput
            updateField={updateField}
            name={studySetForm.course.name}
            value={studySetForm.course.value}
            error={studySetForm.course.error}
            label="Course"
            hasDropDown={false}
            data={[]}
            dataKey=""
            maxLength={200}
          />
        </Box>
      </Flex>
      <Flex justify="flex-end" align="center" p="1rem" mx="2rem">
        <Flex
          onClick={onOpen}
          cursor="pointer"
          justify="center"
          align="center"
          width="40px"
          height="40px"
          fontSize="3rem"
          bg="rgba(0,0,0,0.5)"
          borderRadius={50}
        >
          <IoSettingsOutline />
        </Flex>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent minH="300px">
            <ModalHeader color="#fff" bg="#343437">
              Options
            </ModalHeader>
            <ModalCloseButton color="#fff" />
            <ModalBody
              bg="#28282a"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDir="column"
            >
              <Text color="#fff" mb="0.5rem" textTransform="uppercase">
                Visible To
              </Text>
              <Select
                defaultValue={studySetForm.visibility.value}
                onChange={(e) =>
                  updateField(studySetForm.visibility.name, e.target.value, 'value')
                }
                borderColor="border.primary"
                color="primary.dark"
                fontSize="1.2rem"
              >
                <option value="me">Just Me</option>
                <option value="everyone">Everyone</option>
              </Select>
            </ModalBody>

            <ModalFooter bg="#28282a">
              <Button
                colorScheme="purple"
                width="100%"
                height="35px"
                mr={3}
                textTransform="uppercase"
                fontSize="1.2rem"
                onClick={onClose}
              >
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
      <Box my="5rem">
        <StudySetCards />
      </Box>
      <Flex justify="flex-end">
        <Button
          type="submit"
          height="35px"
          colorScheme="purple"
          fontSize="1.4rem"
          width="100px"
          size="lg"
        >
          Create
        </Button>
      </Flex>
    </form>
  );
};

export default Form;
