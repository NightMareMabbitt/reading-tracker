import React from "react";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  const handleLogin = async (credentials) => {
    try {
      const response = await fetch('/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token); // Store Token for authentciation
        alert('Login successful');
        window.location.replace('/');
      } else {
        const error = await response.json();
        alert(error.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login failed:', err);
      alert('Login failed');
    }
  };

  return <LoginForm onSubmit={handleLogin} />;
};

export default LoginPage;