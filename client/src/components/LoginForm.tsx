import { observer } from 'mobx-react-lite'
import React, { FC, useContext, useState } from 'react'
import { Context } from '..'

const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { store } = useContext(Context)

  return (
    <>
      <div>
        <h1>LoginForm</h1>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type='text'
          value={email}
          placeholder='Email'
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type='password'
          placeholder='Password'
        />
        <button onClick={() => store.login(email, password)}>Логин</button>
        <button onClick={() => store.registration(email, password)}>
          Регистрация
        </button>
      </div>
    </>
  )
}

export default observer(LoginForm)
