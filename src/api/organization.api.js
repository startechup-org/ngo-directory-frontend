import api from 'utils/api';
import { getHeaders } from './headers'

export function allOrganizations(access_token) {
    return api.get('/organizations', getHeaders(access_token));
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