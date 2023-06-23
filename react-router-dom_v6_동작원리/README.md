## react-router-dom v6 동작원리

### 1. 기능 구현 사항

- **react-router-dom 라이브러리 없이** 아래 컴포넌트를 구현했습니다.
  - `<BrowserRouter>`
  - `<Routes>`
  - `<Route>`
  - `<Link>`

### 2. 목적

- 라우팅에 대한 개념과 원리를 자세히 파악
- 추후 생산성과 관련되어 커스터마이징이 필요할 때 핵심 기능에 집중하여 내부 동작을 조작할 수 있는 개발 능력 향상을 위해


### 3. 구현 과정

`<BrowserRouter>`

- URL과 UI를 동기화해주는 역할
- History API를 사용
- 페이지를 새로고침 없이 URL과 매핑된 컴포넌트를 렌더링해주는 역할

`<Routes>`

- Route로 생성된 자식 컴포넌트 중 매칭되는 첫 번째 Route를 렌더링

`<Route>`

- 컴포넌트에 `path`와 `element` 속성을 이용하여 원하는 url을 지정
- 그 url에 들어가면 해당 컴포넌트만 렌더링
- 경로에 따라 다른 컴포넌트를 렌더링

`<Link>`

- 지정한 url로 이동이 되게끔
- 새로고침 없이 url 변경
