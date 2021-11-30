import React, { useState, useEffect } from 'react';
import './App.css';
import { Auth, Hub } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import SideNav from './components/SideNav';
import Profile from './pages/Profile';
import Payroll from './pages/Payroll';
import Timesheets from './pages/Timesheets';
import CreatePayroll from './pages/CreatePayroll';

function App() {

  const listener = (data) => {
    switch (data.payload.event) {
      case 'signIn':
        console.info('user signed in');
        break;
      case 'signOut':
        console.info('user signed out');
        break;
      case 'signIn_failure':
        console.error('user sign in failed');
        break;
      case 'configured':
        console.info('the Auth module is configured');
        break;
      default:
        console.error('unknown event: ', data.payload.event);
    }
  }
  Hub.listen('auth', listener);

  const [userData, setUserData] = useState({ payload: { username: '' } });

  useEffect(() => {
    fetchUserData();
  }, []);

  async function fetchUserData() {
    await Auth.currentAuthenticatedUser()
      .then((userSession) => {
        console.log("userData: ", userSession);
        setUserData(userSession.signInUserSession.accessToken);
      })
      .catch((e) => console.log("Not signed in", e));
  }

  function isAdmin() {
    return userData.payload['cognito:groups'] && userData.payload['cognito:groups'][0] === "Admins";
  }

  function userInfo() {
    return (
      <>
        {userData.payload.username} <div className="badge">{isAdmin() ? "Admin" : "User"}</div>
      </>
    );
  }

  return (
    <div className="App">

      <Router>
        <SideNav />
        <Switch>
          <Route path='/' exact component={Profile} />
          <Route path='/payroll' component={Payroll} />
          <Route path='/timesheets' component={Timesheets} />
          <Route path='/createpayroll' component={CreatePayroll} />
        </Switch>
      </Router>

      <hr />
      { userInfo()}
    </div>
  );
}

export default withAuthenticator(App);
