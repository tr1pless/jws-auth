const TodoModel = require('../models/todo-model')

class TodoService {
  deadlines = []
  async addTodo(user, title, description, idItem, deadline) {
    const todo = await TodoModel.create({
      user,
      title,
      description,
      idItem,
      deadline,
    })
    return todo
  }

  async removeTodo(id) {
    const deleteElement = await TodoModel.deleteOne({ idItem: id })

    return deleteElement
  }

  async todoList() {
    const list = await TodoModel.find()
    return list
  }

  async checkDeadline(id) {
    const match = await TodoModel.findOneAndUpdate(
      { idItem: id },
      { expired: true },
    )
    return match
  }
  async deadlineArray() {
    const match = await TodoModel.find()
    const result = match.filter((item) => item.deadline !== '')
    this.deadlines.push(result)
  }
  // async almostExpired() {
  // const time = new Date()
  // const year = time.getFullYear()
  // const month = time.getMonth() + 1
  // const day = time.getDate()
  // const dateTime = time.toLocaleTimeString('en-GB', {
  // hour: 'numeric',
  // minute: 'numeric',
  // hour12: false,
  // })

  // let date = `${year}.${month < 10 ? `0${month}` : month}.${
  // day < 10 ? `0${day}` : day
  // }`
  // const dateToNumbers = (s) => {
  // const pattern = /[^0-9]/g
  // const result = s.replace(pattern, '')
  // return result
  // }
  // const result = await TodoModel.find((item) => {
  // if (item.deadline !== '') {
  // console.log(item.deadline)
  // }
  // })
  // }
}

module.exports = new TodoService()
