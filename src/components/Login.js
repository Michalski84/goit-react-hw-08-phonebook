import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logIn } from '../store/authSlice';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const authError = useSelector(state => state.auth.error); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/contacts'); 
    }
  }, [isLoggedIn, navigate]);

  const handleChange = e => {
    const { name, value } = e.target;
    setCredentials(prevCredentials => ({
      ...prevCredentials,
      [name]: value,
    }));
    setLoginError('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (credentials.password.length < 7) {
      setLoginError('Password must be at least 7 characters long.');
      return;
    }
    dispatch(logIn(credentials));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          required
          autoComplete="current-password"
        />
        {loginError && <div style={{ color: 'red' }}>{loginError}</div>}
      </label>
      {authError && <div style={{ color: 'red' }}>{authError}</div>}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;