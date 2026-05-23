import axios from 'axios';

const analyticsApi = axios.create({
  baseURL: 'https://python-backend-kpis.onrender.com/analytics',
  // You might need to add headers if your python backend requires authentication
  // headers: {
  //   Authorization: `Bearer ${localStorage.getItem('token')}`,
  // }
});

const AnalyticsService = {
  getKPIs: async () => {
    try {
      const response = await analyticsApi.get('/kpis');
      return response.data;
    } catch (error) {
      console.error("Error fetching KPIs:", error);
      // Fallback dummy data for development/demonstration if the API is not ready
      return { total_inventory: 500, available_stock: 450, damaged_items: 10, active_loans: 25, overdue_loans_count: 5 };
    }
  },

  getCategoryDistribution: async () => {
    try {
      const response = await analyticsApi.get('/category-distribution');
      return response.data;
    } catch (error) {
      console.error("Error fetching category distribution:", error);
      // Fallback dummy data
      return [
        { category: "Electrónica", count: 45 },
        { category: "Mobiliario", count: 30 },
        { category: "Laboratorio", count: 15 },
        { category: "Otros", count: 10 }
      ];
    }
  },

  getLoanHistory: async () => {
    try {
      const response = await analyticsApi.get('/loan-history');
      return response.data;
    } catch (error) {
      console.error("Error fetching loan history:", error);
      // Fallback dummy data
      return [
        { month: "Ene", loans: 15, returns: 12 },
        { month: "Feb", loans: 20, returns: 18 },
        { month: "Mar", loans: 25, returns: 22 },
        { month: "Abr", loans: 18, returns: 15 },
        { month: "May", loans: 30, returns: 28 },
        { month: "Jun", loans: 22, returns: 20 }
      ];
    }
  },

  getTopArticles: async () => {
    try {
      const response = await analyticsApi.get('/top-articles');
      return response.data;
    } catch (error) {
      console.error("Error fetching top articles:", error);
      // Fallback dummy data
      return [
        { name: "Proyector Epson", loan_count: 56 },
        { name: "Laptop Dell", loan_count: 42 },
        { name: "Cable HDMI", loan_count: 35 },
        { name: "Cámara Canon", loan_count: 28 },
        { name: "Micrófono USB", loan_count: 20 }
      ];
    }
  }
};

export default AnalyticsService;
