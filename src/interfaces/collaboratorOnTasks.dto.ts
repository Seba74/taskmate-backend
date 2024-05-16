import { Collaborator } from './collaborator.dto'
import { Task } from './task.dto'

export interface CollaboratorsOnTasks {
	id: string
	collaborator: Collaborator
	task: Task
	collaboratorId: string
	taskId: string
	status: boolean
	createdAt: Date
	updatedAt: Date
}

export interface CreateCollaboratorsOnTasks {
	collaboratorId: string
	taskId: string
}
