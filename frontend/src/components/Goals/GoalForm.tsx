import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Box,
  Select,
} from '@chakra-ui/react';
import { useContext, useEffect, useRef, useState } from 'react';
import Calendar from 'react-calendar';
import { GoalContext } from '../../context/goal';
import { IGoalContext, IUserContext } from '../../interfaces';
import { CreateGoalFormFields } from '../../enums';
//@ts-ignore
import dayjs from 'dayjs';
import { Client } from '../../util/client';
import BasicSpinner from '../Shared/BasicSpinner';
import { nanoid } from 'nanoid';
import { UserContext } from '../../context/user';
import { useNavigate } from 'react-router-dom';

export interface ICreateGoalFormProps {
  method: string;
  buttonText: string;
  goalId?: number | undefined;
  title: string;
  newGoalFormOpen: boolean;
  setNewGoalFormOpen: (newGoalFormOpen: boolean) => void;
}

const GoalForm = ({
  method,
  buttonText,
  goalId = 0,
  title,
  newGoalFormOpen,
  setNewGoalFormOpen,
}: ICreateGoalFormProps) => {
  const {
    createGoalForm,
    goalCompletionDate,
    addNewGoal,
    setFilter,
    setSubject,
    setCompletion,
    addMultipleGoals,
    updateCreateGoalFormField,
    updateGoalCompletionDate,
    updatePagination,
    clearCreateGoalFormValues,
  } = useContext(GoalContext) as IGoalContext;
  const { user } = useContext(UserContext) as IUserContext;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState<string[]>([]);
  const shouldRun = useRef(true);

  const getGoal = () => {
    Client.getGoal(goalId.toString())
      .then((res) => {
        const { data } = res.data;
        updateCreateGoalFormField('title', data.goalTitle, 'value');
        updateCreateGoalFormField('desc', data.goalDesc, 'value');
        let goalType = data.goalType === 'FLASHCARDS' ? 'flashCards' : 'reading';
        updateCreateGoalFormField('goalType', goalType, 'value');
        updateGoalCompletionDate(data.targetCompletionDate);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  useEffect(() => {
    if (shouldRun.current && method === 'PUT' && goalId !== 0) {
      shouldRun.current = false;
      getGoal();
    }
  }, [shouldRun.current]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateCreateGoalFormField(name, value, 'value');
  };

  const handleOnBlur = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === CreateGoalFormFields.title && value.trim().length > createGoalForm.title.max) {
      const error = `${name} must be between 1 and ${createGoalForm.title.max} characters`;
      updateCreateGoalFormField(name, error, 'error');
      return;
    }
    if (name === CreateGoalFormFields.desc && value.trim().length > createGoalForm.desc.max) {
      const error = `${name} must be between 1 and ${createGoalForm.desc.max} characters`;
      updateCreateGoalFormField(name, error, 'error');
    }
  };

  const checkForErrors = () => {
    const emptyFields = Object.entries(createGoalForm).some(([_, field]) => field.value.trim() === '');
    const errors = Object.entries(createGoalForm).some(([_, field]) => field.error.length);

    return emptyFields || errors;
  };

  const handleOnFocus = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    updateCreateGoalFormField(name, '', 'error');
  };

  const applyServerErrors = <T extends object>(data: T) => {
    for (let prop in data) {
      setServerErrors((prevState) => [...prevState, data[prop] as string]);
    }
  };

  const updateExistingGoal = () => {
    const goalData = {
      goalType: createGoalForm.goalType.value,
      goalTitle: createGoalForm.title.value,
      goalDesc: createGoalForm.desc.value,
      goalCompletionDate: goalCompletionDate as Date,
    };

    setIsLoading(true);
    Client.updateGoal(goalId, goalData)
      .then(() => {
        navigate(`/${user.slug}/goals`);
        setIsLoading(false);
        clearCreateGoalFormValues();
        setNewGoalFormOpen(false);
      })
      .then(() => {
        Client.getGoals(-1, 10, 'next').then((res) => {
          const { direction, items, page, pageSize, totalElements, totalPages } = res.data.data;
          updatePagination({ page, pageSize, direction, totalPages, totalElements });
          addMultipleGoals(items);

          setFilter('');
          setSubject('');
          setCompletion('');
        });
      })
      .catch((err) => {
        if (err.response.status === 400) {
          applyServerErrors(err.response.data);
        }
      })
      .finally(() => setIsLoading(false));
  };

  const createGoal = () => {
    const goalData = {
      goalType: createGoalForm.goalType.value,
      goalTitle: createGoalForm.title.value,
      goalDesc: createGoalForm.desc.value,
      goalCompletionDate: goalCompletionDate as Date,
    };

    setIsLoading(true);
    Client.createGoal(goalData)
      .then((res) => {
        addNewGoal(res.data.data);
        setIsLoading(false);
        clearCreateGoalFormValues();
        setNewGoalFormOpen(false);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          applyServerErrors(err.response.data);
        }
      })
      .finally(() => setIsLoading(false));
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerErrors([]);
    if (checkForErrors()) {
      return;
    }

    if (method === 'POST') {
      createGoal();
      return;
    }

    if (method === 'PUT') {
      updateExistingGoal();
    }
  };

  return (
    <Modal isCentered isOpen={newGoalFormOpen} onClose={() => setNewGoalFormOpen(false)}>
      <ModalOverlay />
      <ModalContent minH="500px" maxW={['100%', '100%', '500px']}>
        <ModalHeader fontSize="1.75rem" bg="bg.primary" color="#fff">
          {title}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody bg="bg.primary">
          <form onSubmit={handleOnSubmit}>
            <FormControl>
              <Select
                value={createGoalForm.goalType.value}
                name={createGoalForm.goalType.name}
                onChange={handleOnChange}
                height="35px"
                fontSize="1.2rem"
                minW={['100%', '100%', '150px']}
                color="light.primary"
                borderColor="gray.700"
                placeholder="Goal type"
              >
                <option value="reading">Reading</option>
                <option value="flashCards">Flash cards</option>
              </Select>
            </FormControl>

            <FormControl my="3rem">
              <FormLabel htmlFor={createGoalForm.title.name} color="light.primary">
                Goal title
              </FormLabel>
              <Input
                value={createGoalForm.title.value}
                type={createGoalForm.title.type}
                name={createGoalForm.title.name}
                id={createGoalForm.title.name}
                onChange={handleOnChange}
                onBlur={handleOnBlur}
                onFocus={handleOnFocus}
                color="light.primary"
                placeholder="Enter a title"
                height="35px"
                borderColor="gray.700"
              />
              {createGoalForm.title.error.length > 0 && <Text color="red.400">{createGoalForm.title.error}</Text>}
            </FormControl>
            <Box className="container" my="3rem">
              <Text color="light.primary">
                Completion date{' '}
                <Box as="span" fontWeight="bold">
                  {dayjs(goalCompletionDate as Date).format('MM/DD/YYYY')}
                </Box>
              </Text>
              <Calendar className={['calendar']} onChange={updateGoalCompletionDate} value={goalCompletionDate} />
            </Box>
            <FormControl my="3rem">
              <FormLabel htmlFor={createGoalForm.desc.name} color="light.primary">
                Goal description
              </FormLabel>
              <Textarea
                value={createGoalForm.desc.value}
                name={createGoalForm.desc.name}
                id={createGoalForm.desc.name}
                onChange={handleOnChange}
                onBlur={handleOnBlur}
                onFocus={handleOnFocus}
                color="light.primary"
                placeholder="Write a description"
                height="100px"
                borderColor="gray.700"
              />
              {createGoalForm.desc.error.length > 0 && <Text color="red.400">{createGoalForm.desc.error}</Text>}
            </FormControl>
            {serverErrors.length > 0 && (
              <Box textAlign="center" my="1rem">
                {serverErrors.map((serverError) => {
                  return (
                    <Text key={nanoid()} color="red.400">
                      {serverError}
                    </Text>
                  );
                })}
              </Box>
            )}
            {isLoading ? (
              <BasicSpinner color="light.primary" message="Creating goal..." />
            ) : (
              <Box>
                <Button type="submit" height="35px" width="100%" size="lg" colorScheme="purple">
                  {buttonText}
                </Button>
              </Box>
            )}
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default GoalForm;
