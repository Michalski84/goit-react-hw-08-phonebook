import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RegisterPage from './RegisterPage';
import Login from './Login';
import ContactsPage from './ContactsPage';
import Navigation from './Navigation';
import PrivateRoute from './PrivateRoute';
import { useSelector } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react'

const App = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/contacts"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <ContactsPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
