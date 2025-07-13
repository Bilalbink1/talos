type DateTimeString = string;

export interface CredentialCreate {
    name: string;
    description: string;
    payload: { [key: string]: string };
}

export interface Credential {
    id: string;
    issuer_id: number;
    name: string;
    description: string;
    payload: { [key: string]: string };
    created_date: DateTimeString;
    signature: string;
}