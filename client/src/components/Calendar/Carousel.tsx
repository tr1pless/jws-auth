import s from './calendar.module.css'
import { nanoid } from 'nanoid'
import months from './months.json'
import { useState } from 'react'

export const Carousel = ({ month }: { month: string }) => {
  const carLength = months.length

  const [activeIndex, setActiveIndex] = useState(+month - 1)
  const prevMonth = () => {
    if (activeIndex !== 0) {
      setActiveIndex(activeIndex - 1)
    } else {
      setActiveIndex(activeIndex - 1 + carLength)
    }
    console.log(activeIndex, 'minus')
  }
  const nextMonth = () => {
    if (activeIndex !== 11) {
      setActiveIndex(activeIndex + 1)
    } else {
      setActiveIndex(activeIndex - 11)
    }
    console.log(activeIndex, 'plus')
  }
  return (
    <>
      <div className={s.carouselWrp}>
        <button className={s.carouselBtn} onClick={() => prevMonth()}>
          <svg
            style={{ transform: 'rotate(-90deg)' }}
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
          >
            <path d='M23.677 18.52c.914 1.523-.183 3.472-1.967 3.472h-19.414c-1.784 0-2.881-1.949-1.967-3.472l9.709-16.18c.891-1.483 3.041-1.48 3.93 0l9.709 16.18z' />
          </svg>
        </button>

        <div className={s.carouselContainer}>
          {months.map((item) => (
            <div className={s.carouselItem}>
              <p
                style={{
                  transform: `translateX(-${activeIndex * 100}%)`,
                  width: '150px',
                  transition: '1s',
                }}
                key={nanoid()}
              >
                {item.name}
              </p>
            </div>
          ))}
        </div>

        <button className={s.carouselBtn} onClick={() => nextMonth()}>
          <svg
            style={{ transform: 'rotate(90deg)' }}
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
          >
            <path d='M23.677 18.52c.914 1.523-.183 3.472-1.967 3.472h-19.414c-1.784 0-2.881-1.949-1.967-3.472l9.709-16.18c.891-1.483 3.041-1.48 3.93 0l9.709 16.18z' />
          </svg>
        </button>
      </div>
    </>
  )
}
