import { retrieveUserCredential } from "utils/auth";
export const getHeaders = (access_token) => ({
    headers: { "Authorization": `Bearer ${access_token || retrieveUserCredential}`}
})
