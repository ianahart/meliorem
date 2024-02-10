import { nanoid } from 'nanoid';

export const forgotPasswordForm = {
  email: { name: 'email', value: '', error: '', type: 'email' },
};

export const updateEmailFormState = {
  email: { name: 'email', value: '', error: '', type: 'email' },
  password: { name: 'password', value: '', error: '', type: 'password' },
};

export const registerFormState = {
  firstName: { name: 'firstName', value: '', error: '', type: 'text' },
  lastName: { name: 'lastName', value: '', error: '', type: 'text' },
  email: { name: 'email', value: '', error: '', type: 'email' },
  password: { name: 'password', value: '', error: '', type: 'password' },
  confirmPassword: {
    name: 'confirmPassword',
    value: '',
    error: '',
    type: 'password',
  },
};

export const reviewStatsState = {
  avgRating: 0,
  totalReviews: 0,
  curUserReviewed: false,
};

export const resetPasswordFormState = {
  password: { name: 'password', value: '', error: '', type: 'password' },
  confirmPassword: {
    name: 'confirmPassword',
    value: '',
    error: '',
    type: 'password',
  },
};

export const loginFormState = {
  email: { name: 'email', value: '', error: '', type: 'email' },
  password: { name: 'password', value: '', error: '', type: 'password' },
};

export const tokenState = { refreshToken: '', token: '' };

export const userState = {
  abbreviation: '',
  avatarUrl: '',
  email: '',
  firstName: '',
  fullName: '',
  id: 0,
  lastName: '',
  loggedIn: false,
  profileId: 0,
  role: 'USER',
  settingId: 0,
  slug: '',
};

export const studySetFormCards = [
  {
    number: 1,
    id: nanoid(),
    order: 0,
    color: '',
    bgColor: '',
    term: '',
    definition: '',
    image: '',
  },
  {
    number: 2,
    id: nanoid(),
    order: 1,
    color: '',
    bgColor: '',
    term: '',
    definition: '',
    image: '',
  },
  {
    number: 3,
    id: nanoid(),
    order: 2,
    color: '',
    bgColor: '',
    term: '',
    definition: '',
    image: '',
  },
];

export const studySetFormState = {
  title: { name: 'title', error: '', value: '' },
  folder: { name: 'folder', error: '', value: '' },
  schoolName: { name: 'schoolName', error: '', value: '' },
  description: { name: 'description', error: '', value: '' },
  course: { name: 'course', error: '', value: '' },
  visibility: { name: 'visibility', error: '', value: 'everyone' },
  cards: [
    {
      number: 1,
      id: nanoid(),
      order: 0,
      color: '',
      bgColor: '',
      term: '',
      definition: '',
      image: '',
    },
    {
      number: 2,
      id: nanoid(),
      order: 1,
      color: '',
      bgColor: '',
      term: '',
      definition: '',
      image: '',
    },
    {
      number: 3,
      id: nanoid(),
      order: 2,
      color: '',
      bgColor: '',
      term: '',
      definition: '',
      image: '',
    },
  ],
};

export const colors = [
  { id: 1, name: 'yellow' },
  { id: 2, name: 'red' },
  { id: 3, name: 'green' },
  { id: 4, name: 'purple' },
  { id: 5, name: 'blue' },
  { id: 6, name: 'brown' },
  { id: 7, name: 'black' },
  { id: 8, name: 'white' },
  { id: 9, name: 'dodgerblue' },
  { id: 10, name: 'violet' },
  { id: 11, name: 'mediumseagreen' },
  { id: 12, name: 'gray' },
];

export const profileState = {
  avatarUrl: '',
  courses: [],
  createdAt: new Date(),
  updatedAt: new Date(),
  id: 0,
  schoolName: '',
};

export const studySetState = {
  avatarUrl: '',
  course: '',
  createdAt: new Date(),
  description: '',
  folder: '',
  fullName: '',
  id: 0,
  schoolName: '',
  title: '',
  totalStudySetCards: 0,
  userId: 0,
  visibility: '',
  bookMark: {
    id: 0,
    isBookMarked: false,
  },
};

export const studySetCardFullState = {
  number: 0,
  id: 0,
  order: 0,
  color: '',
  bgColor: '',
  term: '',
  definition: '',
  image: '',
  starred: false,
};
