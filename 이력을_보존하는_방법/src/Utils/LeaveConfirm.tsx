import { FC, ReactNode, useEffect } from 'react'
import { MESSAGE } from '../Constants/message'

type Props = {
  children: ReactNode
}

const LeaveConfirm: FC<Props> = ({ children }) => {
  const { leave } = MESSAGE

  useEffect(() => {
    // 마운트 되면서 세션 기록 +1 -> 그래서 돌아갈 떄는 -2로 해야 url 상 이전 페이지
    window.history.pushState(null, '', window.location.pathname)

    const handleRefresh = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = '' // 새로고침 시 confirm
    }

    const handleGoBack = (e: PopStateEvent) => {
      window.history.pushState(null, '', window.location.pathname)

      const confirm = window.confirm(leave)
      if (confirm) {
        window.removeEventListener('beforeunload', handleRefresh)
        window.removeEventListener('popstate', handleGoBack)
        return window.history.go(-2) // 이전 페이지로 이동
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
