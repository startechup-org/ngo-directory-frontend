import api from 'utils/api';

export function allOrganizations() { 
    return api.get('/organizations');
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