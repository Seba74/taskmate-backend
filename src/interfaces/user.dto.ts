import { Collaborator } from './collaborator.dto'

export interface User {
	id: string
	name: string
	last_name: string
	profile_picture: string
	email: string
	status: boolean
	createdAt: Date
	updatedAt: Date
	Collaborator: Collaborator[]
}

export interface UpdateUser {
	name: string
	last_name: string
	profile_picture: string
	email: string
}
