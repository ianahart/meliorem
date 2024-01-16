import { useContext, useCallback } from 'react';
import { IStudySetContext, IStudySetForm } from '../../interfaces';
import { StudySetContext } from '../../context/studyset';
import FormInput from './FormInput';
import { Box, Flex } from '@chakra-ui/react';
import FormTextarea from './FormTextarea';
import { debounce } from 'lodash';
import { Client } from '../../util/client';

const Form = () => {
  const { studySetForm, setStudySetForm, universities, handleSetUniversities } =
    useContext(StudySetContext) as IStudySetContext;

  const updateField = (name: string, value: string, attribute: string) => {
    const updatedForm = {
      ...studySetForm,
      [name]: { ...studySetForm[name as keyof IStudySetForm], [attribute]: value },
    };
    setStudySetForm(updatedForm);
  };

  const preformDebounce = debounce((query) => {
    applySearch(query);
  }, 250);

  const debouncedSearch = useCallback((query: string) => preformDebounce(query), []);

  const applySearch = (query: string) => {
    Client.getUniversities(query)
      .then((res) => {
        handleSetUniversities(res.data.universities);
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  return (
    <form>
      <FormInput
        updateField={updateField}
        name={studySetForm.folder.name}
        value={studySetForm.folder.value}
        error={studySetForm.folder.error}
        label="Folder"
        hasDropDown={true}
        data={[]}
        dataKey=""
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
    </form>
  );
};

export default Form;
