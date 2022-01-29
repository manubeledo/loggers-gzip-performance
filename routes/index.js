const { Router } = require("express");
const router = Router();
const usersHandlers = require('../controllers/usersHandlers')

function serverRouter(app){
    app.use("/", router);

    router.get('/', usersHandlers.raiz)
    router.get('/info', usersHandlers.getInfo)
    router.get('/api/random', usersHandlers.getRandoms)
    router.get('/mensajes', usersHandlers.errorpath)
    router.get('/productos', usersHandlers.errorpath)
    router.get('*', usersHandlers.nopath)

}

module.exports = serverRouter;
