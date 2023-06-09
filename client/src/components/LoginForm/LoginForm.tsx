import { observer } from 'mobx-react-lite'
import { FC, useContext, useState } from 'react'
import s from './loginform.module.css'
import { Context } from '../..'

const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { store } = useContext(Context)

  function handleEnter(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key == 'Enter') {
      store.login(email, password)
    }
  }

  return (
    <>
      <div className='container'>
        <div onKeyDown={(event) => handleEnter(event)} className={s.loginform}>
          <h1 className={s.loginform__title}>LoginForm</h1>
          <input
            className={s.loginform__input}
            onChange={(e) => setEmail(e.target.value)}
            type='text'
            value={email}
            placeholder='Email'
          />
          <input
            className={s.loginform__input}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type='password'
            placeholder='Password'
          />
          <button
            className={s.loginform__login}
            onClick={() => store.login(email, password)}
          >
            Log in
          </button>
          <button
            className={s.loginform__signin}
            onClick={() => store.registration(email, password)}
          >
            Sign In
          </button>
        </div>
      </div>
    </>
  )
}

export default observer(LoginForm)
