import api from './api';

const LoanService = {
  getAll: async () => {
    const response = await api.get('/loans');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/loans/by-id?loan_id=${id}`);
    return response.data;
  },

  getByUser: async (userId) => {
    const response = await api.get(`/loans/by-user?user_id=${userId}`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/loans', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/loans/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/loans/${id}`);
    return response.data;
  }
};

export default LoanService;
