const TodoModel = require('../models/todo-model')

class TodoService {
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
}

module.exports = new TodoService()
