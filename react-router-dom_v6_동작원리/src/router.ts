import ReactDOM from 'react-dom'

interface Route {
  fragmentRegExp: RegExp
  component: (params?: Record<string, string>) => JSX.Element
  params: string[]
}

const createRouter = () => {
  // 애플리케이션의 경로 목록들을 담을 배열
  // 클로저를 이용하여 데이터를 추가
  const routes: Map<string, Route> = new Map()

  const ROUTE_PARAMETER_REGEXP: RegExp = /:(\w+)/g // path parameters의 키 값을 찾기 위한 정규표현식
  const URL_REGEXP: string = '([^\\/]+)' // /intro/:name/:age -> 추출 -> intro:name:age

  const router = {
    // 라우터 기능1. 애플리케이션의 경로 목록들을 저장한다.
    addRoute(fragment: string, component: () => JSX.Element) {
      const params: string[] = []

      // path parameter 이름을 추출하여 배열에 push ["name", "age"]
      // ex. fragment = '#/intro/:name/:age'
      // console.log(parsedFragment); // #\\/intro\\/([^\\/]+)\\/([^\\/]+)
      // --> fragment에서 path parameter를 추출하여 URL_REGEX로 변환
      // --> 추출한 path parameter는 params 배열에 저장
      // console.log(params); // ['name', 'age']

      const parsedFragment = fragment
        .replace(ROUTE_PARAMETER_REGEXP, (_, paramName) => {
          // 정규식으로 찾는 paramName 후처리
          params.push(paramName) // 일단 params 배열에 넣고
          return URL_REGEXP // fragment에서 paramName에 해당 하는 문자열 부분에 '/' 앞에 이스케이프 문자("\") 추가
        })
        .replace(/\//g, '\\/') // 추가적으로, 모든 '/' 앞에 이스케이프 문자 ("/") 추가

      routes.set(parsedFragment, {
        fragmentRegExp: new RegExp(`^${parsedFragment}$`), // path paramters 위치와 개수에 맞게 parse된 fragment 정규식을 가지고 path parameters 값을 찾을 예정
        component,
        params,
      })
      return this // 메서드 체이닝을 사용하기 위해 this 리턴
    },

    // 라우터 기능2. 현재 URL이 변경되면 페이지 콘텐츠를 해당 URL에 매핑된 구성 요소로 교체
    start() {
      const getUrlParams = (
        route: Route,
        hash: string
      ): Record<string, string> => {
        const params: Record<string, string> = {}
        const matches = hash.match(route.fragmentRegExp) // 추출된 path parameter와 일치한 부분을 찾아 배열로 반환

        matches?.splice(0, 1) // 배열의 첫 번째 값에는 url 전체가 담겨있어서 제거
        matches?.forEach((paramValue, index) => {
          const paramName = route.params[index] // path parameter 키값 ex. name, age
          params[paramName] = paramValue // key, value 형태로 객체에 추가
        })
        // params = {name: 'doeunn', age: 23}
        return params
      }

      // routes 배열에서 현재 브라우저 hash 값과 동일한 해시값을 가진 구성 요소를 찾는다.
      const checkRoutes = () => {
        // 현재 브라우저 hash 값을 map에서 찾는다.
        let currentRoute
        routes.forEach(route => {
          if (route.fragmentRegExp.test(window.location.hash)) {
            currentRoute = route
          }
        })

        if (currentRoute) {
          const main = document.querySelector('main')
          if (main) {
            if ((currentRoute as Route).params.length) {
              // path parameters가 있는 url의 경우
              const urlParams = getUrlParams(currentRoute, window.location.hash)
              ReactDOM.render(
                (currentRoute as Route).component(urlParams),
                main
              ) // 렌더링
            } else {
              ReactDOM.render((currentRoute as Route).component(), main) // 렌더링
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
