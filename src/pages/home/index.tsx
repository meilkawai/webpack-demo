import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './components/homePage';
import AppRoutes from '../../routes/routes.js'
const App = () => (
  <Router>
    <AppRoutes />
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));
