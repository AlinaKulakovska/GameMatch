// src/components/ProtectedRoute.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './/AuthContext';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      alert('Please log in to access this page');
      navigate('/');
    }
  }, [currentUser, navigate]);

  return currentUser ? <Component {...rest} /> : null;
};

export default ProtectedRoute;
