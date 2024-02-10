export interface IReviewStats {
  avgRating: number;
  totalReviews: number;
  curUserReviewed: boolean;
}

export interface IStreak {
  createdAt: Date;
  day: number;
  dayOfWeek: string;
  id: number;
  month: string;
  timestamp: number;
  year: number;
}

export interface IStudySet {
  avatarUrl: string;
  course: string;
  createdAt: Date;
  description: string;
  folder: string;
  id: number;
  schoolName: string;
  title: string;
  totalStudySetCards: number;
  userId: number;
  visibility: string;
  fullName: string;
  bookMark: { id: number; isBookMarked: boolean };
}

export interface IColor {
  id: number;
  name: string;
}

export interface ICourse {
  id: string;
  name: string;
}

export interface IUniversity {
  displayName: string;
}

export interface IStudySetFolder {
  folder: string;
}

export interface IStudySetCard {
  [key: string]: string | number;
  number: number;
  id: string | number;
  order: number;
  color: string;
  bgColor: string;
  term: string;
  definition: string;
  image: string;
}

export interface IStudySetCardFull {
  number: number;
  id: string | number;
  order: number;
  color: string;
  bgColor: string;
  term: string;
  definition: string;
  image: string;
  starred: boolean;
}

export interface IUpdateEmailForm {
  email: { name: string; value: string; error: string; type: string };
  password: { name: string; value: string; error: string; type: string };
}

export interface IStudySetForm {
  title: { name: string; value: string; error: string };
  folder: { name: string; value: string; error: string };
  schoolName: { name: string; value: string; error: string };
  description: { name: string; value: string; error: string };
  course: { name: string; value: string; error: string };
  visibility: { name: string; value: string; error: string };
  cards: IStudySetCard[];
}

export interface IForgotPasswordForm {
  email: { name: string; value: string; error: string; type: string };
}

export interface IResetPasswordForm {
  password: { name: string; value: string; error: string; type: string };
  confirmPassword: { name: string; value: string; error: string; type: string };
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

export interface IProfile {
  avatarUrl: string;
  courses: ICourse[];
  createdAt: Date;
  updatedAt: Date;
  id: number;
  schoolName: string;
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
  studySetFolders: IStudySetFolder[];
  handleSetUniversities: (unis: IUniversity[]) => void;
  handleSetStudySetFolders: (folders: IStudySetFolder[]) => void;
  handleSetStudySetForm: (form: IStudySetForm) => void;
}

export interface IProfileContext {
  profile: IProfile;
  handleSetProfile: (profile: IProfile) => void;
  handleSetInitialProfile: (profile: IProfile) => void;
}
