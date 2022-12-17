import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import background from '../../assets/background.png'
import './auth.css'
import footer from '../../assets/footer.png'
import github from '../../assets/github.png'

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
    <div id='signup-form-container' style={{ backgroundImage: `url(${background})`}}>
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
    <div className='developers-bar'>
        <div>Developers:</div>
        <div className='each-developer'>Brandon Shin
            <a href='https://github.com/bshinnny'>
                <img className='github-img' src={github} alt='github'></img>
            </a>
        </div>
        <div className='each-developer'>Edmund Ju
            <a href='https://github.com/edmundj0'>
                <img className='github-img' src={github} alt='github'></img>
            </a>
        </div>
        <div className='each-developer'>Lijuan Xu
            <a href='https://github.com/XU1204'>
                <img className='github-img' src={github} alt='github'></img>
            </a>
        </div>
        <div className='each-developer'>Vivian Wang
            <a href='https://github.com/MangoPie888'>
                <img className='github-img' src={github} alt='github'></img>
            </a>
        </div>
    </div>
    <img className='footer' src={footer} alt='footer'></img>
    </>
  );
};

export default SignUpForm;
