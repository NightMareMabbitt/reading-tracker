import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Navigate } from 'react-router-dom';
import API from './services/api';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("token"));
  
  useEffect(() => {
    // Test API request
    API.get('/')
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
  }, []);

  return <div>Welcome to Reading Tracker</div>;
};

export default App;
