import api from './api';

const ArticleService = {
  getAll: async () => {
    const response = await api.get('/articles');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/articles/by-id?article_id=${id}`);
    return response.data;
  },

  getByCategory: async (categoryId) => {
    const response = await api.get(`/articles/by-category?category_id=${categoryId}`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/articles', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/articles/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/articles/${id}`);
    return response.data;
  }
};

export default ArticleService;
