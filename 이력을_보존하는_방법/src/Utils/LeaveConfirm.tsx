import { FC, ReactNode, useEffect } from 'react'
import { MESSAGE } from '../Constants/message'

type Props = {
  message: string
  children: ReactNode
}

const LeaveConfirm: FC<Props> = ({ children }) => {
  const { leave } = MESSAGE

  useEffect(() => {
    window.history.pushState(null, '', window.location.href)

    const handleRefresh = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = '' // 새로고침 시 confirm
    }

    const handleGoBack = (e: PopStateEvent) => {
      if (window.confirm(leave)) {
        return window.history.back() // 이전 페이지로 이동
      }
    }

    window.addEventListener('beforeunload', handleRefresh)
    window.addEventListener('popstate', handleGoBack)

    return () => {
      window.removeEventListener('beforeunload', handleRefresh)
      window.removeEventListener('popstate', handleGoBack)
    }
  }, [])

  return <>{children}</>
}
export default LeaveConfirm
