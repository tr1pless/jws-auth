import React, { memo, useContext, useState, useEffect } from 'react'
import { Context } from '../..'
import s from '../InnerApp/innerApp.module.css'

function TodoList() {
  const { store } = useContext(Context)
  const [showList, setShowList] = useState(true)
  const [refresh, setRefresh] = useState(false)
  const todoArray = store.todoListArray
  useEffect(() => {
    if (todoArray.length > 0) {
      setShowList(true)
    }
  }, [])

  const handleList = () => {
    store.todoList()
    setShowList(!showList)
  }

  const deleteHandler = (e: any) => {
    store.removeTodo(e.target.id)
    const timeout = setTimeout(() => {
      store.todoList()
    }, 100)
  }

  return (
    <div className={s.todoList}>
      {showList
        ? todoArray.map((item) => (
            <div
              id={item.idItem}
              key={item.idItem}
              className={s.todoList__item}
            >
              <button id={item.idItem} onClick={(e) => deleteHandler(e)}>
                X
              </button>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p>{item.deadline}</p>
            </div>
          ))
        : 'empty'}
      <button onClick={() => handleList()}>list</button>
    </div>
  )
}

export default TodoList
