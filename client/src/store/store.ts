import { makeAutoObservable } from 'mobx'
import { IUser } from '../models/IUser'
import AuthService from '../services/AuthService'
import axios from 'axios'
import { AuthResponse } from '../models/response/AuthResponse'
import { nanoid } from 'nanoid'
import { API_URL } from '../http'
import TodoService from '../services/TodoService'

export default class Store {
  user = {} as IUser
  isAuth = false
  isLoading = false
  todoListArray: any[] = []
  refresh = false
  constructor() {
    makeAutoObservable(this)
  }
  setAuth(bool: boolean) {
    this.isAuth = bool
  }
  setUser(user: IUser) {
    this.user = user
  }
  setLoading(bool: boolean) {
    this.isLoading = bool
  }
  setTodoListArray(array: any[]) {
    this.todoListArray = array
  }
  setRefresh(bool: boolean) {
    this.refresh = bool
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password)

      localStorage.setItem('token', response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (e: any) {
      console.log(e.response?.data?.message)
    }
  }
  async registration(email: string, password: string) {
    try {
      const response = await AuthService.registration(email, password)
      localStorage.setItem('token', response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (e: any) {
      console.log(e.response?.data?.message)
    }
  }

  async logout() {
    try {
      const response = await AuthService.logout()
      localStorage.removeItem('token')
      this.setAuth(false)
      this.setUser({} as IUser)
    } catch (e: any) {
      console.log(e.response?.data?.message)
    }
  }

  async checkAuth() {
    this.setLoading(true)
    try {
      const response = await axios.get<AuthResponse>(`/refresh`, {
        withCredentials: true,
        baseURL: API_URL,
      })
      localStorage.setItem('token', response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (e: any) {
      console.log(e.response?.data?.message)
    } finally {
      this.setLoading(false)
    }
  }
  async addTodo(title: string, description: string, deadline: string) {
    try {
      const id = nanoid()
      const response = await TodoService.addTodo(
        this.user.id,
        title,
        description,
        id,
        deadline,
      )
      await this.todoList()
    } catch (e: any) {
      console.log(e.response?.data?.message)
    }
  }

  async removeTodo(id: string) {
    try {
      const response = await TodoService.removeTodo(id)
      await this.todoList()
    } catch (e: any) {
      console.log(e.response?.data?.message)
    }
  }
  async todoList() {
    try {
      const response = await TodoService.todoList()
      const data = response.data

      if (!this.user.id) {
        const timer = setTimeout(() => {
          const list = data.filter((item) => item.user == this.user.id)
          this.setTodoListArray([...list])
        }, 500)
      } else {
        const list = data.filter((item) => item.user == this.user.id)
        this.setTodoListArray([...list])
      }
    } catch (e: any) {
      console.log(e.response?.data?.message)
    }
  }
}
