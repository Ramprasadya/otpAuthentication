const connectToMongo = require('./server')
const express = require('express')
const app = express()
const port = 3000
app.use(express.json())
connectToMongo

// Available Routes

app.use('/api', require('./routers/userAuth'))
app.use('/api', require('./routers/verifyOTP'))



app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})