import { useState } from 'react'
import Child1 from './Child1'
import Child2 from './Child2'

const Parent = () => {
  const [count, setCount] = useState(0)

  const incrementCount = () => {
    setCount(prev => prev + 1)
  }

  return (
    <div>
      <h1>Good</h1>
      <p>Count: {count}</p>
      <Child1 count={count} incrementCount={incrementCount} />
      <Child2 />
    </div>
  )
}
export default Parent
