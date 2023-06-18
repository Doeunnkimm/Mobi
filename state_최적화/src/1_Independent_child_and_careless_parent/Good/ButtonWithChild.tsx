import { useState } from 'react'
import Child1 from '../../Components/Child1'

const ButtonWithChild = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>업데이트</button>
      {isOpen && <Child1 />}
    </>
  )
}
export default ButtonWithChild
