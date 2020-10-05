import React from 'react';
import api from 'utils/api';
import useLocalStorage from 'utils/hooks/useLocalStorage';

const AuthContext = React.createContext();

function AuthProvider(props) {
	const [user, setUser] = useLocalStorage('user');
	const [auth, setAuth] = useLocalStorage('ngodirectory_auth');
	const [loginTimestamp, setLoginTimestamp] = useLocalStorage(
		'login_timestamp'
	);

	const isLoggedIn = !!user;
	const isSuperAdmin = user?.userType === 'super_admin' || false;

	const login = (data) => {
		return api.post('/user/login/', data).then((response) => {
			setAuth(response.data);
			setUser(response.data?.user);
			setLoginTimestamp(new Date().getTime().toString());

			return response;
		});
	};

	const logout = () => {
		return new Promise((resolve) => {
			setUser(null);
			setAuth(null);
			setLoginTimestamp(null);

			localStorage.removeItem('ngodirectory_auth');
			localStorage.removeItem('login_timestamp');
			localStorage.removeItem('user');

			resolve('done');
		});
	};

	const signup = (data) => {
		return api.post('/user', data).then((response) => {
			setAuth(response.data);
			setUser(response.data?.user);
			setLoginTimestamp(new Date().getTime().toString());

			return response;
		});
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,
				auth,
				loginTimestamp,
				login,
				logout,
				signup,
				isLoggedIn,
				isSuperAdmin,
			}}
			{...props}
		/>
	);
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
