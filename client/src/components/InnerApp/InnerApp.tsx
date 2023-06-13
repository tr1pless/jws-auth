import React, { FC, useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../..'
import s from './innerApp.module.css'

const InnerApp: FC = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [deadline, setDeadline] = useState('')
  const [showList, setShowList] = useState(false)

  const { store } = useContext(Context)
  return (
    <div className='container'>
      <div className={s.todoList}>
        {showList
          ? store.todoListArray.map((item) => (
              <div className={s.todoList__item}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p>{item.deadline}</p>
              </div>
            ))
          : null}
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
      <button onClick={() => setShowList(!showList)}>list</button>
    </div>
  )
}

export default observer(InnerApp)
