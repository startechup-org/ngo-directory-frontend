import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "context/auth";

const PrivateRoute = ({ component: Component, allowedRoles = [], ...rest }) => {
  const { isLoggedIn, user } = useAuth(); //from utils to check if there's token in localStorage
  console.log("PrivateRoute -> isLoggedIn", isLoggedIn);
  console.log("PrivateRoute -> user", user);

  return (
    // Show the component only if the user is logged in
    // Otherwise, redirect to / which is our signin page
    <Route
      {...rest}
      render={(props) => {
        if (allowedRoles.length > 0 && !allowedRoles.includes(user?.userType)) {
          return <Redirect to="/" />;
        }

        return isLoggedIn ? <Component {...props} /> : <Redirect to="/" />;
      }}
    />
  );
};

const PublicRoute = ({ component: Component, restricted = false, ...rest }) => {
  const { isLoggedIn, isSuperAdmin } = useAuth();

  return (
    // restricted = false meaning public route, unrestricted access
    // restricted = true meaning restricted route such as signin or signup,
    //              do not show if already logged in, we redirect to "/list"
    <Route
      {...rest}
      render={(props) => {
        return isLoggedIn && restricted ? (
          <Redirect to={isSuperAdmin ? "/admin" : "/list"} />
        ) : (
          <Component {...props} />
        );
      }}
    />
  );
};

export { PrivateRoute, PublicRoute };