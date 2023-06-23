import React, { FC, useContext, useEffect } from 'react'
import { RoutesContext } from './routesContext'
import { BrowserRouterProp, LinkProp, RouteProp, RoutesProp } from './type'

/**
 * 정의된 URL 경로에 해당하는 React 컴포넌트를 렌더링
 */
export const BrowserRouter: FC<BrowserRouterProp> = ({
  children,
}): JSX.Element => {
  const { setCurrentPath } = useContext(RoutesContext)

  useEffect(() => {
    const handleRoute = () => {
      setCurrentPath(window.location.pathname)
    }

    // 페이지 이동을 listen
    window.addEventListener('popstate', handleRoute)

    return () => {
      window.removeEventListener('popstate', handleRoute)
    }
  }, [window.location.pathname])

  return <>{children}</>
}

/**
 * 자식 엘리먼트의 path props를 하나씩 비교해서 첫 번째 매칭되는 <Route> 자식 엘리먼트를 렌더링
 */
export const Routes: FC<RoutesProp> = ({
  children,
}): React.ReactElement | null => {
  const { routes, currentPath, addRoute } = useContext(RoutesContext)

  for (let i = 0; i < React.Children.count(children); i++) {
    const child = React.Children.toArray(children)[i] as React.ReactElement

    const { path, element } = child.props

    if (!routes.get(path)) {
      addRoute(path, element)
    }

    if (currentPath === path) {
      return <>{element}</>
    }
  }
  return null
}

export const Route: FC<RouteProp> = ({ path, element }) => {
  const { currentPath } = useContext(RoutesContext)

  if (currentPath !== path || !element) return null
  return <>{element}</>
}

export const Link: FC<LinkProp> = ({ to, children }) => {
  const { setCurrentPath } = useContext(RoutesContext)

  const onClickLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.history.pushState(null, '', to)
    setCurrentPath(to)
  }

  return (
    <a href={to} onClick={onClickLink}>
      {children}
    </a>
  )
}
