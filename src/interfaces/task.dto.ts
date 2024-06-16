import { CollaboratorsOnTasks } from './collaboratorOnTasks.dto'
import { Comment } from './comment.dto'
import { Project } from './project.dto'
import { TaskResource } from './taskResource.dto'
import { TaskStatus } from './taskStatus.dto'

export interface Task {
	id: string
	project: Project
	projectId: string
	taskStatus: TaskStatus
	taskStatusId: string
	description: string
	end_date: Date
	status: boolean
	createdAt: Date
	updatedAt: Date
	collaboratorsOnTasks: CollaboratorsOnTasks[]
	comments: Comment[]
	taskResource: TaskResource[]
}

export interface CreateTask {
	projectId: string
	description: string
	endDate: Date
	taskStatus?: string
	collaborators?: string[]
}

export interface UpdateTask {
	description: string
	endDate: Date
	taskStatus?: string
	collaborators?: string[]
}