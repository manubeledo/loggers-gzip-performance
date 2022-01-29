let logs4js = require('log4js');

logs4js.configure({
    appenders:{
        fileType: { type:'file', filename: 'warn.log'},
        errorType: { type:'file', filename: 'error.log'},
        consoleType: {type:'console', level: 'trace'}
    },
    categories:{
        default:{ appenders: ['fileType'], level: 'debug'},
        error:{ appenders: ['errorType'], level: 'trace'},
        logsConsole: { appenders: ['consoleType'], level:'trace'}
    }
})

module.exports = {
    default:     logs4js.getLogger(),
    error:       logs4js.getLogger('error'),
    logsConsole: logs4js.getLogger('logsConsole')
}
