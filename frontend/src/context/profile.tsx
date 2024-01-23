import { createContext, useState } from 'react';
import { profileState } from '../data';
import { ICourse, IProfile, IProfileContext } from '../interfaces';
import { nanoid } from 'nanoid';
interface IChildren {
  children: React.ReactNode;
}

export const ProfileContext = createContext<IProfileContext | null>(null);

const ProfileContextProvider = ({ children }: IChildren) => {
  const [profile, setProfile] = useState<IProfile>(profileState);
  const [file, setFile] = useState<File | null>(null);

  const handleSetInitialProfile = (pro: IProfile) => {
    let courses: unknown = pro.courses;
    courses =
      typeof courses === 'string'
        ? courses.split(',').map((course) => ({ id: nanoid(), name: course }))
        : [];

    setProfile({ ...pro, courses: courses as ICourse[] });
  };

  const handleSetProfile = (pro: IProfile) => {
    setProfile({ ...pro });

    if (file !== null) {
      setFile(null);
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        handleSetProfile,
        handleSetInitialProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContextProvider;
