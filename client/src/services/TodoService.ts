import $api from '../http'
import { AxiosResponse } from 'axios'
import { TodoResponse } from '../models/response/TodoResponse'

export default class TodoService {
  static async addTodo(
    user: string,
    title: string,
    description: string,
    deadline?: string,
  ): Promise<AxiosResponse<TodoResponse>> {
    return $api.post<TodoResponse>('/addTodo', {
      user,
      title,
      description,
      deadline,
    })
  }
  static todoList(): Promise<AxiosResponse<TodoResponse[]>> {
    return $api.get<TodoResponse[]>('/getList')
  }
}
