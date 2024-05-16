import { CollaboratorsOnTasks } from './collaboratorOnTasks.dto'
import { Comment } from './comment.dto'
import { Project } from './project.dto'
import { Role } from './role.dto'
import { User } from './user.dto'

export interface Collaborator {
	id: string
	project: Project
	role: Role
	user: User
	projectId: string
	userId: string
	roleId: string
	status: boolean
	createdAt: Date
	updatedAt: Date
	CollaboratorsOnTasks: CollaboratorsOnTasks[]
	Comments: Comment[]
}

export interface CreateCollaborator {
	projectId: string
	userId: string
	roleId: string
}
