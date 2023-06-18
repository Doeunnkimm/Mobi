import { useState } from 'react'
import Child1 from '../../Components/Child1'
import Child2 from '../../Components/Child2'

const Parent = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <h1>Bad</h1>
      <button onClick={() => setIsOpen(true)}>업데이트</button>
      {isOpen && <Child1 />}
      <Child2 />
    </>
  )
}
export default Parent

/**
 * 부모 컴포넌트의 isOpen 상태를 업데이트하면서
 * 해당 상태와 관련없는 <Child2>까지도 불필요하게 렌더링되고 있다.
 */
