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
    console.log(todo)
    return todo
  }

  async removeTodo(id) {
    const deleteElement = await TodoModel.deleteOne({ idItem: id })

    return deleteElement
  }

  async todoList() {
    const list = await TodoModel.find()
    console.log(list)
    return list
  }
}

module.exports = new TodoService()
