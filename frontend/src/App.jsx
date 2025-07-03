import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes,  Link, Navigate } from 'react-router-dom';
import API from './services/api';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import SearchBar from './components/searchBar';


const App = () => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("token"));
  
  useEffect(() => {
    if (!authToken) {
      API.get('/protected', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })

      .then((response) => 
        console.log("Protected Route Test:", response.data))
      .catch((error) => {
        console.error("Authentciation Error", error);
        // Clear Invalid Token
        setAuthToken(null);
        localStorage.removeItem("token");
      });
    }
  }, [authToken]);

  const handleLogout = () => {
    setAuthToken(null);
    localStorage.removeItem("token");
  };

  const handleSearch = (searchTerm) => {
    console.log("Search Term:", searchTerm);
  };

   return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        {authToken ? (
          <> 
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
          ) : (
            <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
            </>
            )}
      </nav>

      <SearchBar onSearch={handleSearch} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={!authToken ? <RegisterPage setAuthToken={setAuthToken} /> : <Navigate to="/dashboard" />} />
        <Route path="/login" element={!authToken ? <LoginPage setAuthToken={setAuthToken} /> : <Navigate to ="/dashboard" />} />
        <Route path="/dashboard" element={authToken ? <DashboardPage /> : <Navigate to="/login" />}  />
      </Routes>
    </Router>
   );
   
    
  };

  const HomePage = () =>  <div>Welcome to Reading Tracker</div>;


export default App;
