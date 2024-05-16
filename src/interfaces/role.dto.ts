import { Collaborator } from './collaborator.dto'

export interface Role {
	id: string
	name: string
	description: string
	status: boolean
	createdAt: Date
	updatedAt: Date
	Collaborator: Collaborator[]
}

export interface CreateRole {
	name: string
	description: string
}
