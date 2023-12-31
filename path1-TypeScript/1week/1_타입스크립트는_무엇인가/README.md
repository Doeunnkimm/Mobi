# 1. 타입스크립트는 무엇인가?

TypeScript가 어떻게 등장하였는지, 그리고 이를 통해 우리가 TypeScript를 왜 사용해야 하는지를 설명합니다. 그리고 자주 사용되는 타입들을 통해 앞으로 배울 내용을 미리 살펴봅시다.

## TypeScript를 시작하기 전에

TypeScript는 JavaScript의 관계는 현대 프로그래밍 언어에서 꽤 독특한 관계입니다. 이 관계를 이해하면 어떻게 TypeScript를 JavaScript에 추가할지 도움이 될 것입니다.

### JavaScript의 짧은 역사

JavaScript는 처음에 브라우저를 위한 스크립팅 언어로 만들어졌습니다. 스크립팅 언어란, 소스 코드를 컴파일(compile)이라고도 하는 컴퓨터가 이해할 수 있는 언어로 변환하는 작업을 하지 않고도 결과를 확인할 수 있는 언어를 말합니다.

JavaScript는 어떻게 동작하는지 짧게 살펴보자면, JavaScript 코드를 실행하기 위해서는 JavaScript 엔진이 필요합니다. 대표적으로 V8 엔진이 있죠. 이 엔진이 자바스크립트 코드를 해석하고 실행하는 역할을 담당합니다.

JavaScript가 처음 나왔을 때는, 수십 줄 이상의 코드를 작성하는 것은 이례적인 일이였기에 수십 줄 이상의 코드를 실행하는데 오래 걸렸습니다. 그러나 시간이 흘러 JavaScript가 점점 유명해지면서 실행 엔진을 최적화되어 갔습니다.

덕분에 지금은 수백만 줄의 어플리케이션을 작성하기에도 완벽한 도구가 되었습니다. 그렇지만 이런 JavaScript에게도 별난 점이 존재합니다. 예를 들어보겠습니다.

