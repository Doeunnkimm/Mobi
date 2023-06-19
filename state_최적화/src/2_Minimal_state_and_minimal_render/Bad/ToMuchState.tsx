import { useState, useEffect } from 'react'

const ToMuchState = () => {
  const [count, setCount] = useState(0)
  const [isEven, setIsEven] = useState(false)
  const [isPrime, setIsPrime] = useState(false)
  const [isPositive, setIsPositive] = useState(false)
  const [isMultipleOfFive, setIsMultipleOfFive] = useState(false)

  useEffect(() => {
    setIsEven(count % 2 === 0)
    setIsPrime(count % 2 !== 0)
    setIsPositive(count > 0)
    setIsMultipleOfFive(count % 5 === 0)
  }, [count])

  const increment = () => {
    setCount(prev => prev + 1)
  }

  return (
    <>
      <h1>To Much State 😈</h1>
      <h3>count: {count}</h3>
      <h3>Is Even : {isEven ? 'Yes' : 'No'}</h3>
      <h3>Is Prime : {isPrime ? 'Yes' : 'No'}</h3>
      <h3>Is Positive: {isPositive ? 'Yes' : 'No'}</h3>
      <h3>Is Multiple of Five: {isMultipleOfFive ? 'Yes' : 'No'}</h3>
      <hr />
      <button onClick={increment}>증가</button>
    </>
  )
}
export default ToMuchState
