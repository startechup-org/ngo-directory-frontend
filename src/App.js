import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import Header from "components/Header";
import Footer from "components/Footer";
import LoginPage from "views/Login";
import SignUpPage from "views/SignUp";
import NgoListPage from "views/NGOList";
import AdminDashboard from "views/AdminDashboard";
import UserList from "views/UserList";

import { PrivateRoute, PublicRoute } from "./views";
import { AuthProvider } from "context/auth";

function App() {
  return (
    <Router>
      <AuthProvider>
        <PublicRoute component={Header} />
        <Switch>
          <PublicRoute path="/users" component={UserList} exact />
          <PrivateRoute
            path="/admin"
            component={AdminDashboard}
            allowedRoles={["super_admin"]}
            exact
          />
          <PrivateRoute path="/list" component={NgoListPage} exact />
          <PublicRoute
            path="/signup"
            component={SignUpPage}
            restricted="true"
            exact
          />
          <PublicRoute path="/" component={LoginPage} restricted="true" exact />
        </Switch>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;