import React from "react";
import RegisterForm from "../components/RegisterForm";

const RegisterPage = () => {
  const handleRegister = async (userDetais) => {
    try {
      const response = await fetch('/api/v1/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetais),
      });

      if (response.ok) {
        alert('Registration successful! You can now login.');
        window.location.replace('/login');
      } else {
        const error = await response.json();
        alert(error.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration failed:', err);
      alert('Registration failed');
    }
  };
  return <RegisterForm onSubmit={handleRegister} />;
};

export default RegisterPage;