import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import AuthContext from '../../context/auth-context';
import './MainNavigation.css';

export default function MainNavigation() {
  const value = useContext(AuthContext);
  return (
    <header className='main-navigation'>
      <div className='main-navigation__logo'>
        <h1>Easy Event</h1>
      </div>
      <div className='main-navigation__items'>
        <ul>
          {!value.token && (
            <li>
              <NavLink to='/auth'>Authenticate</NavLink>
            </li>
          )}
          <li>
            <NavLink to='/events'>Events</NavLink>
          </li>
          {value.token && (
            <li>
              <NavLink to='/bookings'>Bookings</NavLink>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}
