# tsconfig 옵션 파헤치기

TypeScript 프로젝트를 생성하면 생기는 `tsconfig.json`은 뭔가 건드리기 무서워 보입니다. 무엇을 하는 파일일까요? 그래서 이번 글에서는 `tsconfig`의 역할부터 주요 옵션까지 알아보려고 합니다.

## 🤔 tsconfig의 역할은 무엇일까?

```
⭐️ tsconfig는 해당 프로젝트를 컴파일 하기 위한 옵션들을 설정!
```

### 컴파일 하기 위한 설정?

- tsconfig는 컴파일을 위해 **필요한 옵션들을 설정**하기 위한 파일
- 그래서 tsconfig 없이도 tsc를 실행시키는 것은 문제가 없습니다.

```
⭐️ tsconfig는 옵션을 설정하는 파일일 뿐이므로 없이도 tsc 실행이 가능하다

(옵션은 선택할 수 있는 것이니까요!)
```

```
$ tsc index.ts
```

위와 같이 실행 시 동일한 위치에 `index.ts` 파일이 생성됩니다.

만약 이름을 다르게 하고 싶다면 `tsc --outFile hello.js index.ts`와 같이 사용할 수 있습니다. 이와 같이 tsc는 tsconfig 없이도 바로 사용이 가능합니다.

그런데 **tsconfig 파일이 왜 필요**한 걸까요?

```
⭐️ 매번 명령어에 옵션을 주기가 번거롭고 프로젝트에서 일정한 설정을 유지하기 위해서!
```

### 그래서 tsc가 실행되면 tsconfig는

tsconfig는 tsc를 위한 즉, 컴파일을 위한 옵션이라고 했습니다.

따라서 tsconfig가 존재했을 때 tsc를 실행하면 다음과 같습니다.

```
⭐️ tsc 호출 → tsconfig에 설정된 모든 디렉토리를 체인하여 컴파일
```

### React + TS 프로젝트에서의 tsconfig

## 🤔 tsconfig는 어디까지의 역할을 할 수 있을까?

좀 전에 tsconfig는 매번 입력해주기 번거로운 옵션과 일정한 설정 유지를 위해 필요하다고 했습니다.

그러면 tsconfig는 어디까지의 역할을 할 수 있을까요?

### 1. 프로젝트 구조 관리

```
⭐️ 어떤 파일을 컴파일에 포함시킬지 또는 제외시킬지를 설정
```

해당 기능을 이용하면 프로젝트의 소스 코드들을 더욱 체계적으로 구성하고 관리할 수 있습니다.

- **include**: 컴파일에 포함될 파일의 경로 패턴을 지정
- **exclude**: 컴파일에서 제외될 파일의 경로 패턴을 지정

### 2. 타입 검사 및 오류 감지

```
⭐️ 어떤 종류의 오류를 감지하고 싶은지를 설정
```

여기서 오류의 종류에는 간단히 다음과 같은 옵션들이 존재합니다.

- **strict**: 엄격하게 타입을 체크
- **noImplicitAny**: 타입이 명시되지 않은 경우 any로 추론되는 것을 방지
- **strictNullChecks**: 잠재적으로 null이 될 수 있는 값들의 접근을 방지
- **noImplicitThis**: this 키워드가 무엇을 가리키는지 명확하지 않았을 경우를 방지
- **alwaysStrict**: 컴파일 후 생성된 자바스크립트 파일이 strict mode를 사용하도록 하는 옵션

### 3. 출력 디렉토리 설정

```
⭐️ 컴파일된 결과물을 저장하는 위치를 설정
```

- **outDir**: 컴파일된 JavaScript 파일들이 저장될 디렉토리를 지정. 이 옵션에 디렉토리 경로를 설정하면, 컴파일러가 컴파일 결과물을 해당 디렉토리에 생성
- **rootDir**: TypeScript 소스 파일들의 루트 디렉토리를 지정. 컴파일러는 이 디렉토리 내의 TypeScript 파일들을 대상으로 컴파일

### 4. 타입 정의 파일 설정

```
⭐️ 외부 라이브러리의 타입 정의 파일을 자동으로 찾아서 사용하도록 설정
```

- **typeRoots**: 파일 정의 파일을 찾을 디렉토리의 경로를 배열로 지정. 기본적으로 `node_modules/@types` 디렉토리가 포함
- **types**: 프로젝트에 포함되어야 할 타입 정의 파일의 이름을 배열로 지정. 이 옵션을 사용하여 필요한 타입 정의 파일을 자동으로 포함시킬 수 있다.

### 5. 프로젝트 참조 설정

```
⭐️ 다른 패키지의 tsconfig에 의존할 수 있도록 설정

특히 모노레포에서 자주 쓰인다!
```

