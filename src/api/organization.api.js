import api from '../resources/api';

export function allOrganizations() { 
    return api.get('/organizations');
}
