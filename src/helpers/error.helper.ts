export class ErrorTM extends Error {
	constructor(name: string, message?: string) {
		super()
		this.name = name
		this.message = message
	}
}

export class ErrorMessage extends Error {
	constructor(message: string) {
		super()
		this.message = message
	}
}
