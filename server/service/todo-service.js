const TodoModel = require('../models/todo-model')

class TodoService {
  deadlines = []

  setDeadlines(deadlineArr) {
    this.deadlines = deadlineArr
  }
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
    this.setDeadlines([result])
    // console.log(this.deadlines, 'service')
  }
  async hours3Left(id) {
    const match = await TodoModel.findOneAndUpdate(
      { idItem: id },
      { notice3h: true },
    )
    console.log(match, '3hnotice service')
    return match
  }
}

module.exports = new TodoService()
