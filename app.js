const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require("dotenv").config()
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");


const app = express()
const authRouter = require("./routes/api/auth")
const bookRouter = require("./routes/api/book")
const trainRouter=require("./routes/api/train")
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use("/api/auth", authRouter)
app.use("/api/book", bookRouter)
app.use("/api/train", trainRouter)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use((_, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, _, res, __) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
})

module.exports = app
