export interface Credential {
    name: string;
    description: string;
    data: { [key: string]: string };
}