import { createContext, useState } from 'react';
import { studySetFormState } from '../data';
import {
  IStudySetContext,
  IStudySetFolder,
  IStudySetForm,
  IUniversity,
} from '../interfaces';

interface IChildren {
  children: React.ReactNode;
}

export const StudySetContext = createContext<IStudySetContext | null>(null);

const StudySetContextProvider = ({ children }: IChildren) => {
  const [studySetForm, setStudySetForm] = useState<IStudySetForm>(studySetFormState);
  const [universities, setUniversities] = useState<IUniversity[]>([]);
  const [studySetFolders, setStudySetFolders] = useState<IStudySetFolder[]>([]);

  const handleSetUniversities = (unis: IUniversity[]) => {
    setUniversities(unis);
  };

  const handleSetStudySetFolders = (folders: IStudySetFolder[]) => {
    setStudySetFolders(folders);
  };

  const handleSetStudySetForm = (form: IStudySetForm) => {
    setStudySetForm(form);
  };

  return (
    <StudySetContext.Provider
      value={{
        studySetForm,
        setStudySetForm,
        universities,
        handleSetUniversities,
        handleSetStudySetForm,
        studySetFolders,
        handleSetStudySetFolders,
      }}
    >
      {children}
    </StudySetContext.Provider>
  );
};

export default StudySetContextProvider;
