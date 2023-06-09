import { observer } from 'mobx-react-lite'
import { FC, useContext, useEffect } from 'react'
import { Context } from '.'
import LoginForm from './components/LoginForm/LoginForm'
import Header from './components/Header/Header'
import { Spinner } from '@chakra-ui/react'
import s from './app.module.css'
import InnerApp from './components/InnerApp/InnerApp'
import { Background } from './components/Background/Background'

const App: FC = () => {
  const { store } = useContext(Context)

  // const [users, setUsers] = useState<IUser[]>([])

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
      console.log(store.isAuth)
    }
  }, [])

  // async function getUsers() {
  // try {
  // const response = await UserService.fetchUsers()
  // setUsers(response.data)
  // } catch (e) {}
  // }

  if (store.isLoading) {
    return (
      <div className={s.spinnerContainer}>
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='white.500'
          color='blue.500'
          size='xxxl'
        />
      </div>
    )
  }
  if (!store.isAuth) {
    return (
      <>
        <Background />
        <LoginForm />
      </>
    )
  }
  return (
    <>
      <Header />
      <Background />
      <div>
        <InnerApp />
        {/* <h1> */}
        {/* {store.isAuth */}
        {/* ? `Привет ${store.user ? store.user.email : ''}` 
             {/* : `Авторизуйтесь`} 
        {/* </h1> */}
        {/* <button onClick={getUsers}> получить пользователей</button> */}
        {/* {users.map((user) => ( */}
        {/* <div key={user.email}>{user.email}</div> */}
        {/* ))} */}
      </div>
    </>
  )
}

export default observer(App)
