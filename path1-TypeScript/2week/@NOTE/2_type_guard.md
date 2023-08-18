# Type Guard

## 🤔 타입가드는 무엇이고 왜 필요할까?

### 타입 가드

[타입스크립트 공식 문서](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards)에서는, 타입 가드를 아래와 같이 설명하고 있습니다.

```
타입 가드는 특정 스코프 내에서 사용되는 타입을 런타임에 체크하는 일종의 표현
```

쉽게 말하자면 아래와 같습니다.

```
⭐️ 컴파일러가 타입을 잘 예측할 수 있도록 타입을 좁혀 주어서 좀 더 type safety 함을 보장하는 역할의 코드 패턴
```

### 타입을 잘 예측할 수 있도록 좁혀준다고?

가장 쉬운 예시를 들어보자면 **유니온 타입**에서인데요!

만약 아래와 같은 함수가 있다고 해봅시다.

```ts
function logText(text: string | number) {
    return text. // 여기서 text는 무슨 타입일까요?
}
```

위 코드만 보게 되면 타입스크립트 컴파일러는 logText 스코프에서 매개변수 `text`의 타입이 뭔지 알 수 있을까요?

따라서 **타입을 위한 분기처리**를 즉, 타입 가드를 해주어 컴파일러에게 **"지금은 이런 타입이다"** 하고 좁혀줄 수 있는 것이죠 !

가장 간단한 타입 가드 예시로 해보죠!

```ts
function logText(text: string | number) {
  if (typeof text === 'string') {
    text // 타입은 string
  }
}
```

이처럼 특정 스코프에서의 타입을 확실하게 좁혀주는 것이 바로 타입 가드입니다!

## 🤔 타입가드 종류의 예시

좀 전에 `typeof`라는 타입 가드의 종류 하나를 미리 살펴보았는데요. 타입 가드에는 여러 가지 종류가 존재합니다.

### 1. instanceof

```
⭐️ 주어진 생성자 함수 또는 클래스의 인스턴스인지 확인

e.g. if (text instanceof Text)
```

```ts
class Necklace {
  kind: string
  brand: string
  constructor(brand: string, kind: string) {
    this.brand = brand
    this.kind = kind
  }
}
class Bracelet {
  brand: string
  year: number
  constructor(brand: string, year: number) {
    this.brand = brand
    this.year = year
  }
}
function getRandomAccessory(accessory: Necklace | Bracelet) {
    if (accessory instanceof Bracelet) {
        console.log(accessory.) // 인스턴스가 Bracelet
    }
}
```

`if`를 통해 매개변수 `accessory`의 `instance`가 `Bracelet`임을 확인했기 떄문에 아래와 같이 `Bracelet`과 관련된 요소들만 뜨게 됩니다.

<p align="center"><img src="https://github.com/mobi-community/mobi-path-typescript/assets/112946860/a42d39d7-ed1a-4972-8b7a-8ebd1f4ced9d" width="50%"/></p>

### 2. typeof

```
⭐️ 변수의 타입을 결정
🔥 원시 타입만 가능 !!!!!!

e.g. if (typeof text === 'string')
```

주의해야할 점은 `typof`에 내가 type alias나 interface를 통해 선언한 타입을 입력하면 에러가 발생합니다.

<p align="center"><img src="https://github.com/mobi-community/mobi-path-typescript/assets/112946860/95edbf60-f0f0-42f6-b439-eb4dc534d835" width="30%"/></p>

따라서 아래와 같이 원시 타입을 가드할 때만 사용이 가능합니다.

```ts
function logText(text: string | number) {
  if (typeof text === 'string') {
    text // 타입은 string
  }
}
```

해당 스코프에서는 `text`가 `string`이라고 가드를 해주었기 떄문에 해당 스코프 안에서는 `text`에는 `string`과 관련된 메서드가 자동 완성으로 사용할 수 있게 됩니다.

<p align="center"><img src="https://github.com/mobi-community/mobi-path-typescript/assets/112946860/530c49c1-2c8a-4c9f-bf86-98eceaa7c39c" width="30%"/></p>

### 3. in

```
⭐️ 객체에 특정 프로퍼티가 있는지 확인

e.g. if ('name' in person)
```

