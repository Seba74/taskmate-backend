export interface Project {
	id: string
	name: string
	description: string
	project_picture: string
	created_at: string
	updated_at: string
}

export interface CreateProject {
	userId: string
	title: string
	description: string
	project_picture?: string
}
