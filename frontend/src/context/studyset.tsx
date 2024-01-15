import { createContext, useState } from 'react';
import { studySetFormState } from '../data';
import { IStudySetContext, IStudySetForm } from '../interfaces';

interface IChildren {
  children: React.ReactNode;
}

export const StudySetContext = createContext<IStudySetContext | null>(null);

const StudySetContextProvider = ({ children }: IChildren) => {
  const [studySetForm, setStudySetForm] = useState<IStudySetForm>(studySetFormState);

  return (
    <StudySetContext.Provider
      value={{
        studySetForm,
      }}
    >
      {children}
    </StudySetContext.Provider>
  );
};

export default StudySetContextProvider;
