import axios from 'axios';
import { ILoginForm, IRegisterForm } from '../interfaces';

export const http = axios.create({
  baseURL: 'http://localhost:5173/api/v1',
});

export const Client = {
  logout: (refreshToken: string) => {
    return http.post('/auth/logout', { refreshToken });
  },

  signUp: (form: IRegisterForm) => {
    const data = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      email: form.email.value,
      password: form.password.value,
      confirmPassword: form.confirmPassword.value,
      role: 'USER',
    };
    return http.post('/auth/register', data);
  },

  signIn: (form: ILoginForm) => {
    const data = { email: form.email.value, password: form.password.value };
    return http.post('/auth/login', data);
  },

  syncUser: (token: string) => {
    return http.get('/users/sync', {
      headers: { Authorization: 'Bearer ' + token },
    });
  },
  heartbeat: () => {
    return http.get('/heartbeat');
  },

  getUniversities: (query: string) => {
    return http.get(`/universities?query=${query}`);
  },

  getStudySetImages: (searchTerm: string) => {
    return http.get(`/pexels?query=${searchTerm}`);
  },

  createStudySet: <T>(data: T) => {
    return http.post('/studysets', data);
  },

  sendForgotPasswordEmail: (email: string) => {
    return http.post('/auth/forgot-password', { email });
  },

  resetPassword: (
    id: number,
    token: string,
    newPassword: string,
    confirmPassword: string
  ) => {
    return http.post('/auth/reset-password', {
      id,
      token,
      newPassword,
      confirmPassword,
    });
  },

  getStudySetFolders: (query: string, limit: number, page: number, direction: string) => {
    return http.get(
      `/studysets/folders?query=${query}&limit=${limit}&page=${page}&direction=${direction}`
    );
  },
};
