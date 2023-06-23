import React, { FC, useContext, useEffect } from 'react'
import { createBrowserHistory } from 'history'
import { RoutesContext } from './routesContext'
import { BrowserRouterProp, LinkProp, RouteProp, RoutesProp } from './type'

/**
 * 정의된 URL 경로에 해당하는 React 컴포넌트를 렌더링
 */
export const BrowserRouter: FC<BrowserRouterProp> = ({
  children,
}): JSX.Element => {
  const { setCurrentPath } = useContext(RoutesContext)
  const history = createBrowserHistory()

  useEffect(() => {
    const handleRoute = () => {
      setCurrentPath(history.location.pathname) // 이슈 때문에 이것으로 변경
    }

    // Listen to popstate event (when history is manipulated)
    window.addEventListener('popstate', handleRoute)

    // Clean up the listener
    return () => {
      window.removeEventListener('popstate', handleRoute)
    }
  }, [history.location.pathname])

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
  const { currentPath, setCurrentPath } = useContext(RoutesContext)

  const onClickLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const history = createBrowserHistory()
    // e.preventDefault()
    history.push(to)
    setCurrentPath(to)
  }

  return (
    <a href={to} onClick={onClickLink}>
      {children}
    </a>
  )
}
