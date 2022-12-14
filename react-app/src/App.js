import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import CommentsOfExpense from './components/Comment/Comment';

import SplashPage from './components/SplashPage';
import FriendSideBar from './components/friends/SideBar';
import FriendDetail from './components/friends/FriendDetail';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/current' exact={true} >
          <FriendSideBar/>
        </ProtectedRoute>
        <ProtectedRoute path='/friends/:friendId' exact={true} >
          <FriendDetail/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/expenses/:expenseId/comments' exact={true} >
          <CommentsOfExpense />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <h1>My Home Page</h1>
          <SplashPage />
        </Route>
        <ProtectedRoute>
          
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
