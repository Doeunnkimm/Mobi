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
  const [routes, setRoutes] = useState<Map<string, RouteProp>>(new Map())
  const [currentPath, setCurrentPath] = useState(
    window.location.pathname || '/'
  )
  useEffect(() => {
    console.log('currentPath 바뀜')
    console.log({ currentPath })
  }, [currentPath])

  // url과 component를 매핑
  const addRoute = (path: string, element: JSX.Element) => {
    setRoutes(prevRoutes => {
      const newRoutes = new Map(prevRoutes)
      newRoutes.set(path || '/', { path: path || '/', element })
      return newRoutes
    })
  }

  const contextValue = { routes, addRoute, currentPath, setCurrentPath }

  return (
    <RoutesContext.Provider value={contextValue}>
      {children}
    </RoutesContext.Provider>
  )
}
export default ContextRoutes
