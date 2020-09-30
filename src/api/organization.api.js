import api from 'utils/api';

// import { retrieveUserCredential } from "utils/auth";
//const headers = {headers: { "Authorization": `Bearer ${retrieveUserCredential().access_token}`}}

export function allOrganizations(headers) {
    return api.get('/organizations', headers);
}

export function organizationById(organization_id) { 
    return api.get(`/organization/${organization_id}`);
} 

export function editOrganizationById(organization_id, data) { 
    return api.put(`/organization/${organization_id}`, data);
}

export function addOrganization(data) { 
    return api.post(`/organization`, data);
}