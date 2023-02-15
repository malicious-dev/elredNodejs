require('dotenv').config(); //
const express = require('express')
var morgan = require('morgan')
const cookieParser = require('cookie-parser')
require('./db/db')
const port = process.env.PORT || 3000;
const user = require('./routes/user.route')
const tasks = require('./routes/task.route')
// const admin = require('./routes/admin-route')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// app.use('/user', user)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use("/auth",user)
app.use("/task",tasks)

// app.use("/admin",admin)

app.get('/', (req, res) => {
  res
  .send('Hello World!')
})


app.listen(port, function (error) {
  
  // Checking any error occur while listening on port
  if (error) {
      console.log('Something went wrong', error);
  }
  // Else sent message of listening
  else {
      console.log('Server is listening on port: ' + port);
  }
})