const { fork } = require("child_process");
const path =     require('path')
const os =       require('os')
const { default: logger, logsConsole: logsConsole, error: logsError} =   require('../utils/logger')

class UserHandler {

    async raiz(req, res, next){
        logsConsole.info(`Entry to the path: ${req.route.path} with method: ${req.route.stack[0].method}`)
        res.send(`En la raiz del Server`);
    }

    async getInfo(req, res, next) { 

        const data = {
            args: process.argv.slice(2),
            plataforma: process.platform,
            version: process.version,
            memoria: process.memoryUsage(),
            path: process.argv[1],
            processid: process.pid,
            carpeta: process.cwd(),
            cpus: os.cpus().length
        }

        
        logsConsole.info(`Entry to the path: ${req.route.path} with method: ${req.route.stack[0].method}`)

        res.render(`${path.join(__dirname, '../views/layouts/index')}`, { data: data });
    }

    async getRandoms (req, res, next){
        let cant = req.query.cant

        logsConsole.info(`Entry to the path: ${req.route.path} with method: ${req.route.stack[0].method}`)

        const child_process = fork(path.join(__dirname, './subprocesses/child_process.js'))

        if(!cant){
            child_process.send(10000000)
        } 
        else {
            child_process.send(cant)
        }

        child_process.on('message', response => {
            console.log('Respuesta del proceso hijo:', response.data)
            let newData = JSON.stringify(response.data, null, 2)
            res.send(`Los numeros aleatorios entre ${cant} numeros y la cantidad de veces que salio cada uno: ${newData}`)
        })
    }

    async nopath (req, res, next) {
        logsConsole.warn(`Entry to the path: ${req.route.path} with method: ${req.route.stack[0].method}`)
        logger.warn(`An entry to inexistence path`)
        res.send(`<h3>The path doesn't exist<h3>`)
    }

    async errorpath (req, res, next) {
        logsError.error(`Entry to the path: ${req.route.path} with method: ${req.route.stack[0].method}`)
        logsConsole.error(`Error from ${req.route.path}`)
        res.send(`<h3>The path doesn't exist<h3>`)
    }
}

module.exports = new UserHandler();