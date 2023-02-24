export type UserEntity = {
    id: number,
    email: string,
    password: string
}

export type User = Omit<UserEntity, "id">

export type Decoded = {
	id: string,
	iat: number,
	exp: number,
};