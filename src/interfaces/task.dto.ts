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
	start_date: Date
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
	start_date: Date
	end_date: Date
}
