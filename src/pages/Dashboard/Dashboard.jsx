import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { Package, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import AnalyticsService from '../../services/analyticsService';
import './Dashboard.css';

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#F43F5E', '#EF4444'];

const Dashboard = () => {
  const [kpis, setKpis] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [loanHistory, setLoanHistory] = useState([]);
  const [topArticles, setTopArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const [kpiData, catData, historyData, topData] = await Promise.all([
          AnalyticsService.getKPIs(),
          AnalyticsService.getCategoryDistribution(),
          AnalyticsService.getLoanHistory(),
          AnalyticsService.getTopArticles()
        ]);
        
        setKpis(kpiData);
        setCategoryData(catData);
        setLoanHistory(historyData);
        setTopArticles(topData);
      } catch (error) {
        console.error("Error loading dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return <div className="dashboard-loading">Cargando métricas...</div>;
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard Analítico</h1>
      
      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon"><Package size={24} color="#4F46E5"/></div>
          <div className="kpi-info">
            <h3>Total Inventario</h3>
            <p className="kpi-value">{kpis?.total_inventory || 0}</p>
            <span className="kpi-subtext">Disponibles: {kpis?.available_stock || 0}</span>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon"><CheckCircle size={24} color="#10B981"/></div>
          <div className="kpi-info">
            <h3>Préstamos Activos</h3>
            <p className="kpi-value">{kpis?.active_loans || 0}</p>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon"><Clock size={24} color="#F59E0B"/></div>
          <div className="kpi-info">
            <h3>Préstamos Vencidos</h3>
            <p className="kpi-value warning">{kpis?.overdue_loans_count || 0}</p>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon"><AlertTriangle size={24} color="#EF4444"/></div>
          <div className="kpi-info">
            <h3>Artículos Dañados</h3>
            <p className="kpi-value error">{kpis?.damaged_items || 0}</p>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        {/* Top Articles Chart */}
        <div className="chart-card">
          <h2>Top Artículos Más Prestados</h2>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topArticles} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="loan_count" name="Préstamos" fill="#4F46E5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution Chart */}
        <div className="chart-card">
          <h2>Distribución por Categoría</h2>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="count"
                  nameKey="category"
                  label={({category, percent}) => `${category} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Loan History Chart */}
        <div className="chart-card full-width">
          <h2>Historial de Préstamos (Últimos 6 Meses)</h2>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={loanHistory} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="loans" name="Préstamos Realizados" stroke="#4F46E5" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="returns" name="Devoluciones" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
