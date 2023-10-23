1. ssr, csr 차이를 정의하고 이해하기
```
- 단순히 인터넷에 서칭하여 정의를 나열해서는 안됩니다
- 백엔드와 프론트엔드의 시점에서 데이터와 리소스를 어떤식으로 관리하고 랜더하는지 확실히 정리할 것
- hydration에 대하여 정의하기
```

2. nestJS 프로젝트를 생성해보자
```
npx create-next-app@latest [프로젝트명]

@reference
https://nextjs.org/docs/getting-started/installation
```


3. nextJS에서 SSR을 지원하는 방법에 대해서 알아보고 12v, 13v 차이를 생각해보자
```
- nextJS의 ssr, ssg, isr에 대하여 정의해보세요
- nextJS 12에서 이를 구현하기 위해서는 어떻게 했는지 생각해봅시다!

  @reference
  https://velog.io/@bbaa3218/Next-js-SSG-SSR-ISR

  (1) getServerSideProps
  (2) getStaticProps
  (3) getStaticProps, revalidate

- nextJS 13에서는 어떻게 바뀌었을까요!?

  @reference
  https://ahnanne.tistory.com/92

  (1) fetch(axios와 같은 data fetching 라이브러리를 써도 무방함)
  (2) cache option
```

4. next-js route system
```
  next-js에서는 react-router-dom과 같이 개발자가 직접 라우팅을 연결하지 않아도 괜찮습니다
  그렇다면, 어떠한 방식으로 라우팅을 지원하고 있으며 params와 qurey-string과 같은 데이터를 전달받기 위해서 지원하는 hooks에 대하여도 알아봅시다

  @reference
  import { useRouter } from "next/navigation";
  https://velog.io/@bbaa3218/Next-js-Route-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0
  https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts
  https://steady-learner.tistory.com/entry/Nextjs-React-section-3-%ED%8E%98%EC%9D%B4%EC%A7%80-%ED%8C%8C%EC%9D%BC-%EA%B8%B0%EB%B0%98-%EB%9D%BC%EC%9A%B0%ED%8C%85

```

5. 실습하기
```
2번 path를 통해 init한 프로젝트에 라우트를 만들어보세요
- "/" (home)
- "/posts"

posts route에는 https://jsonplaceholder.typicode.com/를 활용하여 ssr을 구현한 게시글 목록을 보여주세요
```


6. 생각해보기 
```
- nextJS에서 csr을 구현하기 위해서는 어떻게 해야할까?
- nextJS는 12버전부터 내장으로 babel 대신 swc를 활용한 컴파일을 실행한다. swc는 무엇이고 babel과의 차이는?

@reference
https://fe-developers.kakaoent.com/2022/220217-learn-babel-terser-swc/

- ssr에서는 브라우저 환경이 존재하지 않기 때문에 웹스토리지에 접근할 수 없다. 이를 해소하기 위해서는 어떻게 해야할까?
```
