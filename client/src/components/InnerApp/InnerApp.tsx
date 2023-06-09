import React, { FC, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../..'

const InnerApp: FC = () => {
  const { store } = useContext(Context)
  return <div></div>
}

export default observer(InnerApp)
