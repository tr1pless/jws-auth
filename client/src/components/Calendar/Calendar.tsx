import { useEffect, useState, useContext } from 'react'
import moment from 'moment'
import { Context } from '../..'
import s from './calendar.module.css'

type CalendarItems = {
  title: string
  description: string
  day: number
  month: number
}

type TodoList = {
  title: string
  idItem: string
  deadline: string
  user: string
  description: string
}

export const Calendar = () => {
  const { store } = useContext(Context)
  const listArr = [...store.todoListArray]

  const month = moment().format('MM')
  const daysInMonth = moment(`${month}`, 'MM').daysInMonth()
  const dayOfMonth = moment().date()

  const [todoList, setTodoList] = useState<TodoList[]>([])
  const [calendarItems, setCalendarItems] = useState<CalendarItems[]>([])
  const [count, setCount] = useState<number[]>([])

  const todoItemDate = (i: string) => {
    return moment(i).date()
  }
  const todoItemMonth = (i: string) => {
    return moment(i).month()
  }

  let days: number[] = []
  let i: number = 0
  useEffect(() => {
    if (todoList.length !== 0) {
      checkDates()
    }
  }, [todoList])

  useEffect(() => {
    if (month !== undefined && calendarItems.length !== 0) {
      while (days.length < daysInMonth) {
        i = ++i
        days.push(i)
      }
      setCount([...days])
    }
  }, [calendarItems])
  useEffect(() => {
    if (listArr.length === 0) {
      store.todoList()
    }
  }, [listArr.length])
  useEffect(() => {
    if (listArr.length !== 0 && !store.isLoading) {
      setTodoList([...listArr])
    }
  }, [listArr.length])

  let todoArr: CalendarItems[] = []

  const checkDates = () => {
    if (todoList.length !== 0) {
      todoList.map(
        (item: { title: string; description: string; deadline: string }) => {
          if (item.deadline !== '') {
            // const day = item.deadline.slice(8, 9)
            // const month = item.deadline.slice(5, 6)
            // const time = item.deadline.slice(11, 15)

            todoArr.push({
              title: item.title,
              description: item.description,
              day: todoItemDate(item.deadline),
              month: todoItemMonth(item.deadline),
            })
            setCalendarItems([...todoArr])
          }
        },
      )
    }
  }

  return (
    <>
      <div className={s.calendar}>
        {count.map((day: number) => {
          console.log(count)

          return (
            <div className={s.calendarBox} key={day}>
              <>
                <p>{day}</p>
                {calendarItems.map((item) => {
                  if (item.day === day) {
                    return (
                      <div className={s.calendarTodo} key={item.day}>
                        <h1 className={s.calendarTitle}>{item.title}</h1>
                        <p className={s.calendarDesc}>{item.description}</p>
                      </div>
                    )
                  }
                })}
              </>
            </div>
          )
        })}
      </div>
    </>
  )
}
