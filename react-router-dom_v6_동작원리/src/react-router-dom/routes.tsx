import { createContext, useState } from 'react'
import { RouteProp } from './type'

export const RoutesContext = createContext<{
  routes: Map<string, RouteProp>
  addRoute: (path: string, element: JSX.Element) => void
  currentPath: string
}>({
  routes: new Map(),
  addRoute: () => {},
  currentPath: '',
})

function ContextRoutes({ children }: { children: JSX.Element }) {
  const currentPath = window.location.pathname
  const [routes, setRoutes] = useState<Map<string, RouteProp>>(new Map())

  // url과 component를 매핑
  const addRoute = (path: string, element: JSX.Element) => {
    setRoutes(prevRoutes => {
      const newRoutes = new Map(prevRoutes)
      newRoutes.set(path, { path, element })
      return newRoutes
    })
  }

  const contextValue = { routes, addRoute, currentPath }

  return (
    <RoutesContext.Provider value={contextValue}>
      {children}
    </RoutesContext.Provider>
  )
}
export default ContextRoutes
