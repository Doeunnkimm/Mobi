## 1주차

1. 타입스크립트는 무엇인가?
```
타입스크립트는 무엇인지 정의하세요, 단 정의 시 타입스크립트를 통해 얻을 수 있는 이점에 대하여 명확히 정의할 것
```
2. 타입스크립트 타입을 정의하고 예제 파일을 업로드할 것
```
타입스크립트의 기본타입과 고급타입(유틸타입)을 구분하고 이에 대한 예시를 작성하세요

- number
- string
- boolean
- any
- object
- array
- unknown
- union
- conditional
- type alias
- interface
- enum
- as const
- partial
- omit
- pick
- returntype
- optional
- satisfies
- generic
```
3. typescript react project를 생성하여 init하여 업로드할 것
```
CRA or Vite를 사용하여 타입스크립트 기본 프로젝트를 생성하하여 init하세요

- npx create-react-app [프로젝트 명] --template typescript
- npm create vite@latest [프로젝트 명] --template react-ts
```
4. react에서 타입스크립트 지원을 위해 자체적으로 정의한 타입에는 무엇이 있을까?
```
생성된 프로젝트에서 react에서 타입스크립트를 지원하기 위해 지원하고 있는 타입들에 대하여 설명하고 실제로 적용해보세요

1. React.FC
- React 18버전 이전까지 FC 사용을 지양했던 이유와 이제 다시 사용할 수 있는 이유는 무엇일까?
- 만약 FC를 사용할 수 없는 환경이라면 이유는 무엇이고 어떻게 대처가 가능한가

2. ReactNode
3. ReactElement
4. PropsWithChildren
5. PropsWithRef
6. RefObject
7. SetStateAction
8. Dispatch

9. type alias와 interface의 차이를 이해하여 props 타입을 정의해보자
- 각각 type alias와 interface로 props 타입을 정의하고 주석을 통해 차이점을 작성
- 비교를 통해 무엇을 사용하는게 좋을지 자기 의견을 자유롭게 써볼 것
```
