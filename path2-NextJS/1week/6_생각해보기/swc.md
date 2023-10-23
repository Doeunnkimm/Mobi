# swc

NextJS는 12버전부터 내장으로 babel 대신 swc를 활용한 컴파일을 실행합니다. swc란 무엇이고 babel을 대신할 수 있었던 이유까지도 알아보도록 합시다.

<p align="center"><img src="https://avatars.githubusercontent.com/u/26715726?v=4" width="40%"/></p>

## 🤔 먼저, 바벨이 하던 역할이 뭐였지?

```
⭐️ 바벨은 ES6와 같은 자바스크립트 최신 버전의 코드를
   이전 버전의 코드로 변환시켜주는 도구

   → 트랜스파일러!!
```

### 트랜스파일러를 사용하는 이유

1. **최신 JavaScript 문법 지원**

   트랜스파일러는 최신 ECMAScript 표준에 따른 문법을 구 브라우저와 호환 가능한 JavaScript 코드로 변환해 준다.

2. **TypeScript 지원**

   TypeScript 코드는 브라우저에서 실행하기 위해서는 JavaScript 코드로 컴파일 해야 한다. 이 과정에서 트랜스파일러를 사용한다.

3. **코드 최적화**

   트랜스파일러는 코드를 최적화하여 더 작고 빠른 형태로 변환하는 데 도움이 된다. 예를 들어, 불필요한 코드 삭제, 트리 쉐이킹과 같은 기술을 사용하여 최종 번들 크기를 줄이고 실행 성능을 향상시킬 수 있다.

4. **확장성**

   트랜스파일러는 다양한 플러그인과 확장 기능을 지원하여 빌드 옵션을 사용자 정의할 수 있게 해준다.

## 🤔 swc도 트랜스파일러

```
⭐️ swc는 Rust로 쓰인 Babel보다 빠른 트랜스파일러
```

### swc가 babel보다 빠른 이유

```
⭐️ Rust로 작성되었기 떄문!
   (babel은 JavaScript)
```

#### 👏 Rust의 특징

1. **정적 타입 언어**

   정적 타입 언어는 변수의 타입이 컴파일 시점에 결정되므로, 타입 검사를 동적으로 수행 X

   반면, JavaScript는 동적 타입 언어로, 런타임 시점에 변수 타입을 결정 (Babel)

2. **최적화된 메모리 관리**

   Rust는 여러 체계를 통해 고유한 메모리 관리를 사용하여 메모리를 효율적으로 관리

   반면, JavaScript는 가비지 컬렉션을 사용.

3. **병렬 처리**

   Rust는 멀티 스레드를 지원하는 언어이다.

   JavaScript는 싱글 스레드 환경이다.

## 🤔 Next.js가 Babel 대신 swc를 선택한 이유

```
⭐️ 컴파일 시 Babel보다 높은 성능과 속도 제공하기 때문

→ 빌드 속도와 개발 환경의 성능 향상을 기대하며 채택
```

# 참고

- [Why you should use SWC(and not Babel)](https://blog.logrocket.com/why-you-should-use-swc/#:~:text=In%20general%2C%20we%20see%20a,multi%2Dcore%20async%20operation%20process)
- [SWC와 Babel의 성능 비교](https://swc.rs/blog/perf-swc-vs-babel)
