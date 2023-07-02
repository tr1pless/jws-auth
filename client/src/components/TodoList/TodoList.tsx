import React, { memo, useContext, useState, useEffect } from 'react'
import { Context } from '../..'
import s from './todoList.module.css'

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
  const [activeEls, setActiveEls]: any[] = useState([])

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
      }, 300)
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

  const deleteHandler = (id: string) => {
    setRefresh(true)
    store.removeTodo(id)
    const result = todoList.filter((item: TodoItem) => item.idItem !== id)
    setTodoList([...result])
    handleList()
    if (result.length !== todoArray.length) {
      store.updateTodoList(result)
    }
  }
  const addHandler = () => {
    setRefresh(true)
    store.addTodo(title, description, deadline)
    const newObj = [
      { title: title, description: description, deadline: deadline },
    ]
    setTodoList([...todoList, ...newObj])
    setDescription('')
    setTitle('')
    setDeadline('')
    handleList()
  }
  const dateToNumbers = (s: string) => {
    const pattern = /[^0-9]/g
    const result = s.replace(pattern, '')
    return result
  }

  const handleActive = (e: any) => {
    const match = activeEls.find(
      (item: { id: string }) => item.id === e.target.id,
    )
    if (!match) {
      setActiveEls([...activeEls, ...[{ id: e.target.id }]])
    } else {
      let arr = [...activeEls]
      const result = arr.filter((item) => item.id !== e.target.id)
      arr = [...result]
      setActiveEls([...arr])
    }
  }

  return (
    <>
      <div className='container'>
        <div style={{ position: 'relative' }}>
          <button
            style={
              refresh
                ? { transform: 'rotate(720deg)' }
                : { transform: 'rotate(0deg)' }
            }
            className={s.refreshBtn}
            onClick={() => handleList()}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
            >
              <path d='M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5 20l-1.359-2.038c-1.061.653-2.305 1.038-3.641 1.038-3.859 0-7-3.14-7-7h2c0 2.757 2.243 5 5 5 .927 0 1.786-.264 2.527-.708l-1.527-2.292h5.719l-1.719 6zm0-8c0-2.757-2.243-5-5-5-.927 0-1.786.264-2.527.708l1.527 2.292h-5.719l1.719-6 1.359 2.038c1.061-.653 2.305-1.038 3.641-1.038 3.859 0 7 3.14 7 7h-2z' />
            </svg>
          </button>

          <div className={s.todoList}>
            {showList && refresh != true
              ? todoList.map((item: TodoItem) => (
                  <div key={item.idItem} className={s.todoListWrp}>
                    <div>
                      <div
                        id={item.idItem}
                        key={item.idItem}
                        className={s.todoList__item}
                      >
                        <button
                          className={s.deleteItem}
                          id={item.idItem}
                          onClick={() => deleteHandler(item.idItem)}
                        >
                          <svg
                            id={item.idItem}
                            xmlns='http://www.w3.org/2000/svg'
                            width='24'
                            height='19'
                            viewBox='0 0 24 24'
                          >
                            <path d='M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.5 16.084l-1.403 1.416-4.09-4.096-4.102 4.096-1.405-1.405 4.093-4.092-4.093-4.098 1.405-1.405 4.088 4.089 4.091-4.089 1.416 1.403-4.092 4.087 4.092 4.094z' />
                          </svg>
                        </button>
                        <h3 className={s.itemTitle}>{item.title}</h3>

                        <p
                          className={s.deadline}
                          style={
                            item.expired ? { color: 'red' } : { color: 'black' }
                          }
                        >
                          {item.deadline ? item.deadline : 'without deadline'}
                        </p>
                        <button
                          style={
                            activeEls.find(
                              (i: { id: string }) => i.id === item.idItem,
                            )
                              ? {
                                  transition: '1s',
                                  transform: 'rotate(180deg)',
                                }
                              : { overflow: 'hidden', transition: '1s' }
                          }
                          id={item.idItem}
                          className={s.descriptionBtn}
                          onClick={(e) => {
                            handleActive(e)
                          }}
                        >
                          <svg
                            id={item.idItem}
                            width='24'
                            height='24'
                            xmlns='http://www.w3.org/2000/svg'
                            fillRule='evenodd'
                            clipRule='evenodd'
                          >
                            <path d='M0 3l12 18 12-18h-24zm12 16.197l-10.132-15.197h20.263l-10.131 15.197' />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <p
                      className={
                        activeEls.find(
                          (i: { id: string }) => i.id === item.idItem,
                        )
                          ? s.activeItem
                          : s.disabledItem
                      }
                    >
                      {item.description}
                    </p>
                  </div>
                ))
              : null}
          </div>
          <div className={s.todoList}></div>
          <div className={s.todoForm}>
            <div className={s.todoElemsWrp}>
              <input
                type='text'
                value={title}
                placeholder='title'
                onChange={(e) => setTitle(e.target.value)}
              />

              <input
                type='datetime-local'
                value={deadline}
                min={`${time.toLocaleDateString}T${time.toLocaleTimeString}`}
                max='2025-12-31T00:00'
                onChange={(e) => setDeadline(e.target.value)}
              ></input>
            </div>
            <textarea
              className={s.descriptionInput}
              rows={4}
              value={description}
              placeholder='description'
              onChange={(e) => setDescription(e.target.value)}
            />
            <button
              className={s.addBtn}
              onClick={() => {
                addHandler()
              }}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
              >
                <path d='M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z' />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default TodoList
