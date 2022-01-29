const express = require('express')
require('dotenv').config()
const app = express()
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv
const PORT = Number(argv._) || process.env.PORT
const serverRoutes = require('./routes/index')
const compression = require('compression')

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs");
app.set("views", "./views/layouts");
app.use(compression());

serverRoutes(app)

app.listen(PORT, () => console.log(`Servidor funcionando en http://localhost:${PORT}`))

