import api from '../resources/api';

 export function user_login(body) { 
    return api.post('/user/login/', body);
}

// export function generateAccountProfile() {
//     const headers = {Authorization: `Bearer ${getAuthToken()}`};
//     return axiosInstance.get("generate-personal-patient", {headers});
// }

// import {profile,generateAccountProfile} from "../../services/account.service";

// generateAccountProfile().then(res => {
//     this.getAccountProfile()
// }).catch(err => {
//     this.$Message.error("Failed to get profile");
// });