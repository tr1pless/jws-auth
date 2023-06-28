import React, { memo, useContext, useState, useEffect } from 'react'
import { Context } from '../..'
import s from '../InnerApp/innerApp.module.css'

interface TodoItem {
  idItem: string
  title: string
  description: string
  deadline: string
  expired?: boolean
}

function TodoList() {
  const { store } = useContext(Context)
  const [showList, setShowList] = useState(true)
  const [todoList, setTodoList]: any[] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [deadline, setDeadline] = useState('')
  const [time, setTime] = useState(new Date())
  const todoArray: any[] = store.todoListArray
  const [expired, setExpired]: any[] = useState([])

  const year = time.getFullYear()
  const month = time.getMonth() + 1
  const day = time.getDate()

  const ifDeadlineExpired = () => {
    const result = todoArray.find((item: TodoItem) => {
      const insideArrayItem = dateToNumbers(item.deadline)
      const currentTime = dateToNumbers(`${date}${dateTime}`)
      if (insideArrayItem != '') {
        if (currentTime > insideArrayItem) {
          store.checkDeadline(item.idItem)
        }
      }
    })
  }

  const dateTime = time.toLocaleTimeString('en-GB', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  })

  let date = `${year}.${month < 10 ? `0${month}` : month}.${
    day < 10 ? `0${day}` : day
  }`

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
    if (todoArray.length !== todoList.length) {
      setRefresh(true)
      store.todoList()
      setTodoList([...todoArray])
      setShowList(true)
    }
  }, [])

  useEffect(() => {
    if (refresh) {
      store.todoList()
      ifDeadlineExpired()
      setTimeout(() => {
        setTodoList([...todoArray])
        setRefresh(false)
      }, 400)
    }
  }, [refresh])

  useEffect(() => {
    if (todoList.length != 0) {
      setTimeout(() => {
        ifDeadlineExpired()
      }, 60000)
    }
  }, [])

  const handleList = () => {
    setRefresh(true)
    store.todoList()
  }

  const deleteHandler = (e: any) => {
    setRefresh(true)
    store.removeTodo(e.target.id)
    handleList()
  }
  const addHandler = () => {
    setRefresh(true)
    store.addTodo(title, description, deadline)
    handleList()
  }
  const dateToNumbers = (s: string) => {
    const pattern = /[^0-9]/g
    const result = s.replace(pattern, '')
    return result
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
                      <p
                        style={
                          item.expired ? { color: 'red' } : { color: 'black' }
                        }
                      >
                        {item.deadline ? item.deadline : 'without deadline'}
                      </p>
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
