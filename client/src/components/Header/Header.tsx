import React, { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../../index'
import { observer } from 'mobx-react-lite'
import s from './header.module.css'

const Header: FC = () => {
  const { store } = useContext(Context)
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    setTimeout(() => setTime(new Date()), 1000)
  }, [time])

  return (
    <div className={s.header}>
      <div className={s.timeWrp}>
        <p>
          {time.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </p>
        <p>
          {time.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: false,
          })}
        </p>
      </div>
      <button className={s.exitBtn} onClick={() => store.logout()}>
        <svg
          className={s.exitIcon}
          width='24'
          height='24'
          xmlns='http://www.w3.org/2000/svg'
          fillRule='evenodd'
          clipRule='evenodd'
        >
          <path d='M11 21h8.033v-2l1-1v4h-9.033v2l-10-3v-18l10-3v2h9.033v5l-1-1v-3h-8.033v18zm-1 1.656v-21.312l-8 2.4v16.512l8 2.4zm11.086-10.656l-3.293-3.293.707-.707 4.5 4.5-4.5 4.5-.707-.707 3.293-3.293h-9.053v-1h9.053z' />
        </svg>
      </button>
    </div>
  )
}

export default observer(Header)
