import React from "react";
import api from "utils/api";
import useLocalStorage from "utils/hooks/useLocalStorage";

const AuthContext = React.createContext();

function AuthProvider(props) {
 
  const [user, setUser] = useLocalStorage("user", null);
  const [auth, setAuth] = useLocalStorage("ngodirectory_auth", null);
  const [loginTimestamp, setLoginTimestamp] = useLocalStorage(
    "login_timestamp",
    null
  );

  const login = (data) => {
    return api.post("/user/login/", data).then((response) => {
      setUser(response.data.user);
      setAuth(response.data);
      setLoginTimestamp(new Date().getTime().toString());

      return response;
    });
  };

  const logout = () => {
    return new Promise((resolve, reject) => {
      localStorage.removeItem("ngodirectory_auth");
      localStorage.removeItem("login_timestamp");
      localStorage.removeItem("user");
      resolve("ok")
    })
  };

  const signup = (data) => {
    return api.post("/user/", data);
  };

  return (
    <AuthContext.Provider
      value={{ user, auth, loginTimestamp, login, logout, signup }}
      {...props}
    />
  );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };