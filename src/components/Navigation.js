import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../store/authSlice';

const Navigation = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await dispatch(logOut());
    navigate('/login');
  };

  const getLinkClass = path => {
    return location.pathname === path ? 'active-link' : '';
  };

  return (
    <nav>
      <h1>
        <i className="fa-solid fa-address-book"></i> PHONEBOOK
      </h1>
      <div>
        <Link to="/contacts" className={getLinkClass('/contacts')}>
          Contacts
        </Link>
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/register" className={getLinkClass('/register')}>
              Register
            </Link>
            <Link to="/login" className={getLinkClass('/login')}>
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;