import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import background from '../../assets/background.png'
import './auth.css'
import footer from '../../assets/footer.png'
import more from '../../assets/more.png'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nickname, setNickname] = useState('')

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();

    const errorsArr = []

    if (firstName.length > 49) {
      errorsArr.push("First Name must be less than 50 characters")
    }
    if (lastName.length > 49) {
      errorsArr.push("Last Name must be less than 50 characters")
    }
    if (username.length > 39) {
      errorsArr.push("Username must be less than 40 characters")
    }
    if (nickname.length > 49) {
      errorsArr.push("Nickname must be less than 50 characters")
    }
    if (email.length > 254) {
      errorsArr.push("Email length must be less than 255 characters")
    }
    if (password.length > 30) {
      errorsArr.push("Password length must be less than 30 characters")
    }

    if (errorsArr.length) {
      setErrors(errorsArr)
      return;
    }




    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, firstName, lastName, nickname));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  }

  const updateLastName = (e) => {
    setLastName(e.target.value);
  }

  const updateNickname = (e) => {
    setNickname(e.target.value);
  }

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <div id='signup-form-container' style={{ backgroundImage: `url(${background})` }}>
        <form id='signup-form' onSubmit={onSignUp}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='signup_form_input_container'>
            <div>First Name</div>
            <input
              type='text'
              name='First Name'
              onChange={updateFirstName}
              value={firstName}
              required={true}
            ></input>
          </div>
          <div className='signup_form_input_container'>
            <div>Last Name</div>
            <input
              type='text'
              name='Last Name'
              onChange={updateLastName}
              value={lastName}
              required={true}
            ></input>
          </div>
          <div className='signup_form_input_container'>
            <div>Nickname</div>
            <input
              type='text'
              name='Nickname'
              onChange={updateNickname}
              value={nickname}
            ></input>
          </div>
          <div className='signup_form_input_container'>
            <div>User Name</div>
            <input
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
              required={true}
            ></input>
          </div>
          <div className='signup_form_input_container'>
            <div>Email</div>
            <input
              type='email'
              name='email'
              onChange={updateEmail}
              value={email}
              required={true}
            ></input>
          </div>
          <div className='signup_form_input_container'>
            <div>Password</div>
            <input
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
              required={true}
            ></input>
          </div>
          <div className='signup_form_input_container'>
            <div>Repeat Password</div>
            <input
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <button id='signup-form-button' type='submit'>Sign Up</button>
        </form>
      </div>
      <img className='footer' src={more} alt='more'></img>
      <img className='footer' src={footer} alt='footer'></img>
    </>
  );
};

export default SignUpForm;
