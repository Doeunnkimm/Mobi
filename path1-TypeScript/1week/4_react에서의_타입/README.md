# react에서 타입스크립트 지원을 위해 자체적으로 정의한 타입

```
✨ 생성된 프로젝트에서 react에서 타입스크립트를 지원하기 위한 타입들에 대하여 설명하고 실제로 적용해보기
```

## 1. React.FC

```
- React 18버전 이전까지 FC 사용을 지양했던 이유와 이제 다시 사용할 수 있는 이유는 무엇일까?
- 만약 FC를 사용할 수 없는 환경이라면 이유는 무엇이고 어떻게 대처가 가능한가
```

### FC ?

`Function Component` 타입의 줄임말로, React + Typescript 조합으로 개발할 때 사용하는 타입입니다. 함수형 컴포넌트 사용 시 타입 선언에 쓸 수 있도록 React에서 제공하는 타입입니다.

### FC가 태어난 배경

`React.FC`는 함수 컴포넌트의 Props 타입을 간결하게 표현하기 위해 만들어졌습니다. 이를 통해 타입스크립트를 사용하는 프로젝트에서 함수 컴포넌트의 Props를 명시적으로 지정할 수 있었습니다.

뿐만 아니라 Props에 기본적으로 `children`이 포함되어 있어, 컴포넌트에서 자식 요소를 손쉽게 다룰 수 있기를 의도했다고 합니다.

### React.FC의 사용

개인적으로 TS+React 프로젝트에서 컴포넌트를 작성할 때 아래와 같은 형태를 많이 사용했습니다.

```tsx
import { FC } from 'react'

interface Props {
    name: string
}

const Foo: FC<Props> = ({ name }) => {
    return (
        ...
    )
}
```

참고한 블로그에서도 그렇고 저도 그렇고, 별 다른 이유는 없이 `FC`에 제네릭을 통해 Props를 전달할 수 있어 오히려 간결하고 편하다는 느낌으로 계속 사용해왔던 것 같습니다. `Props`를 넘겨받는 방법이 위와 같은 방법 하나가 아님을 알고 있긴 해 개인 취향 차이로만 생각했었습니다.

### Props를 넘겨 받는 또 다른 방법들

**FC를 사용하지 않는 방법**

```tsx
interface Props {
    name: string
}

const Foo = ({ name }: Props) => {
    return (
        ...
    )
}
```

### FC를 쓰지 말야야 하는 이유

#### children을 암시적으로 가지고 있습니다

`FC`를 이용하면 컴포넌트 props는 type이 `ReactNode`인 `children`을 암시적으로 가지게 됩니다.

```tsx
const App: React.FC = () => {
  return <div>hi</div>
}

const Example = () => {
  return (
    <App>
      <div>Unwanted children</div>
    </App>
  )
}
```

위 코드를 보게 되면 `<App />` 컴포넌트에서 `children`을 다루고 있지 않음에도 `Example`에서 `children`을 넘겨주고 있으며, 어떤 런타임 에러도 발생하지 않습니다.

```
🤔 이게 왜 문제가 되나요?
```

```
👩🏻‍💻 Props의 명확성
`React.FC`가 `children`을 암시적으로 포함하면서 `Props`의 타입이 명확하지 않아 의도하지 않게 동작하는 등의 문제가 있었습니다.
```

### 👏 18 버전에서는 없어졌습니다

React 18 업데이트로, `FC`의 암시적인 `children`이 **삭제**되었습니다. 해당 변경 사항은 이 [PR](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/56210)에서 확인할 수 있습니다.

### FC를 사용할 수 없는 환경?

```
export default function App() {} 와 같은 일반 함수 선언문에서 ❌
```

위와 같은 형태에서는 `FC`를 사용하지 않고 명확하게 지정해주는 방법으로도 가능합니다.

```tsx
interface Props {
    name: string
}

export default function Foo({ name }: Props) {
    return (
        ...
    )
}
```

### 🔥 그래서 FC랑 명확하게 지정하는 방법, 둘 중에 뭘 써야 하는가?

```
가장 문제였던 FC의 암묵적인 children이 18 버전에서 사라졌기 때문에
어떤 것을 사용해야 할 지의 판단은 개발자의 몫이 될 것 같습니다.

다만, FC에는 제네릭 타입이 포함되어 있기 때문에
타입이 길고 장황해질 수 있다는 의견도 있었습니다.

FC에 이미 제네릭이 있기 떄문에 Props에도 제네릭이 필요할 경우
FC<Props<string>>과 같이 작성해줘야 해 복잡해질 수 있다고 보았습니다.
```

