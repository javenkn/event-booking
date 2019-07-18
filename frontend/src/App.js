import React, { useState } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import AuthPage from './pages/Auth';
import EventsPage from './pages/Events';
import BookingsPage from './pages/Bookings';
import MainNavigation from './components/Navigation';
import AuthContext from './context/auth-context';

import './App.css';

function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const login = (loginUserId, userToken, tokenExpiration) => {
    setToken(userToken);
    setUserId(loginUserId);
  };
  const logout = (userId, token, tokenExpiration) => {
    setToken(null);
    setUserId(null);
  };

  return (
    <div className='App'>
      <BrowserRouter>
        <>
          <AuthContext.Provider value={{ token, userId, login, logout }}>
            <MainNavigation />
            <main className='main-content'>
              <Switch>
                {token && <Redirect from='/' to='/events' exact />}
                {token && <Redirect from='/auth' to='/events' exact />}
                {!token && <Route path='/auth' component={AuthPage} />}
                <Route path='/events' component={EventsPage} />
                {token && <Route path='/bookings' component={BookingsPage} />}
                {!token && <Redirect to='/auth' exact />}
              </Switch>
            </main>
          </AuthContext.Provider>
        </>
      </BrowserRouter>
    </div>
  );
}

export default App;
