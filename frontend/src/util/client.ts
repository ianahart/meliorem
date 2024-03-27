import axios from 'axios';
import { ILoginForm, IRegisterForm, ITime } from '../interfaces';

export const http = axios.create({
  baseURL: 'https://meliorem.netlify.app/api/v1',
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

  getStreak: (userId: number, duration: string, month: number = 0, year: number = 0) => {
    return http.get(`/streaks?userId=${userId}&duration=${duration}&month=${month}&year=${year}`);
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

  getStudySetCards: (studySetCardId: string) => {
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
  createTopics: (topics: string[]) => {
    return http.post('/topics', { topics });
  },

  getTopics: () => {
    return http.get('/topics');
  },

  createGroup: (userId: number, name: string) => {
    return http.post('/groups', { userId, name });
  },

  getInvitees: (page: number, pageSize: number, direction: string, adminId: number, groupId: number) => {
    return http.get(
      `/users/?adminId=${adminId}&groupId=${groupId}&page=${page}&pageSize=${pageSize}&direction=${direction}`
    );
  },

  sendGroupInvite: (groupId: number, memberId: number, inviterId: number) => {
    return http.post('/group-members', { groupId, memberId, inviterId });
  },

  getGroups: (page: number, pageSize: number, direction: string, userId: number) => {
    return http.get(`/groups?userId=${userId}&page=${page}&pageSize=${pageSize}&direction=${direction}`);
  },

  getGroupInvites: (isAccepted: number, page: number, pageSize: number, direction: string, userId: number) => {
    return http.get(
      `/group-members/invites?isAccepted=${isAccepted}&userId=${userId}&page=${page}&pageSize=${pageSize}&direction=${direction}`
    );
  },

  joinGroup: (groupMemberId: number, accepted: boolean, groupId: number) => {
    return http.patch(`/group-members/${groupMemberId}`, { accepted, groupId });
  },

  getGroupMembers: (groupId: number, accepted: number, page: number, pageSize: number, direction: string) => {
    return http.get(
      `/group-members?groupId=${groupId}&accepted=${accepted}&page=${page}&pageSize=${pageSize}&direction=${direction}`
    );
  },

  searchUsers: (fullName: string, groupId: number, page: number, pageSize: number, direction: string) => {
    return http.get(
      `/users/search?fullName=${fullName}&groupId=${groupId}&page=${page}&pageSize=${pageSize}&direction=${direction}`
    );
  },

  searchStudySets: (query: string, groupId: number, pageNum: number, pageSize: number, direction: string) => {
    return http.get(
      `/studysets/search?query=${query}&groupId=${groupId}&page=${pageNum}&pageSize=${pageSize}&direction=${direction}`
    );
  },

  addGroupStudySet: (studySetId: number, groupId: number) => {
    return http.post(`/group-studysets`, { studySetId, groupId });
  },
  getGroupStudySets: (groupId: number, page: number, pageSize: number, direction: string) => {
    return http.get(`/group-studysets?groupId=${groupId}&page=${page}&pageSize=${pageSize}&direction=${direction}`);
  },
  removeGroupStudySet: (groupStudySetId: number) => {
    return http.delete(`/group-studysets/${groupStudySetId}`);
  },
  ignoreInvite: (groupMemberId: number) => {
    return http.delete(`/group-members/${groupMemberId}`);
  },

  getGroupMessages: (groupId: number) => {
    return http.get(`/group-messages?groupId=${groupId}`);
  },

  updateGroup: (newAdminId: number, groupId: number, oldAdminId: number) => {
    return http.patch(`/groups/${groupId}`, { newAdminId, oldAdminId });
  },
  deleteGroup: (groupId: number) => {
    return http.delete(`/groups/${groupId}`);
  },
  getStreakStats: (userId: number) => {
    return http.get(`/streaks/stats?userId=${userId}`);
  },

  getNotifications: (userId: number, page: number, pageSize: number, direction: string) => {
    return http.get(`/notifications?userId=${userId}&page=${page}&pageSize=${pageSize}&direction=${direction}`);
  },

  removeNotification: (notificationId: number) => {
    return http.delete(`/notifications/${notificationId}`);
  },

  getQuiz: (quizAPIUrl: string, topicName: string) => {
    return http.post('/quizzes', { quizAPIUrl, topicName });
  },

  saveQuiz: (userId: number, correctAnswers: number, incorrectAnswers: number, category: string) => {
    return http.post('/quizzes/save', { userId, correctAnswers, incorrectAnswers, category });
  },

  getQuizzes: (page: number, pageSize: number, direction: string) => {
    return http.get(`/quizzes?page=${page}&pageSize=${pageSize}&direction=${direction}`);
  },

  createStudyPlan: (times: ITime[], topics: string[], days: { day: number; name: string }[]) => {
    return http.post('/study-plans', { times, topics, days });
  },

  getTimeSlots: () => {
    return http.get('/time-slots');
  },

  updateTimeSlot: (day: number, id: number) => {
    return http.patch(`/time-slots/${id}`, { day });
  },

  createBook: (title: string, topic: string, userId: number) => {
    return http.post('/books', { title, topic, userId });
  },

  getBooks: (page: number, pageSize: number, direction: string) => {
    return http.get(`/books?page=${page}&pageSize=${pageSize}&direction=${direction}`);
  },
  getBook: (bookId: number) => {
    return http.get(`/books/${bookId}`);
  },
  deleteBook: (bookId: number) => {
    return http.delete(`/books/${bookId}`);
  },

  saveBookProgress: (userId: number, bookId: number, totalPages: number, currentPage: number, notes: string) => {
    return http.post('/book-progresses', { userId, bookId, totalPages, currentPage, notes });
  },

  getBookProgresses: (userId: number, page: number, pageSize: number, direction: string) => {
    return http.get(`/book-progresses?userId=${userId}&page=${page}&pageSize=${pageSize}&direction=${direction}`);
  },

  createGoal: <T>(data: T) => {
    return http.post('/goals', data);
  },

  getGoals: (
    page: number,
    pageSize: number,
    direction: string,
    filter: string = '',
    subject: string = '',
    completion: string = ''
  ) => {
    return http.get(
      `/goals?page=${page}&pageSize=${pageSize}&direction=${direction}&filter=${filter}&subject=${subject}&completion=${completion}`
    );
  },

  getGoal: (goalId: string) => {
    return http.get(`/goals/${goalId}`);
  },
  updateGoal: <T>(goalId: number, data: T) => {
    return http.put(`/goals/${goalId}`, data);
  },

  deleteGoal: (goalId: number) => {
    return http.delete(`/goals/${goalId}`);
  },

  markGoalCompleted: (goalId: number, isCompleted: boolean) => {
    return http.patch(`/goals/${goalId}`, { isCompleted });
  },

  createRecommendations: () => {
    return http.post('/recommendations', {});
  },

  getRecommendations: (page: number, pageSize: number, direction: string) => {
    return http.get(`/recommendations?page=${page}&pageSize=${pageSize}&direction=${direction}`);
  },
};