- **references**: 프로젝트 간의 의존 관계 설정

타입스크립트가 이런 옵션을 제공하는 이유는 아래와 같은 경우 때문입니다.

```
├── src/
│   ├── converter.ts
│   └── units.ts
├── test/
│   ├── converter-tests.ts
│   └── units-tests.ts
└── tsconfig.json
```

위 프로젝트는 소스 코드와 테스트 코드가 별도의 디렉토리로 분리되어 있고, 루트에는 하나의 tsconfig가 전체 프로젝트의 컴파일 옵션을 관리하고 있습니다. 이런 구조의 프로젝트는 상당히 흔한 구조이기는 하지만, 막상 이렇게 만들어놓고 개발을 하다보면 몇 가지 불편한 점이 생깁니다.

```
1. 소스 코드인 src 모듈에서도 테스트 코드인 test 모듈을 불러올 수 있다.
2. 소스 코드에서 절대 오류가 발생하지 않는 부분을 수정했는데도 테스트 코드까지 다시 타입 검사를 해야 한다.
3. 반대로 테스트 코드를 고치면 소스 코드까지 다시 타입 검사를 해야 한다.
```

프로젝트의 크기가 커질수록 컴파일러의 타입 검사도 비례해서 느려지기 때문에 어느 순간부터는 개발 자체에 어려움을 느낄 수 있습니다.

그렇다면 프로젝트의 모듈마다 tsconfig를 만들어 두고 따로 컴파일하면 어떨까요?

```
├── src/
│   ├── converter.ts
│   ├── units.ts
│   └── tsconfig.json
└── test/
    ├── converter-tests.ts
    ├── units-tests.ts
    └── tsconfig.json
```

이렇게 각각의 모듈 별로 tsconfig를 가지도록 구성하면 위에서 이야기했던 문제들은 어느 정도 해결이 됩니다. 하지만 이렇게 해도 불편함이 존재합니다.

```
1. 각각의 모듈 별로 따로 컴파일해줘야 한다.
2. tsc는 하나의 프로세스만 띄울 수 있도록 만들어졌기 떄문에 동시에 여러 개의 tsconfig를 토대로 빌드를 하거나 소스 코드의 변경 사항을 감지하는 것이 불가능하다
```

이러한 불편함들은 `references`라는 옵션으로 해결하려고 했던 것 !

```json
// my-project/test/tsconfig.json
{
  "references": [
    // my-project/src/tsconfig.json을 참조한다
    { "path": "../src" }
  ]
}
```

`references` 옵션을 사용하여 `test` 모듈에서 `src` 모듈을 참조하고 있다는 것을 표현하고 있습니다. 이때 `test` 모듈에서 `src` 모듈에 있는 하위 모듈들을 불러오게 되면 소스 코드인 `*.ts`가 아니라 빌드가 완료된 결과물인 `*.d.ts` 파일을 가져오게 됩니다.

- **baseUrl**: 프로젝트 기본 경로를 설정한다.
- **paths**: 복잡한 디렉토리 구조를 패턴으로 지정

```json
{
  "compilerOptions": {
    "baseUrl": "./src", // 기본 경로를 src로 설정
    "paths": {
      "@components/*": ["components/*"], // @components/* 패턴을 src/components/* 경로로 매핑
      "@utils/*": ["utils/*"] // @utils/* 패턴을 src/utils/* 경로로 매핑
    }
  }
}
```

### 6. 실행 환경 설정

```
⭐️ TypeScript 코드를 실행하는 한경을 설정

→ 특정 환경에서 코드를 실행하기 위한 설정으로,
  실행 환경에 맞춰 코드를 컴파일하는 역할
```

- **target**: 컴파일된 JavaScript의 ESCMAScript 버전 설정.
- **module**: 컴파일된 모듈 시스템을 설정
- **lib**: 프로젝트에서 사용할 라이브러리를 지정. 예를 들어 `DOM`, `ES2015`

## 🤔 tsconfig에서 주요 옵션을 확인하고 정리해보자

### 1. target

```
⭐️ TypeScript 코드가 컴파일될 ECMAScript 버전을 지정
```

이 옵션은 컴파일된 코드가 어떤 JavaScript 엔진에서 실행될지를 결정하며, 코드의 호환성과 성능에 영향을 미칩니다.

- **ES3**: ECMAScript 3 버전을 대상으로 컴파일. 오래된 브라우저나 JavaScript 엔진에서도 실행될 수 있는 코드를 생성
- **ES5**: ECMAScript 5 버전을 대상으로 컴파일. 현대적인 브라우저와 Node.js에서 실행 가능한 코드를 생성
- **ES6** 또는 **ES2015**: ECMAScript 2015(ES6) 버전을 대상으로 컴파일. Arrow 함수, 클래스, 모듈 등 ES6의 기능을 활용한 코드를 생성
- **ES2016, ES2017, ..** : 각 버전에 추가된 기능을 활용 가능
- ESNext: 가장 최신 버전의 ECMAScript 기능을 사용할 수 있도록 컴파일. 컴파일러가 이해하는 최신 문법과 기능을 활용 가능

