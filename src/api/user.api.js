import api from 'utils/api';

import { getHeaders } from './headers'

// import { retrieveUserCredential } from "utils/auth";
// const headers = {headers: { "Authorization": `Bearer ${retrieveUserCredential().access_token}`}}

export function allUsers(access_token) {
    return api.get('/users', getHeaders(access_token));
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

export function deleteUser(user_id) {
    return api.delete_(`/user/${user_id}`)
}

export function managedOrganizationsByUser(user_id) {
	return api.get(`/user/${user_id}/organizations`);
}