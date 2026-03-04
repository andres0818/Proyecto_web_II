import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Inventory from './pages/Inventory/Inventory';
import Loans from './pages/Loans/Loans';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/loans" element={<Loans />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
