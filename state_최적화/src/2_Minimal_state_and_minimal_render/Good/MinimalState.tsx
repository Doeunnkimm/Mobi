import { useState } from 'react'

const MinimalState = () => {
  const [count, setCount] = useState(0)

  const increment = () => {
    setCount(prev => prev + 1)
  }

  return (
    <>
      <h1>Minimal State 👶🏻</h1>
      <h3>count: {count}</h3>
      <h3>Is Even : {count % 2 === 0 ? 'Yes' : 'No'}</h3>
      <h3>Is Prime : {count % 2 !== 0 ? 'Yes' : 'No'}</h3>
      <h3>Is Positive: {count > 0 ? 'Yes' : 'No'}</h3>
      <h3>Is Multiple of Five: {count % 5 === 0 ? 'Yes' : 'No'}</h3>
      <hr />
      <button onClick={increment}>증가</button>
    </>
  )
}
export default MinimalState
