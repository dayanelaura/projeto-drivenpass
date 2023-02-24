export type CredentialEntity = {
    id: number,
    user: number,
    title: string,
    url: string,
    username: string,
    password: string,
}

export type Credential = Omit<CredentialEntity, "id">