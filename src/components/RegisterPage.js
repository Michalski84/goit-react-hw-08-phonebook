import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../store/authSlice';

const RegisterPage = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/contacts'); 
    }
  }, [isLoggedIn, navigate]);

  const handleChange = e => {
    const { name, value } = e.target;
    setUserData(prevUserData => ({
      ...prevUserData,
      [name]: value,
    }));
    if (name === 'password') {
      if (value.length < 7 && value.length > 0) {
        setPasswordError('Password must be at least 7 characters long.');
      } else {
        setPasswordError('');
      }
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (userData.password.length < 7) {
      setPasswordError('Password must be at least 7 characters long.');
      return; 
    }
    dispatch(register(userData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={userData.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          required
        />
        <div style={{ color: 'red' }}>{passwordError}</div>
      </label>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterPage;