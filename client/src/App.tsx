import { observer } from 'mobx-react-lite'
import React, { FC, useContext, useEffect, useState } from 'react'
import { Context } from '.'
import LoginForm from './components/LoginForm'
import { IUser } from './models/IUser'
import UserService from './services/UserService'

const App: FC = () => {
  const { store } = useContext(Context)

  const [users, setUsers] = useState<IUser[]>([])

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers()
      setUsers(response.data)
    } catch (e) {}
  }

  if (store.isLoading) {
    return <div> Загрузка....</div>
  }
  if (!store.isAuth) {
    return <LoginForm />
  }
  return (
    <div>
      <h1>
        {store.isAuth
          ? `Привет ${store.user ? store.user.email : ''}`
          : `Авторизуйтесь`}
      </h1>
      <button onClick={() => store.logout()}>Выйти</button>
      <button onClick={getUsers}> получить пользователей</button>
      {users.map((user) => (
        <div key={user.email}>{user.email}</div>
      ))}
    </div>
  )
}

export default observer(App)
