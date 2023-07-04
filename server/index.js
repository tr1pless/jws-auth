require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const cron = require('node-cron')

const mailService = require('./service/mail-service')
const todoService = require('./service/todo-service')
const router = require('./router/index')
const errorMiddleware = require('./middlewares/error-middleware')
const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  }),
)
app.use('/api', router)
app.use(errorMiddleware)

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    app.listen(PORT, () => console.log(`server started on PORT = ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}
let list = []

const time = new Date()
const year = time.getFullYear()
const month = time.getMonth() + 1
const day = time.getDate()
const dateTime = time.toLocaleTimeString('en-GB', {
  hour: 'numeric',
  minute: 'numeric',
  hour12: false,
})

let date = `${year}.${month < 10 ? `0${month}` : month}.${
  day < 10 ? `0${day}` : day
}`
const dateToNumbers = (s) => {
  const pattern = /[^0-9]/g
  const result = s.replace(pattern, '')
  return result
}

const checkDeadline = () => {
  try {
    list[0].map((item) => {
      if (item.deadline !== '') {
        const deadline = new Date(item.deadline)

        const deadlineDate = deadline.toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        })
        const deadlineTime = deadline.toLocaleTimeString('en-GB', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: false,
        })
        const deadlineStr = `${deadlineDate}${deadlineTime}`
        const deadlineResult = dateToNumbers(deadlineStr)
        const currentTime = dateToNumbers(`${date}${dateTime}`)
        const convertDeadline = deadlineResult.slice(deadlineResult.length - 4)
        const convertCt = currentTime.slice(currentTime.length - 4)

        if (+convertDeadline <= +convertCt + 300 && !item.notice3h) {
          console.log(item.idItem, 'index item id')
          todoService.hours3Left(item.idItem)
          mailService.send3hNotice(
            item.user,
            item.title,
            item.description,
            item.deadline,
          )
          todoService.deadlineArray()
        }
      }
    })
  } catch (e) {
    console.log(e.message)
  }
}

const job = cron.schedule('*/5 * * * * *', () => {
  todoService.deadlineArray()
  if (todoService.deadlines.length !== 0) {
    list = todoService.deadlines ? [...todoService.deadlines] : []
    // console.log(list, 'index deadlines')
    checkDeadline()
  }
})

start()
job.start()
