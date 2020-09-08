import React from "react";
import {
  Route,
  Redirect,
} from "react-router-dom";

const PrivateRoute = (props) => {
    let isAuthenticated = localStorage.getItem('ngodirectory_auth') !== null ? true : false
    const time_limit = 86400 //24h in seconds
    const isTokenExpired = ((new Date().getTime() - parseInt(`${localStorage.getItem('login_timestamp')}` || '0')) / 1000) > time_limit
 
    if (isTokenExpired) {
        localStorage.removeItem('ngodirectory_auth');
        localStorage.removeItem('login_timestamp');
        isAuthenticated = false
    }

    return (
      <Route
        {...props.rest}
        render={({ location }) =>
        (isAuthenticated && !isTokenExpired) ? (
            props.children
            ) : (
            <>
                <Redirect
                to={{
                    pathname: "/",
                    state: { from: location }
                }}
                />
                  
            </>
            
          )
        }
      />
    );
}

export default PrivateRoute;