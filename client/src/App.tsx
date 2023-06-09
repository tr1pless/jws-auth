import { observer } from 'mobx-react-lite'
import { FC, useContext, useEffect } from 'react'
import { Context } from '.'
import LoginForm from './components/LoginForm/LoginForm'
import Header from './components/Header/Header'

const App: FC = () => {
  const { store } = useContext(Context)

  // const [users, setUsers] = useState<IUser[]>([])

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])

  // async function getUsers() {
  // try {
  // const response = await UserService.fetchUsers()
  // setUsers(response.data)
  // } catch (e) {}
  // }

  if (store.isLoading) {
    return <div> Загрузка....</div>
  }
  if (!store.isAuth) {
    return <LoginForm />
  }
  return (
    <>
      <Header />
      <div>
        <h1>
          {store.isAuth
            ? `Привет ${store.user ? store.user.email : ''}`
            : `Авторизуйтесь`}
        </h1>
        {/* <button onClick={getUsers}> получить пользователей</button> */}
        {/* {users.map((user) => ( */}
        {/* <div key={user.email}>{user.email}</div> */}
        {/* ))} */}
      </div>
    </>
  )
}

export default observer(App)
