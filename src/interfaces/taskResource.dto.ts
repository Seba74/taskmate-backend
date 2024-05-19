import { Task } from './task.dto'
import { TaskResourceType } from './taskResourceType.dto'

export interface TaskResource {
	id: string
	taskResourceType: TaskResourceType
	task: Task
	taskResourceTypeId: string
	taskId: string
	description: string
	status: boolean
	createdAt: Date
	updatedAt: Date
}

export interface CreateTaskResource {
	taskResourceTypeId: string
	description: string
}
