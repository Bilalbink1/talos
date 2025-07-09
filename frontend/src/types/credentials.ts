export interface Credential {
    id?: string
    name: string;
    description: string;
    data: { [key: string]: string };
}