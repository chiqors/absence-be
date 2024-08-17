// Dependencies & Libraries
import express, {type Request, type Response, type NextFunction, type Express} from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from "helmet"
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

// Utils
import logger from "@app/utils/logger.ts"
import {loadRoutes} from "@app/utils/routing/loadRoutes.ts";

// Load environment variables and initialize express
dotenv.config()
const app: Express = express()
const checkProductionMode = process.env.PRODUCTION_MODE === 'true'
const checkNgrokMode = process.env.NGROK_MODE === 'true'
const listenUrl = (process.env.BACKEND_PRODUCTION_URL
    ? process.env.BACKEND_PRODUCTION_URL.replace('https://', '')
    : 'http://localhost'
)
const port = (process.env.BACKEND_PORT ? parseInt(process.env.BACKEND_PORT) : 3000)

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))

app.get(
    '/',
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            res.status(200).json({
                message: 'Hurray!! we create our first server on bun js',
                success: true,
            })
            logger.info('GET / - Success')
        } catch (error: unknown) {
            logger.error(`GET / - Error: ${(error as Error).message}`)
            next(new Error((error as Error).message))
        }
    },
)
loadRoutes(app, 'api');

if (checkNgrokMode) {
    if (checkProductionMode) {
        logger.error('Ngrok mode is enabled. Please disable it in .env file')
        process.exit(1)
    }
    app.listen(port, () => {
        logger.info(`${process.env.APP_NAME} listening on port ${process.env.BACKEND_PORT} from ${process.env.BACKEND_DEVELOPMENT_URL}`)
        logger.info(`Ngrok mode is ${process.env.NGROK_MODE}. Backend is listening on ${process.env.BACKEND_PRODUCTION_URL}`)
    })
} else {
    if (checkProductionMode) {
        app.listen(port, listenUrl, () => {
            logger.info(`${process.env.APP_NAME} listening on port ${process.env.BACKEND_PORT} from ${process.env.BACKEND_PRODUCTION_URL}`)
        })
    } else {
        app.listen(port, () => {
            logger.info(`${process.env.APP_NAME} listening on port ${process.env.BACKEND_PORT} from ${process.env.BACKEND_DEVELOPMENT_URL}`)
        })
    }
}