### 2. module

```
⭐️ TypeScript 코드에서 사용되는 모듈 시스템을 결정
```

```
🤔 모듈 시스템
   코드를 모듈화하고 재사용 가능한 구성 요소로 분리하는 방법을 정의한 시스템
```

- **CommonJS**: Node.js의 기본 모듈 시스템. `require()`와 `module.exports`를 사용하여 모듈을 정의하고 가져온다. 브라우저에서도 사용할 수 있지만 런타임에 번들링이 필요하다.
- **AMD**: 비동기적으로 모듈을 로드하는 모듈 시스템. 주로 브라우저 환경에서 사용. `require()`와 `define()` 함수를 사용
- **ES6**또는 **ES2015**: ES6 모듈 시스템. `import`와 `export` 키워드를 사용하여 모듈을 정의하고 가져온다.
- **None**: 모듈 코드를 생성하지 않고 전역 네임스페이스로 코드를 컴파일한다.

### 3. outDir

```
⭐️ TypeScript 컴파일러가 트랜스파일된 JavaScript 파일을 배치하는 위치를 정의

기본적으로 `./dist`
```

### 4. rootDir

```
⭐️ TypeScript 파일을 찾기 시작할 위치를 컴파일러에게 알려준다.
```

### 5. strict

```
⭐️ true로 설정하면 TypeScript는 더 엄격한 유형 검사 규칙을 적용
```

```json
/* Strict Type-Checking Options */
"strict": true,
// "noImplicitAny": true,
// "strictNullChecks": true,
// "strictFunctionTypes": true,
// "strictBindCallApply": true,
// "strictPropertyInitialization": true,
// "noImplicitThis": true,
// "alwaysStrict": true,
```

`"strict": true` 옵션은 아래 주석 처리된 옵션들을 모두 활성화한 것과 같은 옵션입니다.

타입스크립트가 보다 엄격하게 타입을 체크할 수 있도록 돕기 때문에 `true`로 하고 개발을 하는 것이 좋습니다.

### 6. baseUrl과 paths

```
⭐️ 복잡한 디렉토리 구조를 패턴을 통해 지정하여 매핑 가능하도록 설정
```

```json
{
  "compilerOptions": {
    "baseUrl": "./src", // 기본 경로를 src로 설정
    "paths": {
      "@components/*": ["components/*"], // @components/* 패턴을 src/components/* 경로로 매핑
      "@utils/*": ["utils/*"] // @utils/* 패턴을 src/utils/* 경로로 매핑
    }
  }
}
```

## 🤔 tsconfig에서 절대경로 설정하기

개발을 하다보면 폴더에 폴더에 폴더가 늘어나 깊이가 깊어지고 이 깊숙히 있는 파일을 불러오려면 아래와 같은 모습이 된다.

```tsx
import Hello from '../../../../components/Hello'
```

```
⭐️ tsconfig를 통해 절대 경로를 설정해주자
```

tsconfig의 `paths` 옵션을 통해 절대 경로를 설정해줄 수 있습니다.

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

그러면 이제 아래와 같이 사용이 가능합니다.

```tsx
import Button from '@/components/Button/Button'
```

# 참고 문서

- [What is a tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
- [What is the purpose of using tsconfig.json file?](https://www.geeksforgeeks.org/what-is-the-purpose-of-using-tsconfig-json-file/)
- [📘 타입스크립트 컴파일 설정 - tsconfig 옵션 총정리](https://inpa.tistory.com/entry/TS-%F0%9F%93%98-%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-tsconfigjson-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0-%EC%B4%9D%EC%A0%95%EB%A6%AC#tsconfig_%EC%A0%84%EC%97%AD_%EC%86%8D%EC%84%B1)
- [[TypeScript] tsconfig.json 의 엄격한 타입 체킹 옵션 (Strict Type-Checking Options)](https://velog.io/@hailieejkim/TypeScript-tsconfig.json-%EC%9D%98-%EC%97%84%EA%B2%A9%ED%95%9C-%ED%83%80%EC%9E%85-%EC%B2%B4%ED%82%B9-%EC%98%B5%EC%85%98-Strict-Type-Checking-Options)
- [[tsconfig의 모든 것] Root fields](https://evan-moon.github.io/2021/07/30/tsconfig-options-root-fields/)
- [How to Customize Your tsconfig.json File for Your TypeScript Project](https://gcore.com/learning/customize-your-tsconfigjson-file-for-typescript/)
