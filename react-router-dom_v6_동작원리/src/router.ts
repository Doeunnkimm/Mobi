import ReactDOM from 'react-dom'

interface Route {
  fragment: string
  component: () => JSX.Element
  fragmentRegExp?: string
}

const createRouter = () => {
  // 애플리케이션의 경로 목록들을 담을 배열
  // 클로저를 이용하여 데이터를 추가
  const routes: Map<string, Route> = new Map()

  const ROUTE_PARAMETER_REGEXP: RegExp = /:(\w+)/g // path parameters를 매칭하기 위한 정규표현식
  const URL_REGEXP: string = '([^\\/]+)'

  const router = {
    // 라우터 기능1. 애플리케이션의 경로 목록들을 저장한다.
    addRoute(fragment: string, component: () => JSX.Element) {
      const params: string[] = []

      // path parameter 이름을 추출하여 배열에 push ["name", "age"]
      const parsedFragment = fragment
        .replace(ROUTE_PARAMETER_REGEXP, (_, paramName) => {
          params.push(paramName)
          return URL_REGEXP // '/' 의 텍스트로써 사용되는 모든 "/" 앞에 이스케이프 문자("\")을 추가
        })
        .replace(/\//g, '\\/')

      routes.set(parsedFragment, { parsedFragment, component, params })
      return this // 메서드 체이닝을 사용하기 위해 this 리턴
    },

    // 라우터 기능2. 현재 URL이 변경되면 페이지 콘텐츠를 해당 URL에 매핑된 구성 요소로 교체
    start() {
      const getUrlParmas = (
        route: Route,
        hash: string
      ): Record<string, string> => {
        const params: Record<string, string> = {}
        const matches = hash.match(route.fragmentRegExp) //
      }

      // routes 배열에서 현재 브라우저 hash 값과 동일한 해시값을 가진 구성 요소를 찾는다.
      const checkRoutes = () => {
        const currentFragment = window.location.hash // 현재 브라우저 hash 값

        if (routes.has(currentFragment)) {
          // 현재 브라우저 hash 값을 map에서 찾는다
          const currentRoute = routes.get(currentFragment)
          if (currentRoute) {
            const main = document.querySelector('main')
            if (main) {
              ReactDOM.render(currentRoute.component(), main) // 렌더링
            }
          }
        }
      }

      window.addEventListener('hashchange', checkRoutes) // 브라우저에서 hash 값이 바뀔 때 발생하는 이벤트
      checkRoutes()
    },

    navigate(fragment: string, replace = false) {
      if (replace) {
        const href = window.location.href.replace(
          window.location.hash,
          '#' + fragment
        ) // window.location.hash = '#' + fragment

        // 바로 위에서 hash 값으로 변경해서 새로고침 없이 히스토리도 남기지 않으면서 페이지 이동 가능
        window.location.replace(href)
      } else {
        window.location.hash = fragment
      }
    },
  }
  return router
}
export default createRouter
