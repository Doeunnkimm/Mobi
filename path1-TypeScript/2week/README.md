
## 2주차
<br/>

1. tsconfig 옵션 파해치기
 ```

  https://www.typescriptlang.org/tsconfig
  https://codingapple.com/unit/typescript-tsconfig-json/

  1. tsconfig의 역할은 무엇인가?
  2. tsconfig는 어디까지의 역할을 할 수 있을까?
  3. tsconfig에서 주요 옵션을 확인하고 정리해봅시다
  4. tsconfig를 활용하여 ts project는 만들고 상대 경로를 절대 경로로 만들어 import 해보세요

  ex) ../../../style/style.js => @style/style.js

 ```
<br/>

2. type-guard
 ```

  1. 타입가드는 무엇이고 왜 필요할까요?
  2. 타입가드 종류의 예시를 들어보고, 얻을 수 있는 장점을 코드로 구현해보세요

 ```
<br/>

3. 문제풀이
  ```

   1. 데이터 통신을 통해 받아온 데이터의 타입 부여하기

      - api/1.ts와 2.ts를 통해 API 통신을 통해 받아온 데이터의 타입은 type 폴더의 TodoDataBase의 배열입니다.
      - 1.ts에서는 interface를 통해 타입을 부여해보세요!
      - 2.ts에서는 axios에 제네릭을 사용하여 타입을 부여해보세요!
      - 무엇이 되었던 사용하는 곳에서는 자동완성이 지원되어야 합니다.


   2. 타입가드로 유동적인 타입에 자동완성 지원하기

      - TodoDataBase는 type에 따라 다른 데이터 양식을 갖고 있습니다.
      - 이에 따라 현재 안정적인 타입 환경은 TodoDataBase 객체의 type 속성만을 지원하고 있습니다.
      - 이를 타입 가드를 이용하여 특정 타입에 따라 모든 경우에 안정적인 타입 환경에서 개발할 수 있도록 수정해보세요!

      ex)
          const todo = await TodoApi.getTodo();
          * 이때 문제 1번에 의하여 todo는 TodoDataBase 배열 타입이어합니다.

          todo.type
          * 이때 todo의 타입은 상황에 따라 다르기에 type만을 자동완성 지원합니다.

          그러나 현재 로직에서

          todo.type === TodoEnum.DAILY의 경우 title과 content
          todo.type === TodoEnum.WEEKILY의 경우 total
          todo.type === TodoEnum.MONTHLY의 경우 goal

          모두 타입에 따라 안정적인 환경에서 개발이 가능해야합니다.


      - 코드 구현은 components의 OneTodo에 구현해야하며 OneTodo는 props로 todo:TodoDataBase를 전달 받습니다.
      - OneTodo 내에서 타입 가드를 활용하여 todo.type에 따라 자동완성이 구현되도록 구현할 것, UI는 구현하지 않아도 됩니다
      - Q1Component는 todo[]를 map으로 순회하여 OneTodo 컴포넌트들을 랜더링 할 상위 컴포넌트라고 생각해주시면 됩니다.

      * 결론 => 타입 가드를 활용하여 자동 완성 지원되지 않는 속성을 자동 완성 되도록 만들기

  ```
<br/>


4. 생각 해보기
 ```

   1. export한 type을 받을 때 import type을 해야하는 이유는 무엇일까요?
   2. as const와 enum type의 차이와 각각 어느 순간에 사용하는게 좋을까요?
   
 ```


프로젝트 실행 방법
<br/>



```
  npm install -> npm run dev
```


