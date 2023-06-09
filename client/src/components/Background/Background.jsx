import React, { useState } from 'react'
import { useEffect } from 'react'
import s from './background.module.css'

export const Background = () => {
  const [count, setCount] = useState([])
  let numbers = []

  let i = 0

  const returnRandom = () => {
    return { animationDuration: Math.random(1, 10) + 5 + 's' }
  }

  useEffect(() => {
    while (numbers.length < 81) {
      i = ++i
      numbers.push(i)
      setCount([...numbers])
    }
  }, [])

  return (
    <div className={s.bgContainer}>
      {count.map((children) => {
        return (
          <div
            style={returnRandom()}
            className={`${s.bgChilds}  ${s.bgChild}${children}`}
            key={+children}
          ></div>
        )
      })}
    </div>
  )
}
