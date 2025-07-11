

import axios from 'axios';

import { type Credential } from "../types/credentials";

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