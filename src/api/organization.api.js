import api from 'utils/api';

export function allOrganizations() { 
    return api.get('/organizations');
}
