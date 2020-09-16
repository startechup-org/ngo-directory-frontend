import api from 'utils/api';

export function allOrganizations() { 
    return api.get('/organizations');
}

export function organizationById(organization_id) { 
    return api.get(`/organization/${organization_id}`);
}
