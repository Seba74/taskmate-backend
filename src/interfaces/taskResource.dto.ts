import { Task } from './task.dto'
import { TaskResourceType } from './taskResourceType.dto'
import path from 'path';

export interface TaskResource {
	id: string
	taskResourceType: TaskResourceType
	task: Task
	taskResourceTypeId: string
	taskId: string
	path: string
	description: string
	status: boolean
	createdAt: Date
	updatedAt: Date
}

export interface CreateTaskResource {
	resourceType: string
	taskId: string
	path: string
	description: string
}

export interface UpdateTaskResource {
	description: string,
	path: string,
}