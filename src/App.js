import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/header/index';
import LoginPage from './routes/login-page/view'
import SignUpPage from './routes/signup-page/view'
import NgoListPage from './routes/ngo-list-page/view'

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/signup" component={SignUpPage} />
        <Route path="/list" component={NgoListPage} />
        <Route path="/" component={LoginPage} />
      </Switch>
    </Router>
  );
}

export default App;
