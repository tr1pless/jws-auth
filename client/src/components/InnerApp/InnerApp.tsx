import React, { FC, useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../..'
import s from './innerApp.module.css'
import TodoList from '../TodoList/TodoList'

const InnerApp: FC = () => {
  const { store } = useContext(Context)

  return (
    <div>
      <TodoList />
    </div>
  )
}

export default observer(InnerApp)
