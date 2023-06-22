import React, { memo, useContext, useState, useEffect } from 'react'
import { Context } from '../..'
import s from '../InnerApp/innerApp.module.css'

interface TodoItem {
  idItem: string
  title: string
  description: string
  deadline: string
}

function TodoList() {
  const { store } = useContext(Context)
  const [showList, setShowList] = useState(true)
  const [todoList, setTodoList]: any[] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [deadline, setDeadline] = useState('')
  const todoArray: any[] = store.todoListArray

  const [time, setTime] = useState(new Date())

  useEffect(() => {
    if (todoArray.length === 0) {
      store.todoList()
      setRefresh(true)
      setTodoList([...todoArray])
    } else if (todoArray.length != 0) {
      store.todoList()
      setRefresh(true)
      setTodoList([...todoArray])
    }
  }, [todoArray.length])

  useEffect(() => {
    if (todoArray.length != todoList.length) {
      setRefresh(true)
      store.todoList()
      setTodoList([...todoArray])
      setShowList(true)
    }
  }, [])

  useEffect(() => {
    if (refresh) {
      store.todoList()
      if (refresh) {
        setTimeout(() => {
          setTodoList([...todoArray])
          setRefresh(false)
        }, 400)
      }
    }
  }, [refresh])

  const handleList = () => {
    setRefresh(true)
    store.todoList()

    console.log(refresh)
  }

  const checkTime = () => {
    console.log(`${time.toDateString}T${time.toTimeString}`)
  }
  checkTime()
  const deleteHandler = (e: any) => {
    const prevList = todoArray
    setRefresh(true)
    store.removeTodo(e.target.id)
    console.log(todoList.length, todoArray.length)
  }
  const addHandler = () => {
    const prevList = todoArray
    setRefresh(true)
    store.addTodo(title, description, deadline)
    console.log(todoList.length, todoArray.length)
  }

  return (
    <>
      <div className='container'>
        <div>
          <div className={s.todoList}>
            {showList && refresh != true
              ? todoList.map((item: TodoItem) => (
                  <div key={item.idItem}>
                    <div
                      id={item.idItem}
                      key={item.idItem}
                      className={s.todoList__item}
                    >
                      <button
                        id={item.idItem}
                        onClick={(e) => deleteHandler(e)}
                      >
                        X
                      </button>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <p>{item.deadline}</p>
                    </div>
                  </div>
                ))
              : 'loading...'}
            <button onClick={() => handleList()}>refresh</button>
          </div>
          <div className={s.todoList}></div>
          <div className={s.todoForm}>
            <input
              type='text'
              value={title}
              placeholder='title'
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type='textarea'
              value={description}
              placeholder='description'
              onChange={(e) => setDescription(e.target.value)}
            />
            {/* <input 
              // type='textarea'
              // value={deadline}
              // placeholder='deadline'
              // onChange={(e) => setDeadline(e.target.value)}
            // />*/}
            <input
              type='datetime-local'
              value={deadline}
              min={`${time.toLocaleDateString}T${time.toLocaleTimeString}`}
              max='2025-12-31T00:00'
              onChange={(e) => setDeadline(e.target.value)}
            ></input>
            <button
              onClick={() => {
                addHandler()
              }}
            >
              Add New Todo
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default TodoList
