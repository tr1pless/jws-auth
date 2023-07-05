import { useEffect, useState, useContext } from 'react'
import moment from 'moment'
import { Context } from '../..'
import { list } from '@chakra-ui/react'

type CalendarItems = {
  title: string
  description: string
  day: number
  month: number
}

export const Calendar = () => {
  const { store } = useContext(Context)
  const listArr = [...store.todoListArray]

  const month = moment().format('YYYY-MM')
  const daysInMonth = moment(`${month}`, 'YYYY-MM').daysInMonth()
  const dayOfMonth = moment().date()

  const [days, setDays] = useState(daysInMonth)
  const [todoList, setTodoList]: any = useState([])
  const [calendarItems, setCalendarItems] = useState<CalendarItems[]>([])

  const todoItemDate = (i: string) => {
    return moment(i).date()
  }
  const todoItemMonth = (i: string) => {
    return moment(i).month()
  }
  useEffect(() => {
    if (listArr.length === 0) {
      store.todoList()
    }
    console.log(listArr)
  }, [listArr.length])
  useEffect(() => {
    if (listArr.length !== 0 && !store.isLoading) {
      setTodoList([...listArr])
    }
  }, [listArr.length])
  useEffect(() => {
    if (todoList.length !== 0) {
      checkDates()
    }
  }, [todoList])

  let todoArr: CalendarItems[] = []

  const checkDates = () => {
    if (todoList.length !== 0) {
      todoList.map(
        (item: { title: string; description: string; deadline: string }) => {
          if (item.deadline !== '') {
            // const day = item.deadline.slice(8, 9)
            // const month = item.deadline.slice(5, 6)
            // const time = item.deadline.slice(11, 15)
            console.log(
              todoItemDate(item.deadline),
              'date',
              todoItemMonth(item.deadline) + 1,
              'month',
            )
            todoArr.push({
              title: item.title,
              description: item.description,
              day: todoItemDate(item.deadline),
              month: todoItemMonth(item.deadline),
            })
          }
        },
        setCalendarItems([...todoArr]),
        console.log(todoArr), // тормознул тут нужно сделать календарь с проверкой по датам =? дедлайн .
      )
    }
  }

  return (
    <>
      <div>calendar</div>
    </>
  )
}