1. 동일 연산자(`==`)

   ```js
   if ('' == 0) {
     // true
   }

   if (0 == '0') {
     // true
   }
   ```

   JavaScript의 동일 연산자(`==`)는 [느슨한 같음](https://developer.mozilla.org/ko/docs/Web/JavaScript/Equality_comparisons_and_sameness#loose_equality_using)을 사용하여 예상치 못한 결과를 내주기도 합니다.

2. 존재하지 않는 프로퍼티에 접근을 허용

   ```js
   const obj = { width: 10, height: 15 }

   // 컴파일 단계에서는 에러 X -> VSCode에서 빨간줄 안 뜹니다.
   const area = obj.width * obj.heeght
   ```

   분명 `height`가 아니라 `heeght`라는 존재하지 않은 프로퍼티에 접근했음에도 JavaScript는 컴파일 단계에서 이상함을 못 느낍니다.

3. 의도되지 않은 매개변수도 전달 가능

   ```js
   const sum = (a, b) => {
     return a + b
   }

   sum(1, 2) // 3
   sum(1, '가') // 1가
   sum(1, () => console.log('안녕')) // 1() => console.log("안녕")
   ```

   의도되지 않은 매개변수도 JavaScript는 거부없이 다 받습니다.

대부분의 프로그래밍 언어는 이런 종류의 오류들이 발생하는 오류를 표출해 주고, 일부 코드는 실행되기 전인 컴파일 중에오류를 표출해 줍니다. 이는 프로젝트 규모가 커질수록 의도대로 동작하지 않아 발생하는 버그로 이어지고 이는 유지보수의 어려움까지 이어질 수 있습니다.

반대로 생각해보았을 때, 의도를 미리 작성해주고 의도와 다른 코드를 작성했을 때 컴파일 에러(VSCode에서 빨간줄처럼요!)로 미리 알려주면 좋지 않을까요?

말이 어렵지 JavaScript를 사용해 본 개발자라면 이런 불편함을 이미 한번씩 겪어보았을 것입니다. 예를 들어보겠습니다.

```js
const person = {
  name: 'Woony',
  age: 10,
}
const getAddressStreet = (object) => {
  console.log(object.address.street);
}

> getAddressStreet(person); // Uncaught TypeError: Cannot read properties of undefined (reading 'street') at getAddressStreet
```

JavaScript 개발자는 object에 address가 없는 줄도 모르고 코드를 작성하고 실행을 시키고서야 브라우저에서 `TypeError`라는 빨간 에러를 확인하고 코드를 수정할 것입니다. 들어오는 객체에 address 프로퍼티가 있는지부터 "확인"했더라면 개발자는 일찍 실행이 잘 안되겠구나를 알 수도 있지 않았을까요?

### TypeScript: 정적 타입 검사자(Static Type Checker)

정적 검사란, 프로그램을 실행시키지 않으면서 코드의 오류를 검출하는 것을 말합니다. 즉, 컴파일 에러로 검출이 가능하다는 것이죠! 더 쉽게 말하면, VSCode에서도 빨간 줄로 에러 검출이 가능하다는 말입니다.

정적 타입 검사자인 TypeScript는 프로그램을 실행시키기 전에 **값의 종류를 기반으로** 프로그램의 오류를 찾습니다. 위에서 조금 살펴본 것처럼 "들어온 값이 올바른가?"를 기반으로 오류를 검출한다는 것입니다.

### JS + Types = TS!

"TypeScript는 JavaScript의 슈퍼셋입니다"라는 말을 자주 들으셨을 수도 있습니다. 그렇게 불리는 이유는 TypeScript가 JavaScript의 문법을 그대로 사용할 수 있으면서도 타입 시스템을 도입하여 코드의 안정성과 가독성을 향상시키기 때문입니다.

즉, TS = JS + Types

<p align="center"><img src="https://blog.kakaocdn.net/dn/pfMvk/btqSDvgVbI6/s3SiO35LyRIACNtJ2jRXB1/img.jpg" width="50%"/></p>

### TS와 JS의 관계

그렇다면 TypeScript는 JavaScript와 어떤 관계일까요?

1. 구문(Syntax) <br>
   TypeScript는 JavaScript의 구문이 허용되는 JavaScript의 슈퍼셋 언어입니다. 따라서 JavaScript에서의 `Syntax` 에러는 TypeScript에서도 동일하게 `Syntax` 에러 입니다.

   ```ts
   // @errors: 1005
   let a = (4
   ```

2. 타입(Types) <br>
   TypeScript는 JavaScript에서는 잡지 못했던 프로그래밍 실수들을 잡아줍니다.

   ```ts
   // JS
   console.log(4 / []) // Infinity

   // TS
   console.log(4 / [])
   ~~~error
   ```

3. 런타임 특성 <br>
   TypeScript는 JavaScript의 런타임 특성을 가진 프로그래밍 언어입니다. 예를 들면, JavaScript에서 0으로 나누는 행동을 런타임 에러로 처리하지 않고 `Infinity`값을 반환합니다. TypeScript도 JavaScript에 타입 시스템을 부여한 언어일 뿐, 런타임 시에는 JavaScript와 동일하게 실행시켜져 `Infinity`를 반환합니다.

4. 삭제된 타입 <br>
   TypeScript의 컴파일러가 코드 검사를 마치면 타입을 삭제합니다. 간단하게 말해보자면, TypeScript는 JavaScript와 달리 컴파일이 필요합니다. 컴파일이 완료되면 `ts`파일은 모두 `js`파일로 변환이 되는데요. 이때 코드가 컴파일 되면 `ts`파일에서 작성했던 타입 정보들은 모두 없어집니다.

   이를 통해 알 수 있는 중요한 사실은 TypeScript의 타입은 **컴파일 시점에만 유효하다**는 것입니다.

<p align="center"><img src="https://www.nextree.io/content/images/2023/04/banner_0406-2-.jpg" /></p>

## 타입스크립트를 사용함으로써 얻는 이점

### 1. 에러 사전 방지

```
타입 스크립트는 코드에 목적을 명시하고 목적에 맞지 않는 타입의 변수나 함수들에서 에러를 발생시켜 버그를 사전에 제거합니다.
```

### 2. 생산성 향상
```
코드 자동완성이나 실행 전 컴파일 에러를 제공하여 작업과 동시에 디버깅이 가능해 생산성을 높일 수 있습니다.
뿐만 아니라, 함수의 매개변수나 리턴 값의 타입을 빠르게 확인할 수 있어 효율적입니다.
```

## 타입스크립트, 단점은 없을까?

### 1. 개발의 규모에 따른 타입 설정의 번거로움, 비용 증가
```
개발의 규모가 커지면 커질수록 타입 설정이 귀찮고 시간이 오래 걸릴 수 있다는 문제가 생길 수 있습니다.
타입스크립트는 타입 강제화를 위해 사용자가 코드에 타입을 선언해서 미리 제한해야 합니다.
이 과정에서 자바스크립트로 개발할 때 보다 시간이 더욱 소요될 수 있습니다.
```

## 결론적으로, 타입스크립트를 사용해야 할까?
```
개발 규모에 따른 타입 설정의 번거로움 및 비용 증가의 단점이 있다고 했지만,
그보다도 얻을 수 있는 이점이 더 크다고 생각합니다.
따라서, 타입스크립트는 에러 사전 방지와 생산성 향상을 통해 개발 프로젝트를 더욱 안정적이고 효율적으로 진행할 수 있게 해주는 도구이며,
단점을 극복할 만한 가치가 충분하다고 생각합니다.
따라서 대부분의 큰 프로젝트의 경우, 타입스크립트를 사용 중이기도 합니다.
```
