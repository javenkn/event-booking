import React, { useState, useRef } from 'react';

import './Auth.css';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const emailEl = useRef(null);
  const passwordEl = useRef(null);

  const submitHandler = event => {
    event.preventDefault();
    const email = emailEl.current.value;
    const password = passwordEl.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    let requestQuery = {
      query: `
        query {
          login(email: "${email}", password: "${password}") {
            userId
            token
            tokenExpiration
          }
        }
      `,
    };

    if (!isLogin) {
      requestQuery = {
        query: `
          mutation {
            createUser(userInput: {email: "${email}", password: "${password}"}) {
              _id
              email
            }
          }
        `,
      };
    }
    // request to the backend
    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestQuery),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed.');
        }
        return res.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(err => console.log(err));
  };

  return (
    <form className='auth-form' onSubmit={submitHandler}>
      <div className='form-control'>
        <label htmlFor='email'>Email</label>
        <input type='email' id='email' ref={emailEl} />
      </div>
      <div className='form-control'>
        <label htmlFor='password'>Password</label>
        <input type='password' id='password' ref={passwordEl} />
      </div>
      <div className='form-actions'>
        <button type='submit'>Submit</button>
        <button type='button' onClick={() => setIsLogin(!isLogin)}>
          Switch to {isLogin ? 'Signup' : 'Login'}
        </button>
      </div>
    </form>
  );
}
