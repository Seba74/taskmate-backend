import { Collaborator } from './collaborator.dto'
import { Task } from './task.dto'

export interface Comment {
	id: string
	task: Task
	collaborator: Collaborator
	description: string
	taskId: string
	collaboratorId: string
	status: boolean
	createdAt: Date
	updatedAt: Date
}

export interface CreateComment {
	description: string
	collaboratorId: string
}
