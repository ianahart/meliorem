import { goalFormState } from '../data';
import { IGoalContext, ICreateGoalForm, IGoal, IPagination } from '../interfaces';
import { createContext, useState } from 'react';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface IChildren {
  children: React.ReactNode;
}

export const GoalContext = createContext<IGoalContext | null>(null);

const GoalContextProvider = ({ children }: IChildren) => {
  const [subject, setSubject] = useState('');
  const [filter, setFilter] = useState('');
  const [completion, setCompletion] = useState('');
  const [goals, setGoals] = useState<IGoal[]>([]);
  const [goalCompletionDate, setGoalCompletionDate] = useState<Value>(new Date());
  const [createGoalForm, setCreateGoalForm] = useState<ICreateGoalForm>(goalFormState);
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 10,
    totalPages: 0,
    direction: 'next',
    totalElements: 0,
  });

  const updatePagination = (data: IPagination) => {
    setPagination((prevState) => ({ ...prevState, ...data }));
  };

  const addNewGoal = (newGoal: IGoal) => {
    setGoals((prevState) => [...prevState, newGoal]);
  };

  const addMultipleGoals = (goals: IGoal[]) => {
    setGoals(goals);
  };

  const updateGoalCompletionDate = (newGoalCompletionDate: Value) => {
    if (newGoalCompletionDate && newGoalCompletionDate <= new Date()) {
      return;
    }
    setGoalCompletionDate(newGoalCompletionDate);
  };

  const updateCreateGoalFormField = (name: string, value: string, attribute: string) => {
    setCreateGoalForm((prevState) => ({
      ...prevState,
      [name]: { ...prevState[name as keyof ICreateGoalForm], [attribute]: value },
    }));
  };

  const clearCreateGoalFormValues = () => {
    setGoalCompletionDate(new Date());
    for (const [key, _] of Object.entries(createGoalForm)) {
      updateCreateGoalFormField(key, '', 'value');
    }
  };

  const updateGoal = (goalId: number, goal: IGoal) => {
    const updated = goals.map((g) => {
      if (g.id === goalId) {
        return { ...g, ...goal };
      } else {
        return { ...g };
      }
    });
    setGoals(updated);
  };

  const markGoalCompleted = (goalId: number, isCompleted: boolean) => {
    const updated = goals.map((goal) => (goal.id === goalId ? { ...goal, isCompleted } : { ...goal }));
    setGoals(updated);
  };

  return (
    <GoalContext.Provider
      value={{
        goals,
        filter,
        subject,
        completion,
        pagination,
        createGoalForm,
        goalCompletionDate,
        setFilter,
        setSubject,
        setCompletion,
        setCreateGoalForm,
        addNewGoal,
        updateCreateGoalFormField,
        updateGoalCompletionDate,
        clearCreateGoalFormValues,
        addMultipleGoals,
        updatePagination,
        updateGoal,
        markGoalCompleted,
      }}
    >
      {children}
    </GoalContext.Provider>
  );
};

export default GoalContextProvider;
