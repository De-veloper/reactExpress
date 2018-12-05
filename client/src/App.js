import React, { Component } from 'react';

//Import route
import { Switch, Route } from 'react-router-dom'

//Import Component
import Origin from './ui/pages/OriginalPage';
import Bikes from './ui/pages/Bikes';
import Home from './ui/pages/Home';
import Refs from './ui/pages/Refs/index';
import FormTest from './ui/pages/Playground/form';
import ClientList from './ui/pages/ClientList';
import MyRaces from './ui/pages/MyRaces';

class App extends Component {
  render() {
    return (
        <Switch>
          <Route exact path='/bikes' component={Bikes}/>
          <Route exact path='/' component={Home}/>
          <Route exact path='/origin' component={Origin}/>
          <Route exact path='/refs' component={Refs}/>
          <Route exact path='/formtest' component={FormTest}/>
          <Route exact path='/clientlist' component={ClientList}/>
          <Route exact path='/myraces' component={MyRaces}/>
        </Switch>
    );
  }
}

export default App;
