import { TaskResource } from './taskResource.dto'

export interface TaskResourceType {
	id: string
	description: string
	status: boolean
	createdAt: Date
	updatedAt: Date
	TaskResource: TaskResource[]
}

export interface CreateTaskResourceType {
	description: string
}
