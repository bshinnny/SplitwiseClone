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
import Dashboard from './components/Dashboard/Dashboard';

import SplashPage from './components/SplashPage';
import AllExpenses from './components/AllExpenses';
import FriendSideBar from './components/friends/SideBar';
import FriendDetail from './components/friends/FriendDetail';
import GroupsSidebar from './components/Groups/GroupsSidebar';
import GroupDetails from './components/Groups/GroupDetails';
import CreateGroupForm from './components/Groups/CreateGroupForm';
import Template from './components/Template/Template';
import AddGroupMemberForm from './components/Groups/AddGroupMemberForm';
import DeleteWarning from './components/friends/DeleteWarning';
import EditGroupForm from './components/Groups/EditGroupForm';

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
        <Route path='/template' exact={true} >
          <Template />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/friends/current' exact={true} >
          <FriendSideBar/>
        </ProtectedRoute>
        <ProtectedRoute path='/friends/delete' exact={true} >
          <DeleteWarning/>
        </ProtectedRoute>
        <ProtectedRoute path='/friends/:friendId' exact={true} >
          <FriendDetail/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/dashboard' exact={true}>
          <Dashboard />
        </ProtectedRoute>
        {/* <ProtectedRoute path='/expenses/:expenseId/comments' exact={true} >
          <CommentsOfExpense />
        </ProtectedRoute> */}
        <Route path='/' exact={true} >
          <SplashPage />
        </Route>
        <ProtectedRoute path='/expenses/all' exact={true}>
            <AllExpenses />
        </ProtectedRoute>
        <ProtectedRoute path='/groups/current' exact={true}>
          <GroupsSidebar />
        </ProtectedRoute>
        <ProtectedRoute path='/groups/new' exact={true}>
          <CreateGroupForm />
        </ProtectedRoute>
        <ProtectedRoute path='/groups/:groupId' exact={true}>
          <GroupDetails />
        </ProtectedRoute>
        <ProtectedRoute path='/groups/:groupId/members/add' exact={true}>
          <AddGroupMemberForm />
        </ProtectedRoute>
        <ProtectedRoute path='/groups/:groupId/edit' exact={true}>
          <EditGroupForm />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
