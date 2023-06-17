import { FC, ReactNode, useEffect } from 'react'
import { MESSAGE } from '../Constants/message'

type Props = {
  method: 'modal' | 'storage'
  children: ReactNode
}

const LeaveConfirm: FC<Props> = ({ method, children }) => {
  const { leave } = MESSAGE

  useEffect(() => {
    window.history.pushState(null, '', window.location.href)

    const handleRefresh = (e: BeforeUnloadEvent) => {
      if (method === 'modal') {
        e.preventDefault()
        e.returnValue = '' // 새로고침 시 confirm
      }

      if (method === 'storage') {
      }
    }

    const handleGoBack = (e: PopStateEvent) => {
      window.history.pushState(null, '', window.location.href)

      if (method === 'modal') {
        const confirm = window.confirm(leave)
        if (confirm) {
          return window.history.back() // 이전 페이지로 이동
        }
      }

      if (method === 'storage') {
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
