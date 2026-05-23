import api from './api';

const AuthService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data; // This should be the UserDTO
  }
};

export default AuthService;
