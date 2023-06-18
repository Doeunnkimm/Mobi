import Child2 from '../../Components/Child2'
import ButtonWithChild from './ButtonWithChild'

const Parent = () => {
  return (
    <>
      <h1>Good</h1>
      <ButtonWithChild />
      <Child2 />
    </>
  )
}
export default Parent

/**
 * Parent에서는 careless 할 수 있도록
 * 특정 자식 컴포넌트와 관련있는 state는 해당 자식 컴포넌트에서 관리할 수 있도록
 *
 * -> 결과적으로 관련이 없던 자식 컴포넌트에서는 불필요한 렌더링 X
 */