```ts
interface A {
  x: number
}
interface B {
  y: string
}

function example(q: A | B) {
  if ('x' in q) {
    q // 타입이 A
  }
}
```

### 4. Equality narrowing 타입가드

```
⭐️ 두 변수가 같은 유형임을 확인
```

```ts
function getValues(a: number | string, b: string) {
  if (a === b) {
    a // 타입이 string
  }
}
```

위와 같이 타입이 넓은 `a`를 `b`와 비교함으로써 `b`의 타입으로 `a`의 타입을 좁히는 타입 가드를 해줄 수 있습니다.

해당 방식을 통해 **리터럴 타입**도 타입 가드를 해줄 수 있습니다.

```ts
type Colors = 'red' | 'green' | 'blue'

function getColor(color: Colors) {
  if (color === 'red') {
    color // 타입이 'red'
  }
}
```

이를 응용하여 **type alias**나 **interface** 안에 있는 리터럴 타입을 통해 타입 가드를 하는 방법까지 가능합니다.

```ts
interface Foo {
  kind: 'foo'
  foo: number
}
interface Bar {
  kind: 'bar'
  bar: number
}

function doTest(arg: Foo | Bar) {
  if (arg.kind === 'foo') {
    foo // 타입이 Foo
  }
}
```

### 5. strictNullChecks 타입가드

종종 **null/undefined일 수 있다**라는 에러 문구를 본 적이 있을 겁니다. TypeScript는 이러한 null이나 undefined를 골라낼 수 있습니다.

```ts
function foo(a?: number) {
  if (a !== undefined) {
    a // 이제부터 a는 무조건 number
  }
}
```

### 6. 사용자 정의 타입가드

위에서 `instanceof`나 `typeof`와 같은 연산자를 통해서는 type alias나 interface를 가드해줄 수 없다고 했습니다.

위에서 짧게 객체 내부에 있는 리터럴을 통해 가드하는 방법을 소개했는데, 해당 방법은 유니온으로 들어오는 타입 모두에 동일한 프로퍼티가 존재해야 가능합니다.

이럴 때는 TypeScript에서 **사용자 정의 타입 가드 함수**를 만들어 해결해야 합니다.

```
⭐️ 타입 가드 함수란
   어떤 인자명은 어떠한 타입이다(boolean)라는 값을 리턴하는 함수일 뿐 !
```

```ts
interface Foo {
  foo: number
  common: string
}
interface Bar {
  bar: number
  common: string
}
```

두 인터페이스를 매개변수로 받았을 때 가드를 하고 싶으면 우선 사용자 정의 타입 가드 함수가 필요합니다.

아래 타입 가드 함수가 하는 일은 다음과 같습니다.

```
인자 받음 → 인자에 프로퍼티가 있는지 확인 → 있으면 true / 없으면 false
```

```ts
function isFoo(arg: any): arg is Foo {
  return arg.foo !== undefined
}
```

`arg`에 foo가 없지 않으면 즉, **있으면 isFoo 함수의 리턴값은 true** 또는 **없으면 isFoo 함수의 리턴값을 false**가 됩니다.

이제 이 사용자 정의 타입 가드 함수를 사용해서 타입 가드를 하게 되면 아래와 같습니다.

```ts
function doTest(arg: Foo | Bar) {
  if (isFoo(arg)) {
    arg // 타입이 Foo
  } else {
    arg // 타입이 Bar
  }
}
```

## 🤔 타입 가드를 사용함으로써 얻을 수 있는 장점

```
⭐️ 가드된 safety한 타입 덕분에 런타임 에러를 방지할 뿐만 아니라 자동 완성까지 사용 가능!
```

# 참고 문서

- [타입 가드 - TypeScript Deep Dive](https://radlohead.gitbook.io/typescript-deep-dive/type-system/typeguard)
- [How to use type guards in TypeScript](https://blog.logrocket.com/how-to-use-type-guards-typescript/)
- [나를 위한 TypeScript Type Guard](https://velog.io/@dooyeong/%EB%82%98%EB%A5%BC-%EC%9C%84%ED%95%9C-TypeScript-Type-Guard)
