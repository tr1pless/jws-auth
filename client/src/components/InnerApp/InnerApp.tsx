import React, { FC, useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../..'
import s from './innerApp.module.css'
import TodoList from '../TodoList/TodoList'

const InnerApp: FC = () => {
  const { store } = useContext(Context)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [deadline, setDeadline] = useState('')
  const [showList, setShowList] = useState(false)
  const [refresh, setRefresh] = useState(false)

  const todoArray = store.todoListArray

  return (
    <div className='container'>
      <div className={s.todoList}>
        <TodoList />
      </div>
      <div className={s.todoForm}>
        <input
          type='text'
          value={title}
          placeholder='title'
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type='text'
          value={description}
          placeholder='description'
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type='textarea'
          value={deadline}
          placeholder='deadline'
          onChange={(e) => setDeadline(e.target.value)}
        />
        <button
          onClick={() => {
            store.addTodo(title, description, deadline)
          }}
        >
          Add New Todo
        </button>
      </div>
    </div>
  )
}

export default observer(InnerApp)
