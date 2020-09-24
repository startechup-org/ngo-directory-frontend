// const timeLimit = 86400; // 24 hours,
const ngodirectory_auth = JSON.parse(
	localStorage.getItem("ngodirectory_auth") || "{}"
  );

// export const auth = {
// 	isLoggedIn: !!localStorage.getItem('ngodirectory_auth'),
// 	timeLimit,
// 	isTokenExpired:
// 		(new Date().getTime() -
// 			parseInt(`${localStorage.getItem('login_timestamp')}` || '0')) /
// 		1000 > timeLimit,
// 	isSuperAdmin: !!ngodirectory_auth?.user?.userType === "super_admin",
// };

export const retrieveUserCredential = () => {
	return ngodirectory_auth;
  };
  