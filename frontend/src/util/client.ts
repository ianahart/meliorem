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

  resetPassword: (id: number, token: string, newPassword: string, confirmPassword: string) => {
    return http.post('/auth/reset-password', {
      id,
      token,
      newPassword,
      confirmPassword,
    });
  },

  getStudySetFolders: (query: string, limit: number, page: number, direction: string) => {
    return http.get(`/studysets/folder-names?query=${query}&limit=${limit}&page=${page}&direction=${direction}`);
  },

  getProfile: (profileId: number) => {
    return http.get(`/profiles/${profileId}`);
  },
  updateProfileSchoolName: (schoolName: string, profileId: number) => {
    return http.patch(`/profiles/${profileId}/school-name`, { schoolName });
  },

  updateProfileCourses: (courses: string, profileId: number) => {
    return http.patch(`/profiles/${profileId}/courses`, { courses });
  },
  updateProfileAvatar: (avatarUrl: string, profileId: number) => {
    return http.patch(`profiles/${profileId}/avatar`, { avatarUrl });
  },
  updateProfilePicture: (data: FormData, profileId: number) => {
    return http.patch(`profiles/${profileId}/profile-picture`, data);
  },

  updateUserEmail: (email: string, password: string, userId: number) => {
    return http.patch(`users/${userId}/email`, { email, password });
  },

  deleteAccount: (userId: number) => {
    return http.delete(`users/${userId}`);
  },

  getStudySets: (userId: number = 0, page: number, pageSize: number, direction: string, folder: string = '') => {
    return http.get(
      `/studysets?userId=${userId}&page=${page}&pageSize=${pageSize}&direction=${direction}&folder=${folder}`
    );
  },

  createStreak: (studySetId: number) => {
    return http.post('/streaks', { studySetId });
  },

  getStreak: (userId: number) => {
    return http.get(`/streaks?userId=${userId}`);
  },

  getStudySet: (studySetId: number) => {
    return http.get(`studysets/${studySetId}`);
  },

  populateStudySet: (studySetId: number) => {
    return http.get(`studysets/${studySetId}/populate`);
  },

  editStudySet: <T>(data: T, studySetId: number) => {
    return http.patch(`/studysets/${studySetId}`, data);
  },

  deleteStudySet: (studySetId: number) => {
    return http.delete(`/studysets/${studySetId}`);
  },

  deleteStudySetCard: (studySetCardId: number | string) => {
    const id = studySetCardId.toString();

    return http.delete(`/studyset-cards/${id}`);
  },

  getStudySetCards: (studySetCardId: number) => {
    return http.get(`/studyset-cards?studySetId=${studySetCardId}`);
  },

  editStudySetCard: (term: string, definition: string, studySetCardId: number | string) => {
    return http.patch(`/studyset-cards/${studySetCardId}`, { term, definition });
  },
  studySetCardStarred: (starred: boolean, studySetCardId: number | string) => {
    return http.patch(`/studyset-cards/${studySetCardId}/starred`, { starred });
  },

  createReview: <T>(data: T) => {
    return http.post(`/reviews`, data);
  },

  getReviewStats: (studySetId: number) => {
    return http.get(`/reviews/stats?studySetId=${studySetId}`);
  },

  getUserFolders: (page: number, pageSize: number, direction: string) => {
    return http.get(`studysets/folders?page=${page}&pageSize=${pageSize}&direction=${direction}`);
  },

  createBookMark: (studySetId: number) => {
    return http.post('/bookmarks', { studySetId });
  },

  deleteBookMark: (bookMarkId: number) => {
    return http.delete(`bookmarks/${bookMarkId}`);
  },

  getBookMarks: (userId: number, page: number, pageSize: number, direction: string) => {
    return http.get(`/bookmarks?userId=${userId}&page=${page}&pageSize=${pageSize}&direction=${direction}`);
  },

  createNotes: <T>(formData: T) => {
    return http.post('/notes', formData);
  },
  getNotes: (studySetId: number) => {
    return http.get(`/notes?studySetId=${studySetId}`);
  },
};
