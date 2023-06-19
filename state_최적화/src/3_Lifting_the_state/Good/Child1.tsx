import { FC, useState } from 'react'

type Props = {
  count: number
  incrementCount: () => void
}

const Child1: FC<Props> = ({ count, incrementCount }) => {
  const isEven = count % 2 === 0

  return (
    <>
      <div>
        {isEven ? (
          <img src="/images/even.png" width="50%" />
        ) : (
          <img src="/images/prime.png" width="50%" />
        )}
      </div>
      <button onClick={incrementCount}>Click!</button>
    </>
  )
}
export default Child1
