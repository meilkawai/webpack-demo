import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from '../../routes/routes.js';
import { BrowserRouter as Router} from 'react-router-dom';

const App = () => (
  <Router>
    <AppRoutes />
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));
