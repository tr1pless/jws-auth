const TodoModel = require('../models/todo-model')

class TodoService {
  async addTodo(user, title, description, deadline) {
    const todo = await TodoModel.create({
      user,
      title,
      deadline,
      description,
    })
    return todo
  }

  async todoList() {
    const list = await TodoModel.find()
    console.log(list)
    return list
  }
}

module.exports = new TodoService()
