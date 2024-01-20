import { createContext, useState } from 'react';
import { profileState } from '../data';
import { IProfile, IProfileContext } from '../interfaces';
interface IChildren {
  children: React.ReactNode;
}

export const ProfileContext = createContext<IProfileContext | null>(null);

const ProfileContextProvider = ({ children }: IChildren) => {
  const [profile, setProfile] = useState<IProfile>(profileState);

  const handleSetProfile = (pro: IProfile) => {
    setProfile({ ...pro });
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        handleSetProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContextProvider;
