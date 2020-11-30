import Layout from './components/Layout/Layout';
import React, { Fragment, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './store/actions';
import store from './index';
import Navigation from './components/Navigation/Navigation';
import Dashboard from './components/Dashboard/Dashboard';
import Admin from './components/Admin/Admin';
import AddPet from './components/AppPet/AddPet';

// if (localStorage.token) {
//   setAuthToken(localStorage.token);
// }

console.log(localStorage.token);

const App = () => {
  // useEffect(() => {
  //   store.dispatch(loadUser());
  // });
  return (
    <div>
      <Navigation />
      <Switch>
        {localStorage.token ?
          <Route path="/" exact component={Dashboard} />
          :
          <Route path="/" exact component={Layout} />
        }
        <Route path="/auth" exact component={Layout} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/add-a-pet" exact component={AddPet} />
        <Route path="/admin" exact component={Admin} />
      </Switch>
    </div>
  );
};

export default App;
