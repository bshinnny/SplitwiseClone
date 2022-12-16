import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { clearFriends } from '../../store/friends';
import { clearExpenses } from '../../store/expense';
import './auth.css'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    await dispatch(clearFriends())
    await dispatch(clearExpenses())
  };

  return <button id='logout-button' onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
