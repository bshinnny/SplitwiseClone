import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'

const NavBar = () => {
  return (
    <nav>
      <div id='nav-bar'>
          <NavLink style={{ color: 'black', textDecoration: 'none'}} to='/' exact={true} activeClassName='active'>
            <div id='logo-name'>
              <img id='logo' src='https://s3.amazonaws.com/itunes-images/app-assets/458023433/80793600/458023433-80793600-circularArtwork-300.jpg' alt='logo'/>
              <h1>Smartsplit</h1>
            </div>
          </NavLink>
          <div className='navbar-right'>
            <span id='login'>
            <NavLink to='/login' style={{ color: '#1cc29f', textDecoration: 'none'}} exact={true} activeClassName='active'>
              Log in
            </NavLink>
            </span>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              <button id='sign-up-button'>Sign Up</button>
            </NavLink>
          </div>
      </div>
      <ul>
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
