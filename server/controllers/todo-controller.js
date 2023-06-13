const todoService = require('../service/todo-service')
const { validationResult } = require('express-validator')
const ApiError = require('../exceptions/api-error')

class TodoController {
  async addTodo(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation error', errors.array()))
      }
      const { user, title, description, deadline } = req.body
      const todoData = await todoService.addTodo(
        user,
        title,
        description,
        deadline,
      )
      console.log(todoData) //check new todo
      return res.json(todoData)
    } catch (e) {
      next(e)
    }
  }
  async todoList(req, res, next) {
    try {
      const list = await todoService.todoList()
      res.json(list)
      console.log(list)
    } catch (e) {
      next(e)
    }
  }
}
module.exports = new TodoController()
