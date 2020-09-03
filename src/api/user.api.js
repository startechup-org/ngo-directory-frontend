import api from '../resources/api';

 export function user_login(data) { 
    return api.post('/user/login/', data);
}

export function user_signup(data) {
    return api.post('/user/', data);
}

/*

{
	"username": "TEST123",
	"name": "test123 Credo",
	"email": "test123@cleo.com",
	"password": "pass123",
	"language": "English",
	"country": "Philippines",
	"userType": "ngo_admin"
}

*/