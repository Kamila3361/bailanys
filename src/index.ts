import 'dotenv/config'
import express from 'express'
import { createServer } from 'node:http'
import connectDB from './db'
import globalRouter from './routes/global-router'
import { logger } from './logger'
import fileUpload from "express-fileupload";
import cors from "cors";

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(logger);
app.use(fileUpload());
app.use(cors());
app.use('', globalRouter)

const server = createServer(app)

server.listen(3000, () => {
  console.log('server running at http://localhost:3000')
})
