import 'antd/dist/antd.css';
import 'swiper/css';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import AppRouter from './routers';

function App() {
  return (
    <Router>
      <AppRouter />
      <ToastContainer />
    </Router>
  );
}

export default App;
