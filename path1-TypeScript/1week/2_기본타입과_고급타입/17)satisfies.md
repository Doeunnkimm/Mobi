# 17. ✨ satisfies

4.9 버전에 추가된 `satisfies` 연산자는 기존 리턴 타입을 제대로 추론하지 못한 타입스크립트의 문제점을 해결해줍니다.

```ts
const palette = {
    const palette = {
    red: [255, 0, 0],
    green: "#00ff00",
    bleu: [0, 0, 255]
    // blue를 bleu로 오타..!
};
}
```

오타를 방지하고 싶다면 아래와 같이 해줄 수 있습니다.

```ts
type Colors = 'red' | 'green' | 'blue'
type RGB = [red: number, green: number, blue: number]

const palette: Record<Colors, string | RGB> = {
  red: [255, 0, 0],
  green: '#00ff00',
  bleu: [0, 0, 255],
  //~~~~ The typo is now correctly detected
}
```

하지만 위는 오타를 위해 타입 추론이 아닌 `palette` 타입을 명시적으로 지정해주었습니다. 이렇게 되면 blue와 red 키 값의 value는 이제 `string | RGB` 유니온 타입이기 때문에 `Array` 관련 메서드를 사용할 수 없게 됩니다. string일 수도 있으니까요!

<p align="center"><img width="516" alt="image" src="https://github.com/Doeunnkimm/Frontend/assets/112946860/661b3341-db32-4c45-a067-3ebc20056e93"></p>

이럴 때 `satisfies`를 사용할 경우 유니온 타입으로 인해 타입스크립트가 추론하지 못하는 프로퍼티의 value에 대해 추론할 수 있도록 도와줍니다. `blue`의 오타를 발견함과 동시에 value 메서드를 사용할 수 있는 것이죠!

```ts
const palette = {
  red: [255, 0, 0],
  green: '#00ff00',
  bleu: [0, 0, 255],
  //~~~ The typo is now caught!
} satisfies Record<Colors, string | RGB>

const greenNormalized = palette.green.toUpperCase()
```

비슷하게 이제는`red`에 대해서도 `Array` 의 메서드를 사용할 수 있습니다.

<p><img width="396" alt="image" src="https://github.com/Doeunnkimm/Frontend/assets/112946860/587fbcd6-e0b7-4991-a13c-4bdd25ea78de"></p>

`satisfies` 연산자 덕분에 실행하기 전에 유형의 모든 값의 key와 value를 검사해주어 오류를 검사해줍니다.

## 🔥 좀 더 자세히 알아보자

우리가 원래 하고 싶었던 것은 palette는 `red`, `green`, `blue` 세 가지의 키만 가지게 하려고 했던 것이였는데요.

```ts
const favoriteColors = {
  red: 'yes',
  green: false,
  blue: 'kinda',
  purple: false,
  //~~~~ error: "purple" was never listed in 'Colors'
} satisfies Record<Colors, boolean | string>

const g = favoriteColors.green
const r = favoriteColors.red
```

예상을 해보면 g는 `boolean` 타입으로 r은 `string`타입으로 추론되었을 것 같습니다.

<p align="center"><img width="385" alt="image" src="https://github.com/Doeunnkimm/Frontend/assets/112946860/8f891bc0-99da-4419-8c29-13358dc3ea5f"></p>

하지만 예상과 달리 g는 `false`라는 리터럴 타입입니다. r은 예상대로 `string`타입이 맞았습니다.

위와 같이 추론이 되면 아래와 같은 문제가 발생합니다.

```ts
favoriteColors.green = true
// ~~~~~~~~~~~~~~~~ Type 'true' is not assignable to type 'false'
```

`boolean` 타입이 아닌 `false` 타입이였기에 에러가 발생합니다.

위 처럼 간주되지 않도록 하고 싶다면 아래와 같이 해야 합니다.

```ts
type Colors = "red" | "green" | "blue"

const favoriteColors = {
    "red": "yes" as const
    "green": false,
    "blue": "kinda"
} satisfies Record<Colors, unknown>

const g = favoriteColors.green; // boolean
const r = favoriteColors.red; // yes

favoriteColors.green = true; // 가능
```

`red` 키 값에 대해 `string` 타입이 아닌 "yes" 타입으로 const하게 선언하고 싶다면 `as const` 키워드를 붙여주면 됩니다.

## 🔥 타입을 명시하거나 as 키워드를 사용할 때

위 예시들을 보면서 타입을 명시해주거나 as 키워드를 사용하는 방법이 떠오를 수 있습니다.

간단한 예시를 통해 어떤 차이점들이 있는지 알아봅시다.

### 타입 명시해주기

- 장점: 안전하다
- 단점: 번거롭다

안전하지만 번거롭게 타입 정의를 하여 명시해 주어야 합니다.

```ts
interface Dev {
  name: string
  skill: string
}

const Woony: Dev = {
  name: 'Woony',
  skill: 'TypeScript',
  age: 11,
  //~~ ❌ 'age' does not exist in type 'Dev'.
}
```

### as 사용하기

- 장점: 편리하다
- 단점: 안전하지 않다

as를 사용하면 편리하긴 하지만 안전하지 않습니다.

```ts
const Woony = {
  name: 'Woony' as string,
  skill: {
    first: 'TypeScript',
  } as { first: string; second: string },
}
```

위와 같이 작성하면 `Dev` 타입에 있는 `skill`에 `second`가 없어서 에러가 발생할 것 같지만 그렇지 않습니다.

<p align="center"><img width="306" alt="image" src="https://github.com/Doeunnkimm/Frontend/assets/112946860/ff5690da-177f-4dae-9447-f680cc38ef13"></p>

### satisfies는 편리하면서도 간편하게 사용 가능

- 장점: 편리하고 안전하다

```ts
const Woony = {
  name: 'Woony' satisfies string,
  skill: {
    first: 'TypeScript',
  } satisfies { first: string; second: string },
}
```

<p align="center"><img width="360" alt="image" src="https://github.com/Doeunnkimm/Frontend/assets/112946860/50b7c634-5c84-4605-b883-913e2da2f3c7"></p>

## 참고문서

- [TS 4.9 satisfies, 그로 인한 영향](https://velog.io/@jay/TS-4.9-satisfies)
- [How to Use the TypeScript satisfies Operator](https://www.freecodecamp.org/news/typescript-satisfies-operator/)
- [satisfies: 안전한 업캐스팅](https://news.hada.io/topic?id=7395)
- [Clarifying the 'satisfies' Operator](https://www.totaltypescript.com/clarifying-the-satisfies-operator)
- [\[TypeScript\] satisfies 연산자 알아보기](https://jizard.tistory.com/460)
