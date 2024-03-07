import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

export default function LoginIntegrated() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const authUserDatabase = async () => {
    const dataUser = await axios.post(
      "http://localhost:3001/databases/login/integratedUser",
      {
        userEmail: email,
        userPassword: password
      }
    );
    if (!dataUser.data.isValidUser) {
      return false;
    }
    const userData = {
      id: dataUser.data.id,
      name: dataUser.data.name,
      userRole: dataUser.data.userRole,
      target:
        dataUser.data.userRole === "Admin"
          ? "/admin"
          : dataUser.data.userRole === "User"
            ? "/user"
            : "/",
    };
    Cookies.set('auth', JSON.stringify(userData));
    navigate(userData.target);
  }

  const handleLogin = (e) => {
    e.preventDefault();
    const isAuthenticated = authUserDatabase();
    if (!isAuthenticated) {
      navigate("/");
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

