import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'
import userImg from '../assets/user.png'
import { Modal } from '../context/Modal';


const NavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector(state => Object.values(state.session)[0])

  const toggleMenu = () => {
    const menu = document.querySelector('#dropdown_menu')
    if(menu.classList.contains('hidden')) {
      menu.classList.remove('hidden')
    } else {
      menu.classList.add('hidden')
    }
  }

  let content;
  if (!user) {
    content = (
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
    )
  }
  else {
    content = (
      <>
      <div className='nav2-container'>
        <NavLink style={{ color: 'black', textDecoration: 'none'}} to='/' exact={true} activeClassName='active'>
            <div id='logo-name-2'>
              <img id='logo-2' src='https://s3.amazonaws.com/itunes-images/app-assets/458023433/80793600/458023433-80793600-circularArtwork-300.jpg' alt='logo'/>
              <h1>Smartsplit</h1>
            </div>
        </NavLink>
        <div className='navbar-right-2'>
          <button id='nav-user-button' onClick={(toggleMenu)}>
            <img id='user-img' src={userImg} alt='user icon'></img>
            <p>{user.firstName} {user.lastName}</p>
            <i className="fa-solid fa-caret-down" />
          </button>
        </div>
      </div>
        <div id='dropdown_menu' className='hidden'>
          <div className='dropdown_menu_item' id='dropdown_first' onClick={() => history.push('/dashboard')}>
            Dashboard
          </div>
          {/* <div className='dropdown_menu_item' onClick={() => setShowModalGroup(true)}>
            Create a group
          </div> */}
          <NavLink to='/groups/new'>
            Create a group
          </NavLink>
          <LogoutButton />
      </div>
      </>
    )
  }


  return (
    <nav>
      { content }
      <ul>
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
