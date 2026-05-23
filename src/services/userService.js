import api from './api';

const UserService = {
  create: async (data) => {
    const response = await api.post('/users', data);
    return response.data;
  },

  update: async (userId, data) => {
    const response = await api.put(`/users/${userId}`, data);
    return response.data;
  },

  changePassword: async (userId, data) => {
    const response = await api.put(`/users/${userId}/password`, data);
    return response.data;
  }
};

export default UserService;
