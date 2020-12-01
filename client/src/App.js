import Layout from './components/Layout/Layout';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import Navigation from './components/Navigation/Navigation';
import Dashboard from './components/Dashboard/Dashboard';
import Admin from './components/Admin/Admin';
import AddPet from './components/AppPet/AddPet';
import ShowPet from './components/ShowPet/ShowPet';
import EditPet from './components/EditPet/EditPet';

const App = () => {
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
        <Route path="/show/:id" component={ShowPet} />
        <Route path="/edit/:id" exact component={EditPet} />
      </Switch>
    </div>
  );
};

export default App;
