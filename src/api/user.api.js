import api from 'utils/api';

import { retrieveUserCredential } from "utils/auth";
const headers = {headers: { "Authorization": `Bearer ${retrieveUserCredential().access_token}`}}

export function allUsers() {
    return api.get('/users', headers);
}

export function user_login(data) { 
    return api.post('/user/login/', data);
}

export function user_signup(data) {
    return api.post('/user/', data);
}

export function updateUser(user_id, data) {
	return api.put(`/user/${user_id}`, data);
}

export function managedOrganizationsByUser(user_id) {
	return api.get(`/user/${user_id}/organizations`);
}