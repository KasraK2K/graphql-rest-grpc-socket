/* ------------------------------ Node Modules ------------------------------ */
import { createServer } from 'node:http'
/* ------------------------------ Dependencies ------------------------------ */
import express from 'express'
import { Server } from 'socket.io'
/* ----------------------------- Custom Modules ----------------------------- */

const REST_PORT = process.env.REST_PORT || '3500'
const app = express()
const restAppServer = createServer(app)
const io = new Server(restAppServer)

export { app, restAppServer, io, REST_PORT }
