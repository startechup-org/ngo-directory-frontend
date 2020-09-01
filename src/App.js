import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/header/index.js';
import LoginPage from './routes/login-page/view'

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/login" component={LoginPage} />
      </Switch>
    </Router>
  );
}

export default App;
