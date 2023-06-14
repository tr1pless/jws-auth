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
      const { user, title, description, idItem, deadline } = req.body
      const todoData = await todoService.addTodo(
        user,
        title,
        description,
        idItem,
        deadline,
      )
      return res.json(todoData)
    } catch (e) {
      next(e)
    }
  }

  async removeTodo(req, res, next) {
    try {
      // const errors = validationResult(req)
      // if (!errors.isEmpty()) {
      // return next(ApiError.BadRequest('Validation error', errors.array()))
      // }
      const { id } = req.body
      const todoData = await todoService.removeTodo(id)
      console.log(id)
      console.log(todoData)
      return res.json(todoData)
    } catch (e) {
      next(e)
    }
  }
  async todoList(req, res, next) {
    try {
      const list = await todoService.todoList()
      res.json(list)
    } catch (e) {
      next(e)
    }
  }
}
module.exports = new TodoController()
