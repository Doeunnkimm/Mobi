import { FC, useState, useEffect } from 'react'

type Props = {
  count: number
}

const Child1: FC<Props> = ({ count }) => {
  const [isEven, setIsEven] = useState(false)

  useEffect(() => {
    setIsEven(count % 2 === 0)
  }, [count])

  return (
    <>
      <div>
        {isEven ? (
          <img src="/images/even.png" width="50%" />
        ) : (
          <img src="/images/prime.png" width="50%" />
        )}
      </div>
    </>
  )
}
export default Child1
