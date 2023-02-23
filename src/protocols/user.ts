export type UserEntity = {
    id: number,
    email: string,
    password: string
}

export type User = Omit<UserEntity, "id">