import React, { FC, useContext } from 'react'
import { Context } from '../../index'
import { observer } from 'mobx-react-lite'

const Header: FC = () => {
  const { store } = useContext(Context)
  return (
    <div>
      <button onClick={() => store.logout()}>Выйти</button>
    </div>
  )
}

export default observer(Header)
