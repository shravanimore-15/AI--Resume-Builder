const app = require('./app')
const connectDB = require('./config/db')

const port = process.env.port || 5000

app.listen(port, () => {
    console.log('server is running on port 5000')
    connectDB()
})