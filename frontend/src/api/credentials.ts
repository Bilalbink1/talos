

import axios from 'axios';

import { type Credential } from "../types/credentials";

export const fetchUserCredentials = async (): Promise<Credential[]> => {

    return axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/users/0/credentials`
    )
    .then((response) => {
        console.log(response.data)
        const response_body = response.data.credentials;
        return response_body
    })
    .catch(function (error) {
        console.error(error);
        return [];
    })
}