그래서 결론적으로 저의 생각은 아래와 같습니다.

```
기본적으로 프로젝트의 컨벤션에 맞게 작성하면 될 것 같습니다.
저 혼자 프로젝트를 진행한다면 FC를 사용할 것 같습니다.

제가 FC를 사용하는 이유는 FC 이후 부분(매개변수 부분)이, 기본 React에서의 코드 스타일과 비슷하기 때문입니다.

✔️ FC를 사용하는 경우
const Foo: FC<Props> = ({ name, age }) => {}

✔️ 명시적으로 나타내는 경우
const Foo = ({ name, age }: Props) => {}
```

### 🥹 해결하지 못한 부분

[react의 타입과 관련된 github](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/v17/index.d.ts#L539)

```
`FC`가 가지는 구체적인 차이점을 알고 싶어 관련 파일을 찾아보는 중입니다. 혹시 몰라 기록해둡니다 :)
```

## 2. ReactNode

`ReactNode`는 `children` 속성의 타입으로 가장 많이 사용하는 타입이기도 합니다.

```tsx
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const Component: FC<Props> = ({ children }) => {
  return <div>{children}</div>
}
```

[@types/react에서 살펴본 ReactNode](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts#L179)은 다음과 같았습니다.

```ts
type ReactNode =
  | ReactElement
  | string
  | number
  | Iterable<ReactNode>
  | ReactPortal
  | boolean
  | null
  | undefined
```

`ReactNode` 타입은 `jsx` 내에서 사용할 수 있는 모든 요소의 타입을 의미합니다. 즉 `string`, `null`, `undefined` 등을 포함하는 **가장 넓은 범위**를 갖는 타입이죠!

```tsx
const node: React.ReactNode = <div />
const node2: React.ReactNode = 'hello world'
const node3: React.ReactNode = 123
const node4: React.ReactNode = undefined
const node5: React.ReactNode = null
```

```
⭐️ ReactNode는 가장 넓은 범위를 갖는 타입이며,
   원시타입 및 jsx 내에서 사용할 수 있는 모든 요소의 타입을 허용한다
```

## 3. ReactElement

`ReactElement`는 `ReactNode`에 포함되어 있기도 합니다. 우선 `d.ts`에서 살펴봅시다.

```ts
interface ReactElement<
  P = any,
  T extends string | JSXElementConstructor<any> =
    | string
    | JSXElementConstructor<any>
> {
  type: T
  props: P
  key: Key | null
}
```

`ReactElement` 는 `createElement` 함수를 통해 생성된 객체의 타입입니다. 즉, 위에서 알아보았던 `ReactNode`과 달리 **원시타입을 포함하지 않고 완성된 `jsx` 요소만을 허용**합니다.

```
⭐️ ReactElement는 원시타입을 포함하지 않고 완성된 `jsx` 요소만을 허용한다.
```

따라서 **`jsx` 요소를 리턴하는 `children`에 대해서는** `ReactElement`을 타입으로 지정해 주어도 전혀 문제가 없습니다.

```tsx
import { ReactElement } from 'react'

interface Props {
  children: ReactElement
}

const Component: FC<Props> = ({ children }) => {
  return <div>{children}</div>
}
```

## 4. PropsWithChildren

`PropsWithChildren` 타입을 사용하게 되면 반복적으로 children 타입을 설정해줘야하는 번거로움이 사라질 수 있습니다.

```tsx
import { PropsWithChildren } from 'react'

interface Props {
  name: string
}

export const Foo: FC<PropsWithChildren<Props>> = ({ name, children }) => {
  return (
    <>
      <div>{name}</div>
      <div>{children}</div>
    </>
  )
}
```

이전에는 Props에 `children: ReactNode` 혹은 `children: ReactElement` 하고 적어주었었습니다.

반면, 위 코드에서는 Props에서 `children`을 명시하지 않고 바로 children을 사용해 주었습니다.

**`d.ts`에서 살펴봅시다.**

```ts
type PropsWithChildren<P = unknown> = P & { children?: ReactNode | undefined }
```

`PropsWithChildren`의 `children` 타입이 **옵셔널**인 것을 확인할 수 있습니다.

```
🤔 FC에서 children이 암시적으로 존재해서 문제가 있었다면서요.
```

```
👩🏻‍💻 맞아요.
   그래서 PropsWithChildren도 children을 넘겨주지 않아도
   에러가 발생하지 않기 때문에 의도하지 않은 동작을 할 수 있어요.

   따라서, children을 반드시 받아야 하는 경우에는
   PropsWithChildren을 사용하지 않는 게 좋아요.
```

```
🤔 그럼 그냥 ReactNode나 ReactElement를 사용하면 되나요?
```

```
👩🏻‍💻 네, 그래도 돼요.
   일반적인 경우에는 ReactNode를 사용하는 것 같아요.
   Props에 { children: ReactNode }로 명시해주면
   사용하는 쪽에서 "children이 없으면 필수라고 에러"로 알려줘요.
```

## 5. PropsWithRef

`PropsWithRef`도 `PropsWithChildren`과 비슷하게 `ref`를 명시해주지 않아도 사용할 수 있습니다.

저는 평소에 `ref`가 필요하면 `PropsWithRef`가 없이 `forwardRef`만을 사용하곤 했는데요!

~~PropsWithRef가 있는 줄도 몰랐긴 했습니다ㅎㅎ..~~

`forwardRef` 단독으로 사용하는 것과는 어떤 차이점이 있는지 알아봅시다.

`forwardRef`는 HTML 엘리먼트에 접근하게 해주는 **함수**입니다. 그래서 사용할 때는 아래와 같이 사용합니다.

```tsx
import { HTMLInputElement, forwardRef } from 'react'

interface Props {
  label?: string
}

const Input = forwardRef<HTMLInputElement, Props>(({ label }, ref) => {
  return (
    <>
      <label>{label}</label>
      <input ref={ref} />
    </>
  )
})
```

```
🤔 ref는 특별하게 forwardRef를 통해 전달해야만 하는 이유가 뭔가요?
```

```
👩🏻‍💻 React 컴포넌트는 기본적으로 ref라는 props를 가지고 있기 때문이에요.

   그래서 함수형 컴포넌트에서 ref를 넘겨줄 때는 forwardRef라는 문법을 사용하라고 하는데요.
   React 컴포넌트는 기본적으로 ref라는 props를 가지고 있어
   그것과 겹치게 되므로 다른 방식을 사용하라고 에러를 띄워줍니다.

   → forwardRef는 ref를 전달할 수 있도록 해주는 함수
```

<p align="center"><img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*8YwQ1v6QrEC2GrmwD_nTmw.png" /></p>

<details>
<summary>사용 방법 시행착오.. 🥹</summary>
<div markdown="1">

우선 저도 제가 `이렇게 사용하면 되지 않을까?` 방식으로 접근해 보기로 했습니다.

```
🤔 `PropsWithRef`는 `forwardRef`없이도 사용 가능한 편의를 제공했을까?
```

우선 아래와 같이 시도해 보았습니다.

```tsx
type ButtonProps = {
  label: string
  onClick: () => void
}

// PropsWithRef를 사용하여 ref 속성이 추가될 것
type ButtonPropsWithRef = PropsWithRef<ButtonProps>

// forwardRef를 사용하여 ref를 전달하는 함수형 컴포넌트 정의
const Button: FC<ButtonPropsWithRef> = (props) => {
  console.log(props)

  return (
   ...
  )
}
```

우선 저는 `props`를 확인해보았습니다.

<p align="center"><img width="483" alt="image" src="https://github.com/Doeunnkimm/Frontend/assets/112946860/a814b3c0-e5ef-4def-85a8-b403bf7ffd96"></p>

예상대로는 props에 ref가 포함되었지만 `undefined`였습니다. 그 이유는 아래 Warning에서 확인할 수 있는 것처럼 `forwardRef`가 없어 ref가 전달되지 않았던 겁니다.

위 실행을 통해 얻은 사실은 다음과 같습니다.

```
⭐️ PropsWithRef는 forwardRef가 필요하다
```

이제 아래와 같이 코드를 수정해 주었습니다.

```tsx
type ButtonPropsWithRef = PropsWithRef<ButtonProps>

const Button = forwardRef<HTMLButtonElement, ButtonPropsWithRef>((props) => {
  console.log(props)

  return (
    ...
  )
})
```

결과는 아래와 같았습니다.

<p align="center"><img width="599" alt="image" src="https://github.com/Doeunnkimm/Frontend/assets/112946860/3bb395de-e714-421a-8309-dee5b0b0641a"></p>

`ref`는 여전히 `undefined`였으며 오히려 `ref` 파라미터를 까먹지 않았냐며 물어봅니다. 일단 시키는 대로 파라미터에 `ref`를 추가해줘도 결과는 아래와 같았습니다.

<p align="center"><img width="697" alt="image" src="https://github.com/Doeunnkimm/Frontend/assets/112946860/4c7f6eb0-18cb-4078-945c-7a0e676c2aa0"></p>

```
🥹 결국 이렇게 쓰는 게 아니구나하고 깨달았습니다..~!
```

깃허브에서 무작정 `PropsWithRef`를 검색해 여러 파일을 살펴보아도 `PropsWithRef`의 사용하고 안 하고의 차이를 찾지 못했습니다 🥹

</div>
</details>

## 6. RefObject

React에서 특정 DOM을 선택해야할 땐 이 기능을 대체할 수 있는 useRef 훅을 제공합니다.

`useRef`를 사용하다보면 인자로 어떨 때 null을 넣어야할지? 비어둘지? 고민을 하게 되었었는데요. 이와 관련이 되어 있습니다!

```
⭐️ useRef에는 3가지 오버로딩이 존재

1. 인자: [초기값]         => 리턴: MutableRefObject<T>;

2. 인자: [초기값 | null]  => 리턴: RefObject<T>;

3. 인자: []             => 리턴: MutableRefObject<T | undefined>;
```

위를 보게 되면 총 2개의 타입이 존재합니다. `MutableRefObject`과 `RefObject`입니다.

```
✔️ useRef는 .current 프로퍼티에 변경 가능한 값을 담고 있는 “상자” 📦
  인수를 .current에 저장하게 된다.

  아래 두 개의 리턴타입은 .current 프로퍼티를 직접 수정 가능 여부에 따라 구분

✔️ MutableRefObject<T>
  직접 수정 가능 ⭕️

✔️ MutableRefObject<T | undefined>
  직접 수정 불가능 ❌, 다만 undefined이 아님이 체크되면 가능 ⭕️

✔️ RefObject<T>
  직접 수정 불가능 ❌
```

즉, 특정 초기값 혹은 비어두게 되면 current를 직접 수정 가능하며, null을 부여할 경우 current를 직접 수정 불가능하게 됩니다. 쉽게 말해 null로 부여할 경우 아래와 같은 경우에 에러가 발생하는 것이죠.

```tsx
const ref = React.useRef<number>(null)

ref.current += 1
//~~~~~~~~~~~~~~ 읽기 전용 속성이므로 'current'에 할당할 수 없습니다.
```

```
🤔 그래서 결론적으로 어떤 상황에 어떤 걸 사용해야 하나요?
```

```
👩🏻‍💻 DOM 요소를 참조하고 싶은 경우에는 null을 입력해주면 돼요.
   DOM 요소에 ref를 연결하고 싶다면 readonly인 RefObject만을 할당할 수 있어요.

   만약 DOM 요소에 MutableRefObject한 ref를 할당해주려면 아래와 같이 에러가 발생해요.
```

<p align="center"><img width="584" alt="image" src="https://github.com/Doeunnkimm/Frontend/assets/112946860/63e4dcba-4841-4035-927b-5a931b5eac02"></p>

## 7. SetStateAction

Props로 상태를 업데이트하는 함수, 예를 들어 `setData`를 넘겨야 할 때도 있습니다. 이때 타입을 어떻게 주어야 할까요?

저는 평소에 아래와 같이 해주었었습니다.

```tsx
interface Props {
  setData: (data: string) => void
}
```

사실 위와 같이 타입을 선언해 주어도 문제를 없지만 **일반 함수와 구별이 되지 않으며 state함수임을 이름을 통해서만 유추**해야 합니다.

```
⭐️ React에서는 state함수를 명시적으로 나타낼 수 있는 적절한 타입을 제공하고 있다

→ SetStateAction !!
```

이떄 사용할 수 있는 타입이 바로 `SetStateAction`입니다. `SetStateAction`은 React의 `useState` 또는 `useReducer` 훅에서 상태 값을 업데이트하기 위해 사용되는 타입입니다. 이 타입은 새로운 상태 값을 계산하는 함수를 나타내며, 이 함수는 현재 상태 값을 인자로 받아 새로운 상태 값을 반환합니다.

사용 방법은 아래와 같습니다.

```tsx
interface Props {
  setData: Dispatch<SetStateAction<string>>
}
```

`d.ts`에서 `SetStateAction`는 다음과 같습니다.

```ts
type SetStateAction<S> = S | ((prevState: S) => S)
```

제네릭에 타입을 넘겨주면 state함수의 형태에 알맞게 타입을 지정해줍니다. 그런데 여기서 드는 생각이 있습니다.

```
🤔 그럼 SetStateAction만 써도 될 거 같은데, 겉에 왜 Dispatch가 필요한가요?
```

```
👩🏻‍💻 그럼 한번 없애보고 뭐가 문제가 되는지 알아볼까요?

   interface Props {
     setData: SetStateAction<string>
   }

   이렇게 한번 해봅시다. 그럼 아래와 같이 에러가 발생해요.
```

<p align="center"><img width="499" alt="image" src="https://github.com/Doeunnkimm/Mobi/assets/112946860/408a4d9f-d024-4c11-abe4-3d505cf8a441">
</p>

```
🤔 호출 시그니처부터 모르겠는데요..
```

```
👩🏻‍💻 호출 시그니처는 타입스크립트에서 함수의 타입을 지정할 때 사용하는 문법이에요.
   함수에 함수를 인수로 전달하거나,
   함수를 반환하는 경우 이 문법을 통해 인수나 반환 함수의 타입을 지정할 수 있어요.

   SetStateAction을 다시 살펴보면 (prev: S) => S 라고 되어있어요.
   사실 이는 우리가 setState(여기에) 넣는 것이고
   정확하게는 아무것도 리턴하지 않아요. 아래 제가 테스트해 본 결과를 같이 봅시다.
```

```tsx
const handleInputValue = () => {
  const test = setData('hello')
  console.log(`test: ${test}`) // test: undefined
}
```

<p align="center"><img width="467" alt="image" src="https://github.com/Doeunnkimm/Mobi/assets/112946860/a3a7d5a1-271c-49de-884d-19a9dbd7267c"></p>

```
👩🏻‍💻 위처럼 undefined 즉, 아무 것도 리턴하지 않고 있는 것도 확인해보았고,
   setData에 마우스를 가져가서 확인해도 리턴타입이 void예요.

   결론적으로, SetStateAction는 본인을 인자로 하여 void를 리턴하도록 해줄 수 있는
   호출 시그니처라는 자기를 감싸주는 그런 것이 필요했던 거죠.
```

## 8. Dispatch

위에서 Dispatch의 필요성에 대해 조금 알아보았습니다.

```
⭐️ Dispatch는 React에서 상태를 업데이트하는 함수의 호출 시그니처
```

`d.ts`에서 직접 확인해봅시다.

```ts
type Dispatch<A> = (value: A) => void
```

위에서 알아보았던 대로, 리턴타입을 void로 해주는 호출 시그니처의 모습이 맞았습니다.

## 9. type alias와 interface의 차이점

```
- 각각 type alias와 interface로 props 타입을 정의하고 주석을 통해 차이점을 작성
- 비교를 통해 무엇을 사용하는게 좋을지 자기 의견을 자유롭게 써볼 것
```

타입스크립트에서 `named Type`을 정의하는 방법은 두 가지가 있습니다.

```ts
// type alias
type TState = {
  name: string
  age: number
}

// interface
interface IState {
  name: string
  age: number
}
```

```
🤔 언제 type alias / interface를 사용해야 하나요?
```

```
👩🏻‍💻 대부분의 경우에는 type alias를 사용해도 되고 interface를 사용해도 돼요.
   그러나, 둘 사이에 존재하는 차이를 분명히 알고
   같은 상황에서는 동일한 방법으로 사용해 일관성을 유지해야 해요.
```

차이점에 대해 알아봅시다.

---

**1️⃣ 차이점1: 타입을 확장하는 방식**

```
✔️ type alias : &
✔️ interface  : extends
```

여기서 말하는 **타입 확장**은 기존에 정의된 타입을 기반으로 새로운 타입을 만드는 것을 의미합니다.

```ts
// type alias
type Person = {
  name: string
  age: number
}

type Developer = Person & { skill: string }
```

```ts
// interface
interface Person {
  name: string
  age: number
}

interface Developer extends Person {
  skill: string
}
```

---

**2️⃣ 차이점2: 객체만 허용하는가**

```
✔️ type alias : 리터럴 타입부터 객체까지 다룬다
✔️ interface  : 객체만 다룬다
```

`interface`의 경우 객체의 타입만을 다룹니다. 반면 `type alias`는 객체뿐만 아니라 리터럴 타입까지 해당 리터럴을 유니온 타입으로까지도 표현이 가능합니다.

```ts
// type alias
type Color = 'Red' | 'Green' | 'Blue'

// interface
interface ?? // 객체가 아닌 것은 다룰 수 X
```

---

**3️⃣ 차이점3: mapped type 사용이 가능한가**

```
✔️ type alias : 가능 ⭕️
✔️ interface  : 불가능 ❌
```

`mapped type`은 기존의 타입을 변환하여 새로운 타입을 만들기 위한 도구로, 기존의 타입을 순회합니다.

```ts
// type alias
type PersonField = 'name' | 'address' | 'phone'

type Person = {
  [key in PersonField]: string
}
```

비슷하게 `interface`를 통해 선언해보면 에러가 발생합니다.

<p align="center"><img width="453" alt="image" src="https://github.com/Doeunnkimm/Frontend/assets/112946860/a5c65cf8-9d48-438b-b426-b0ca58be619f">
</p>

---

**4️⃣ 차이점4: 선언 병합이 가능한가**

```
✔️ type alias : 불가능 ❌
✔️ interface  : 가능 ⭕️
```

타입스크립트에서 선언 병합(declaration merging)이란 **같은 이름을 가진 여러 선언들을 하나로 합치는 기능**을 말합니다.

```ts
// interface
interface Person {
  name: string
  age: string
}

interface Person {
  address: string
}
```

위와 같이 작성하면 `Person`이라는 타입은 결국 아래와 같은 형태로 병합됩니다.

<p align="center"><img width="341" alt="image" src="https://github.com/Doeunnkimm/Frontend/assets/112946860/46e39fd2-2e9b-485c-a4f4-9548f325645d"></p>

병합되어 결국에는 `name`, `age`, `address`가 프로퍼티가 된 것을 확인할 수 있었습니다.

이를 비슷하게 `type alias`에서 하게 되면 아래와 같이 **식별자가 중복되었다**면서 에러가 발생합니다.

<p align="center"><img width="364" alt="image" src="https://github.com/Doeunnkimm/Frontend/assets/112946860/1bc42b18-daaa-47fa-b826-d22e0f28f269"></p>

---

```
🤔 차이점은 알겠는데, 그래서 언제 어떤 걸 써야 하나요?
```

```
👩🏻‍💻 이 또한 프로젝트의 컨벤션에 맞게 사용해야겠지만, 저 혼자 프로젝트를 진행한다면

   특별한 경우를 제외하곤 interface를 사용할 것 같습니다.
   항상 확장 가능성을 염두해 둔다면, interface 사용을 좀 더 고려할 것 같습니다.

   여기서 특별한 경우라면 튜플, 리터럴, 유니온 등과 같은 type alias에서만 사용 가능한 경우입니다.
```

# 참고문서

- [리액트에서 FC를 사용하지 말아야 하는 이유](https://emewjin.github.io/why-not-fc/)
- [타입스크립트 : React.FC는 그만! children 타이핑 올바르게 하기](https://itchallenger.tistory.com/641)
- [ReactNode, ReactChild, ReactElement 타입 비교](https://merrily-code.tistory.com/209)
- [React.ReactNode vs JSX.Element vs React.ReactElement](https://www.totaltypescript.com/jsx-element-vs-react-reactnode)
- [PropsWithChildren는 안전한 타입일까?!](https://velog.io/@kkojae91/PropsWithChildren%EB%8A%94-%EC%95%88%EC%A0%84%ED%95%9C-%ED%83%80%EC%9E%85%EC%9D%BC%EA%B9%8C)
- [타입스크립트 type과 interface의 공통점과 차이점](https://yceffort.kr/2021/03/typescript-interface-vs-type)
- [useRef의 3가지 정의와 타입 알아보기 (feat. MutableRefObject, RefObject)](https://ch3coo2ca.github.io/2022-06-20/useref-types-in-typescript)
