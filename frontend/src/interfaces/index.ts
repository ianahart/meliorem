export type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

export interface IGoal {
  createdAt: Date;
  updatedAt: Date;
  goalDesc: string;
  goalTitle: string;
  goalType: string;
  id: number;
  isCompleted: boolean;
  targetCompletionDate: Date;
  userId: number;
}

export interface ICreateGoalForm {
  title: { name: string; error: string; value: string; type: string; max: number };
  desc: { name: string; error: string; value: string; type: string; max: number };
  goalType: { name: string; error: string; value: string; type: string; max: number };
}

export interface IBookProgress {
  bookId: number;
  currentPage: number;
  id: number;
  imageUrl: string;
  isCompleted: boolean;
  notes: string;
  totalPages: number;
  userId: number;
}

export interface IBook {
  author: string;
  bookshelf: string;
  downloadCount: number;
  id: number;
  imageUrl: string;
  pdfUrl: string;
  title: string;
}

export interface ITime {
  startTime: string;
  endTime: string;
}

export interface IStudyPlanDay extends ITime {}
export interface IStudyPlanStartTime extends ITime {}
export interface IStudyPlanEndTime extends ITime {}

export interface ITrophy {
  [key: number]: string;
}

export interface IQuiz {
  id: number;
  userId: number;
  createdAt: Date;
  category: string;
  correctAnswers: number;
  incorrectAnswers: number;
}

export interface IQuizQuestion {
  category: string;
  correctAnswer: string;
  difficulty: string;
  incorrectAnswers: string[];
  question: string;
  type: string;
}

export interface INotification {
  id: number;
  text: string;
  createdAt: Date;
  notificationType: string;
}

export interface IStreakStat {
  setsStudied: number;
  weeklyStreak: number;
}

export interface IChatMessage {
  id: number;
  userId: number;
  fullName: string;
  createdAt: Date;
  avatarUrl: string;
  groupId: number;
  message: string;
}

export interface IGroupStudySet {
  id: number;
  groupId: number;
  title: string;
  course: string;
  studySetId: number;
  studySetTitle: string;
}

export interface ISearchStudySet extends IStudySet {
  isAddedToGroup: boolean;
}

export interface IPagination {
  page: number;
  pageSize: number;
  totalPages: number;
  direction: string;
  totalElements: number;
}

export interface ISearchUser {
  id: number;
  fullName: string;
  schoolName: string;
  avatarUrl: string;
}

export interface IGroupMember {
  id: number;
  userId: number;
  avatarUrl: string;
  schoolName: string;
  fullName: string;
}

export interface IInvite {
  createdAt: Date;
  fullName: string;
  groupId: number;
  groupMemberId: number;
  groupName: string;
}

export interface ITopic {
  id: number;
  name: string;
}

export interface IInvitee {
  avatarUrl: string;
  firstName: string;
  fullName: string;
  schoolName: string;
  userId: number;
  topics: ITopic[];
  createdAt: Date;
}

export interface IGroupInProgress {
  adminId: number;
  groupId: number;
}

export interface IReviewStats {
  avgRating: number;
  totalReviews: number;
  curUserReviewed: boolean;
}

export interface IMinGroup {
  name: string;
  id: number;
  adminId: number;
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

export interface IGoalContext {
  goals: IGoal[];
  filter: string;
  subject: string;
  completion: string;
  pagination: IPagination;
  createGoalForm: ICreateGoalForm;
  goalCompletionDate: Value;
  setFilter: (filter: string) => void;
  setSubject: (subject: string) => void;
  setCompletion: (completion: string) => void;
  setCreateGoalForm: (goalForm: ICreateGoalForm) => void;
  addNewGoal: (newGoal: IGoal) => void;
  updateCreateGoalFormField: (name: string, value: string, attribute: string) => void;
  updateGoalCompletionDate: (newGoalCompletionDate: Value) => void;
  clearCreateGoalFormValues: () => void;
  addMultipleGoals: (goals: IGoal[]) => void;
  updatePagination: (pagination: IPagination) => void;
  updateGoal: (goalId: number, goal: IGoal) => void;
  markGoalCompleted: (goalId: number, isCompleted: boolean) => void;
}
