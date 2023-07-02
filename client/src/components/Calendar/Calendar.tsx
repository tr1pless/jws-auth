import { useEffect } from 'react'

export const Calendar = () => {
  const date = new Date()

  useEffect(() => {
    console.log(date.getDate())
  }, [])
  return (
    <>
      <div></div>
    </>
  )
}
