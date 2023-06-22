import { observer } from 'mobx-react-lite'
import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '.'
import LoginForm from './components/LoginForm/LoginForm'
import Header from './components/Header/Header'
import { Spinner } from '@chakra-ui/react'
import s from './app.module.css'
import InnerApp from './components/InnerApp/InnerApp'
import { Background } from './components/Background/Background'

const App: FC = () => {
  const { store } = useContext(Context)
  const [loading, setLoading] = useState(store.isLoading)

  useEffect(() => {
    if (store.todoListArray.length < 1) {
      store.todoList()
    }
  }, [store.todoListArray.length])
  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])

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
      </div>
    </>
  )
}

export default observer(App)
