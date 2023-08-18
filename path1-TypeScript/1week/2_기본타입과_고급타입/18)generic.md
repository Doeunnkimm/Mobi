# ✨ 18. generic

제네릭은 여러 인수를 받을 수 있다는 점에서 `any`와 비슷한 느낌을 들기도 합니다. 이번 정리에서는 매번 무서워보이기(?)만 했던 제네릭에 대해 자세히 이것저것 알아보려고 합니다.

## 🔎 제네릭에서 T

제네릭을 조금이라고 본 적이 있다면 아래와 같이 T가 포함된 코드를 보셨을 겁니다.

```ts
function foo<T>(args: T): T {
  return args
}
```

이때 코드에서 보이는 `T`를 **타입 매개변수** 혹은 **타입 파라미터**라고 합니다.

## 🔎 간단한 코드 예시를 통해

인수를 그대로 반환하는 `foo` 함수가 있습니다.

```ts
function foo(args: any): any {
  return args
}

foo(2)
// number 타입을 넘겨서 any 타입을 반환된다는 정보만 있다

function foo<T>(args: T): T {
  return args
}

foo(2)
// 인수와 반환 타입이 같습니다.
// number 타입을 넘기면 number 타입이 반환된다는 정보가 있습니다.
```

위에서 살펴보았을 때, 제네릭과 any의 공통점과 차이점

- 공통점: 어떤 타입도 받는다.
- 차이점: 함수의 반환 타입 정보를
  - 제네릭: 안다
  - any: 모른다

## 🔎 제네릭 함수 호출 방법

함수를 선언할 때 만들어두었던 T 자리에 타입을 넣어주면 됩니다.

```ts
const woony = foo<string>('Woony') // string 타입 반환
```

## 🔎 any 대신 제네릭을 사용하는 이유

```
⭐️ 사용 시점에 타입을 결정해줄 수 있다
```

`any`는 타입 검사를 무시하고 컴파일러가 해당 타입에 대한 안전성을 검사를 수행하지 않습니다.

제네릭을 사용하면 제네릭을 사용한 **함수를 호출한 시점에 작동될 타입을 정의해줄 수** 있습니다. 이는 재사용성을 높이면서도 안전성을 보장하는 데 도움이 된다는 말이죠!

```ts
function foo<T>(args: T): T {
  return args
}
```

함수를 선언하기까지는 어떤 타입이든 받아 추상적이라고 생각이 들 수 있지만

```ts
const woony = foo<string>('Woony')
```

호출하여 사용하는 시점부터는 **foo를 통해** `woony`라는 변수는 **`string` 타입임이 결정**됩니다.

## 🔎 인터페이스와 타입별칭에서도 제네릭

### 인터페이스

함수에서의 제네릭과 동일하게 타입 매개변수를 이용합니다.

```ts
interface Mobile<T> {
  name: string
  price: number
  option: T // option 속성에는 다양한 데이터 자료가 들어온다고 가정
}
```

제네릭 자체에 **객체 타입도 할당**할 수 있습니다.

```ts
const m1: Mobile<{ color: string; coupon: boolean }> = {
  name: '14pro',
  price: 2000,
  option: { color: 'silver', coupon: false },
}
```

또는 함수에서 제네릭을 사용했던 것 처럼 단일 타입이 들어오는 것도 당연히 가능합니다.

```ts
const m2: Mobile<string> = {
  name: '13pro',
  price: 1000,
  option: 'good',
}
```

### 타입 별칭

타입 별칭에서도 동일하게 제네릭을 사용할 수 있습니다.

```ts
type TG<T> = T[] | T

const number_arr: TG<number> = [1, 2, 3, 4]
const number_: TG<number> = 100

const string_arr: TG<string> = ['a', 'b', 'c']
const string_: TG<string> = 'hello'
```

## 🔎 여러 타입 받고 싶긴 한데, 조금 제약이 필요하긴 해

```
⭐️ 제네릭에 extends로 타입의 종류를 제한할 수 있다.
```

```ts
type numOrStr = number | string

function logText<T extends numOrStr>(args: T): T {
  return args
}
```

위 코드와 같이 타입 매개변수를 `extends numOrStr` 하면 즉, numOrStr만 허용할 수 있다고 명시하고 있는 것입니다.

```ts
logText('woony') // 정상
logText(3) // 정상

logText(true) // 에러
logText({ name: 'woony' }) // 에러
```

## 🔎 여러 개 타입 매개변수

하나의 함수에는 여러 개의 타입 매개변수를 받을 수도 있습니다.

```ts
function foo<T extends string, K extends number>(arg1: T, arg2: K): void {
  console.log(typeof arg1)
  console.log(typeof arg2)
}

foo('1', 2)
```

이를 응용하면 다음과 같은 로직을 짤 수 있습니다.

```
getProperty라는 함수가 있다.
이 함수는 객체와 key이름을 인수로 받는다.
→ 만일 객체에 존재하지 않는 key명을 받을 경우 오류를 뿜는다.
```

```ts
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obk[key]
}

const x = { a: 1, b: 2, c: 3, d: 4 }

getProperty(x, 'a') // 성공
getProperty(x, 'm') // 오류: 인수의 타입 'm' 은 'a' | 'b' | 'c' | 'd'에 해당되지 않음.
```

## 🔎 제약 조건으로 함수 자체도 가능

매개변수에 **콜백 함수를 받을 때**는 다음과 같이 제네릭 제약을 할 수 있습니다.

```ts
function foo<T extends (a: string) => number, K extends string>(
  x: T,
  y: K
): number {
  return x(y)
}

const callback = (text: string) => +string
foo(callback, '10') // 10
```

## 📚 참고문서

- [\[TIL\] TypeScript 제네릭 및 유틸리티 타입](https://velog.io/@ongddree/TIL-Typescript-%EC%A0%9C%EB%84%A4%EB%A6%AD-%EB%B0%8F-%EC%9C%A0%ED%8B%B8%EB%A6%AC%ED%8B%B0-%ED%83%80%EC%9E%85)
- [📘 타입스크립트 Generic 타입 정복하기](https://inpa.tistory.com/entry/TS-%F0%9F%93%98-%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-Generic-%ED%83%80%EC%9E%85-%EC%A0%95%EB%B3%B5%ED%95%98%EA%B8%B0)
