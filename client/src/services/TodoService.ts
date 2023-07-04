import $api from '../http'
import { AxiosResponse } from 'axios'
import { TodoResponse } from '../models/response/TodoResponse'

export default class TodoService {
  static async addTodo(
    user: string,
    email: string,
    title: string,
    description: string,
    idItem: string,
    deadline?: string,
  ): Promise<AxiosResponse<TodoResponse>> {
    return $api.post<TodoResponse>('/addTodo', {
      user,
      email,
      title,
      description,
      idItem,
      deadline,
    })
  }

  static async removeTodo(id: string): Promise<AxiosResponse<TodoResponse>> {
    return $api.post<TodoResponse>('/removeTodo', {
      id,
    })
  }
  static async todoList(): Promise<AxiosResponse<TodoResponse[]>> {
    return $api.get<TodoResponse[]>('/getList')
  }
  static async checkDeadline(id: string): Promise<AxiosResponse<TodoResponse>> {
    return $api.post<TodoResponse>('/checkDeadline', {
      id,
    })
  }
}
