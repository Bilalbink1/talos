import axios from 'axios';
import {
    type Credential,
    type CredentialCreate,
} from "../types/credentials";
import {
    type VerifyCredentialResponse,
    type FetchUserCredentialsResponse,
    type FetchUserCredentialResponse,
    type DefaultResponse
} from "../types/response"


const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


axiosInstance.interceptors.response.use(
    // No changes for successful response
    (response) => {
        return response
    },
    (error) => {
        // Extract the error message from the backend error response
        // Fallback error message incase of an unhandled backend error
        const errorMessage: string = error?.response?.data?.detail?.error_message ? error.response.data.detail.error_message : "An unexpected error happened"

        return Promise.reject(new Error(errorMessage));
    }

)

export const fetchUserCredentials = async (): Promise<FetchUserCredentialsResponse> => {
    return axiosInstance.get(
        `/users/0/credentials`
    )
    .then((response) => {
        return {
            credentials: response.data.credentials,
            error: null
        }
    })
    .catch((error) => {
        return {
            credentials: [],
            error: error.message
        }
    })
}

export const fetchUserCredential = async (credential_id: string): Promise<FetchUserCredentialResponse> => {
    return axiosInstance.get(
        `/users/0/credentials/${credential_id}`
    )
    .then((response) => {
        return {
            credential: response.data.credential,
            error: null
        }
    })
    .catch(function (error) {
        return {
            credential: null,
            error: error.message
        }
    })
}

export const createNewCredential = async (credential: CredentialCreate): Promise<DefaultResponse> => {
    return axiosInstance.put(
        `/users/0/credentials`,
        credential
    )
    .then(() => {
        return {
            error: null
        }
    })
    .catch((error) => {
        return {
            error: error.message
        }
    })
}

export const deleteCredential = async (credential_id: string): Promise<DefaultResponse> => {
    return axiosInstance.delete(
        `/users/0/credentials/${credential_id}`,
    )
    .then(() => {
        return {
            error: null
        }
    })
    .catch((error) => {
        return {
            error: error.message
        }
    })
}

export const verifyCredential = async (credential: Credential): Promise<VerifyCredentialResponse> => {
    return axiosInstance.post(
        `/credentials/verify`,
        credential
    )
    .then((response) => {
        return {
            isValid: response.data.is_valid,
            error: response.data.error
        };
    })
    .catch((error) => {
        return {
            isValid: false,
            error: error.message
        };
    })
}