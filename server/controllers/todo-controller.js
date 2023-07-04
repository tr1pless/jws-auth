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
      const { id } = req.body
      const todoData = await todoService.removeTodo(id)
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

  async checkDeadline(req, res, next) {
    try {
      const { id } = req.body
      const deadlineData = await todoService.checkDeadline(id)
      return res.json(deadlineData)
    } catch (e) {
      next(e)
    }
  }

  async hours3Left(req, res, next) {
    try {
      const { id } = req.body
      const notice3h = await todoService.hours3Left(id)
      return res.json(notice3h)
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new TodoController()
