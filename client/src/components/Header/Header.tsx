import React, { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../../index'
import { observer } from 'mobx-react-lite'

const Header: FC = () => {
  const { store } = useContext(Context)
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    setTimeout(() => setTime(new Date()), 1000)
  }, [time])

  return (
    <div>
      <button onClick={() => store.logout()}>Выйти</button>
      <div>
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
    </div>
  )
}

export default observer(Header)
