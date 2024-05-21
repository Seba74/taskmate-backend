import { Collaborator } from './collaborator.dto'

export interface Role {
	id: string
	description: string
	status: boolean
	createdAt: Date
	updatedAt: Date
	Collaborator: Collaborator[]
}

export interface CreateRole {
	description: string
}
