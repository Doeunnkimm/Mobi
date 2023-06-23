import { createContext, useState, useEffect } from 'react'
import { RouteProp } from './type'

export const RoutesContext = createContext<{
  routes: Map<string, RouteProp>
  addRoute: (path: string, element: JSX.Element) => void
  currentPath: string
  setCurrentPath: (path: string) => void
}>({
  routes: new Map(),
  addRoute: () => {},
  currentPath: window.location.pathname || '/',
  setCurrentPath: () => {},
})

function ContextRoutes({ children }: { children: JSX.Element }) {
  const routes = new Map<string, RouteProp>()
  const [currentPath, setCurrentPath] = useState(
    window.location.pathname || '/'
  )

  // url과 component를 매핑
  const addRoute = (path: string, element: JSX.Element) => {
    routes.set(path || '/', { path: path || '/', element })
  }

  const contextValue = { routes, addRoute, currentPath, setCurrentPath }

  return (
    <RoutesContext.Provider value={contextValue}>
      {children}
    </RoutesContext.Provider>
  )
}
export default ContextRoutes
