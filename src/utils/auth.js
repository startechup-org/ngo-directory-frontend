const timeLimit = 86400; // 24 hours,

export const auth = {
	isLoggedIn: !!localStorage.getItem('ngodirectory_auth'),
	timeLimit,
	isTokenExpired:
		(new Date().getTime() -
			parseInt(`${localStorage.getItem('login_timestamp')}` || '0')) /
			1000 > timeLimit,
};

export const retrieveUserCredential = () => {
    return JSON.parse(localStorage.getItem("ngodirectory_auth") || "{}")
}
