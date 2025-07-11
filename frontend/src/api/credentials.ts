

import axios from 'axios';
import {
    type Credential,
    type CredentialCreate,
} from "../types/credentials";

export const fetchUserCredentials = async (): Promise<Credential[]> => {

    return axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/users/0/credentials`
    )
    .then((response) => {
        const response_body = response.data.credentials;
        return response_body
    })
    .catch(function (error) {
        console.error(error);
        return [];
    })
}

export const fetchUserCredential = async (credential_id: string): Promise<Credential> => {

    return axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/users/0/credentials/${credential_id}`
    )
    .then((response) => {
        const response_body = response.data.credential;
        return response_body
    })
    .catch(function (error) {
        console.error(error);
        return null;
    })
}

export const createNewCredential = async (credential: CredentialCreate): Promise<boolean> => {
    return axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/users/0/credentials`,
        credential
    )
    .then(() => {
        return true
    })
    .catch(function (error) {
        console.error(error);
        return false
    })
}

export const deleteCredential = async (credential_id: string): Promise<boolean> => {
    return axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/users/0/credentials/${credential_id}`,
    )
    .then(() => {
        return true
    })
    .catch(function (error) {
        console.error(error);
        return false
    })
}
