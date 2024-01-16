export const registerFormState = {
  firstName: { name: 'firstName', value: '', error: '', type: 'text' },
  lastName: { name: 'lastName', value: '', error: '', type: 'text' },
  email: { name: 'email', value: '', error: '', type: 'email' },
  password: { name: 'password', value: '', error: '', type: 'password' },
  confirmPassword: { name: 'confirmPassword', value: '', error: '', type: 'password' },
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

export const studySetFormState = {
  title: { name: 'title', error: '', value: '' },
  folder: { name: 'folder', error: '', value: '' },
  schoolName: { name: 'schoolName', error: '', value: '' },
  description: { name: 'description', error: '', value: '' },
  course: { name: 'course', error: '', value: '' },
  cards: [
    { order: 0, color: '', bgColor: '', term: '', definition: '', image: '' },
    { order: 1, color: '', bgColor: '', term: '', definition: '', image: '' },
    { order: 2, color: '', bgColor: '', term: '', definition: '', image: '' },
    { order: 3, color: '', bgColor: '', term: '', definition: '', image: '' },
  ],
};
