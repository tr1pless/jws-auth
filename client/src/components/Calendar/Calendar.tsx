import { useEffect, useState, useContext } from 'react'
import moment from 'moment'
import { Context } from '../..'
import s from './calendar.module.css'
import { nanoid } from 'nanoid'

type CalendarItems = {
  title: string
  description: string
  day: number
  month: number
  time: string
}

type TodoList = {
  title: string
  idItem: string
  deadline: string
  user: string
  description: string
}
type ActiveDay = {
  day: number
  month: number
}

export const Calendar = () => {
  const { store } = useContext(Context)
  const listArr = [...store.todoListArray]
  const initialMonth = moment().format('MM')
  const dayOfMonth = moment().date()

  const [todoList, setTodoList] = useState<TodoList[]>([])
  const [calendarItems, setCalendarItems] = useState<CalendarItems[]>([])
  const [count, setCount] = useState<number[]>([])
  const [activeDay, setActiveDay] = useState<CalendarItems[]>([])
  const [active, setActive] = useState(false)
  // const [activeDaySave, setActiveDaySave] = useState('')
  const [prevDay, setPrevDay] = useState('')
  const [month, setMonth] = useState(initialMonth)

  const daysInMonth = moment(`${month}`, 'MM').daysInMonth()

  const todoItemDate = (i: string) => {
    const day = moment(i).date()
    if (day < 10) {
      return +`0${day}`
    } else {
      return day
    }
  }
  const todoItemMonth = (i: string) => {
    const month = moment(i).month()
    if (month < 10) {
      return +`0${month}`
    } else {
      return month
    }
  }
  const todoItemTime = (i: string) => {
    const hours = moment(i).hours()
    const minutes = moment(i).minutes()
    // const time = `${hours < 10 ? '0' : hours}:${minutes === 0 ? '00' : minutes}`
    const hoursString = hours < 10 ? `0${hours}` : `${hours}`
    const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`
    const time = `${hoursString}:${minutesString}`

    return time
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
            let getMonth = todoItemMonth(item.deadline)
            todoArr.push({
              title: item.title,
              description: item.description,
              day: todoItemDate(item.deadline),
              month: getMonth + 1,
              time: todoItemTime(item.deadline),
            })
            setCalendarItems([...todoArr])
          }
        },
      )
    }
  }

  const dayClickHandler = (day: number, month: number) => {
    let activeArr: CalendarItems[] = []
    calendarItems.filter((item) => {
      if (item.day === day && +item.month === month) {
        setActive(!active)
        activeArr.push({
          title: item.title,
          description: item.description,
          day: item.day,
          month: item.month,
          time: item.time,
        })

        setActiveDay([...activeArr])
      }
    })

    setPrevDay(`${day}.${month}`)

    activeArr = []
  }

  return (
    <>
      <div className={s.calendarWrp}>
        <div className={s.calendar}>
          {count.map((day: number) => {
            return (
              <div
                onClick={() => {
                  dayClickHandler(day, +month)
                }}
                className={
                  dayOfMonth < day + 1
                    ? `${s.calendarBox}`
                    : `${s.calendarBoxExp} ${s.calendarBox}`
                }
                key={nanoid()}
              >
                <>
                  <p>
                    {day}.{month.length === 1 ? `0${month}` : month}
                  </p>
                  {calendarItems.map((item) => {
                    if (item.day === day && item.month === +month) {
                      return (
                        <div className={s.calendarTodo} key={nanoid()}>
                          <p className={s.calendarTitle}>{item.title}</p>
                        </div>
                      )
                    }
                  })}
                </>
              </div>
            )
          })}
        </div>
        <div
          className={
            active
              ? `${s.activeDay} ${s.active} `
              : `${s.activeDay} ${s.disabled}`
          }
        >
          {active
            ? activeDay.map((item) => {
                if (activeDay.length !== 0) {
                  return (
                    <div className={s.activeDayContainer} key={nanoid()}>
                      <p className={s.activeDayTitle}>{item.title}</p>
                      <p className={s.activeDayDesc}>{item.description}</p>
                      <p className={s.activeDayTime}>
                        {item.day < 10 ? '0' + item.day : item.day}.
                        {item.month < 10 ? '0' + item.month : item.month}T
                        {item.time}
                      </p>
                    </div>
                  )
                }
              })
            : null}
        </div>
      </div>
    </>
  )
}
