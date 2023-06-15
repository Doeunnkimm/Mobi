import ReactDOM from 'react-dom'

interface Routes {
  fragment: string
  component: () => JSX.Element
}

const createRouter = () => {
  // 애플리케이션의 경로 목록들을 담을 배열
  // 클로저를 이용하여 데이터를 추가
  const routes: Map<string, Routes> = new Map()

  const router = {
    // 라우터 기능1. 애플리케이션의 경로 목록들을 저장한다.
    addRoute(fragment: string, component: () => JSX.Element) {
      routes.set(fragment, { fragment, component })
      return this // 메서드 체이닝을 사용하기 위해 this 리턴
    },

    // 라우터 기능2. 현재 URL이 변경되면 페이지 콘텐츠를 해당 URL에 매핑된 구성 요소로 교체
    start() {
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

    navigate(fragment: string) {
      window.location.hash = fragment
    },
  }
  return router
}
export default createRouter
