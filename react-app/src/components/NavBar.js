import React, {useState, useEffect} from 'react';
import { useSelector} from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'
import userImg from '../assets/user.png'


const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const user = useSelector(state => Object.values(state.session)[0])

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
      if (!showMenu) return;

      const closeMenu = () => {
          setShowMenu(false);
      };

      document.addEventListener('click', closeMenu);

      return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);


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
        <NavLink style={{ color: 'black', textDecoration: 'none'}} to='/dashboard' exact={true} activeClassName='active'>
            <div id='logo-name-2'>
              <img id='logo-2' src='https://s3.amazonaws.com/itunes-images/app-assets/458023433/80793600/458023433-80793600-circularArtwork-300.jpg' alt='logo'/>
              <h1>Smartsplit</h1>
            </div>
        </NavLink>
        <div className='navbar-right-2'>
          <button id='nav-user-button' onClick={openMenu}>
            <img id='user-img' src={userImg} alt='user icon'></img>
            <p>{user.firstName} {user.lastName}</p>
            <i className="fa-solid fa-caret-down" />
          </button>
          {showMenu && (
            <ul className='profile-dropdown'>
              <NavLink style={{ color: 'black', textDecoration: 'none'}} to='/dashboard'>Dashboard</NavLink>
              <li>Username: {user.username}</li>
              <li>Email: {user.email}</li>
              <li><LogoutButton /></li>
            </ul>
          )}
        </div>
      </div>
      </>
    )
  }


  return (
    <nav>
      { content }
      {/* <ul>
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
      </ul> */}
    </nav>
  );
}

export default NavBar;
