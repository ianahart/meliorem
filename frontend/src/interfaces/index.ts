export interface IUniversity {
  displayName: string;
}

export interface IStudySetCard {
  order: number;
  color: string;
  bgColor: string;
  term: string;
  definition: string;
  image: string;
}

export interface IStudySetForm {
  title: { name: string; value: string; error: string };
  folder: { name: string; value: string; error: string };
  schoolName: { name: string; value: string; error: string };
  description: { name: string; value: string; error: string };
  course: { name: string; value: string; error: string };
  cards: IStudySetCard[];
}

export interface IRegisterForm {
  firstName: { name: string; value: string; error: string; type: string };
  lastName: { name: string; value: string; error: string; type: string };
  email: { name: string; value: string; error: string; type: string };
  password: { name: string; value: string; error: string; type: string };
  confirmPassword: { name: string; value: string; error: string; type: string };
}

export interface ILoginForm {
  email: { name: string; value: string; error: string; type: string };
  password: { name: string; value: string; error: string; type: string };
}

export interface ISubLink {
  linkName: string;
  linkText: string;
  icon: string | React.ReactNode;
}

export interface IUser {
  abbreviation: string;
  avatarUrl: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  id: number;
  loggedIn: boolean;
  profileId: number;
  role: string;
  settingId: number;
  slug: string;
}

export interface ITokens {
  refreshToken: string;
  token: string;
}

export interface IUserContext {
  tokens: ITokens;
  user: IUser;
  stowTokens: (tokens: ITokens) => void;
  updateUser: (user: IUser) => void;
  logout: () => void;
}

export interface IStudySetContext {
  studySetForm: IStudySetForm;
  setStudySetForm: (studySetForm: IStudySetForm) => void;
  universities: IUniversity[];
  handleSetUniversities: (unis: IUniversity[]) => void;
}
