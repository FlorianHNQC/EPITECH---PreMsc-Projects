const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/userRouter')
const taskRouter = require('./routers/taskRouter')
const widgetRouter = require('./routers/widgetRouter')
const app = express()
const cors = require('cors')()
const port = process.env.PORT || 8080
var info = require('./models/info')

app.use(cors)
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)
app.use(widgetRouter)

app.get('/about.json', (req, res) => {
    info.customer.host = req.headers.host
    info.server.current_time = new Date().valueOf()
    res.send(info)
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
