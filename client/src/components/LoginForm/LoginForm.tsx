import { observer } from 'mobx-react-lite'
import { FC, useContext, useState } from 'react'
import s from './loginform.module.css'
import { Context } from '../..'

const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
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
          <h1 className={s.loginform__title}>Lorem, ipsum.</h1>

          <div className={s.inputWrp}>
            <input
              className={s.loginform__input}
              onChange={(e) => setEmail(e.target.value)}
              type='text'
              value={email}
              placeholder='Email'
            />
          </div>
          <div className={s.inputWrp}>
            <input
              className={s.loginform__input}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type={show ? `text` : `password`}
              placeholder='Password'
            ></input>
            <button className={s.showBtn} onClick={handleClick}>
              <svg
                style={{ opacity: '0.8' }}
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
              >
                <path d='M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 7.449-11.985 7.449c-7.18 0-12.015-7.449-12.015-7.449s4.446-6.551 12.015-6.551c7.694 0 11.985 6.551 11.985 6.551zm-7 .449c0-2.761-2.238-5-5-5-2.761 0-5 2.239-5 5 0 2.762 2.239 5 5 5 2.762 0 5-2.238 5-5z' />
              </svg>
            </button>
          </div>
          <div className={s.logsigWrp}>
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
      </div>
    </>
  )
}

export default observer(LoginForm)
