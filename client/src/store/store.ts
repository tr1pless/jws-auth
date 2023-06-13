import { makeAutoObservable } from 'mobx'
import { IUser } from '../models/IUser'
import AuthService from '../services/AuthService'
import axios from 'axios'
import { AuthResponse } from '../models/response/AuthResponse'

import { API_URL } from '../http'
import TodoService from '../services/TodoService'

export default class Store {
  user = {} as IUser
  isAuth = false
  isLoading = false
  todoListArray: any[] = []
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
  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password)
      console.log(response)

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
      console.log(response)
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
      const response = await TodoService.addTodo(
        this.user.id,
        title,
        description,
        deadline,
      )
    } catch (e: any) {
      console.log(e.response?.data?.message)
    }
  }
  async todoList() {
    try {
      const response = await TodoService.todoList()
      const list = response.data.filter((item) => item.user === this.user.id)
      this.setTodoListArray([...list])
      console.log(this.todoListArray[0].title)
    } catch (e: any) {
      console.log(e.response?.data?.message)
    }
  }
}
