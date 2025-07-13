import { type Credential } from "./credentials";

export interface DefaultResponse {
    error: string | null;
}

export interface FetchUserCredentialsResponse extends DefaultResponse{
    credentials: Credential[]
}

export interface FetchUserCredentialResponse extends DefaultResponse {
    credential: Credential | null
}

export interface VerifyCredentialResponse extends DefaultResponse {
    isValid: boolean;
}