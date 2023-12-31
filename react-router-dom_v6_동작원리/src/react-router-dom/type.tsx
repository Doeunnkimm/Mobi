export type BrowserRouterProp = {
  children: JSX.Element
}

export type RoutesProp = {
  children: React.ReactNode
}

export type RouteProp = {
  path: string
  element: JSX.Element
}

export type LinkProp = {
  to: string
  children: string
}
