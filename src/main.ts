import express from 'express'
import { createServer } from 'http'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import indexRoutes from './routes/index'

dotenv.config()

const app: express.Application = express()
const port: number = parseInt(process.env.PORT || '4000')
const server = createServer(app)


const startServer = (callback: () => void) => {
	server.listen(port, () => {
		callback()
	})
}

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.options('*', cors())
// Cors config
app.use(
	cors({
		origin: '*',
		credentials: true,
		allowedHeaders: 'Content-Type',
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		preflightContinue: false,
	}),
)

app.use('/', indexRoutes)

// Start server
startServer(() => {
	console.log(`Server running on port ${port}`)
})
