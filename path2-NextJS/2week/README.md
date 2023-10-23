**** 이번 플로우를 진행하기 위해서는 1week에서 진행했던 CSR과 SSR의 차이와 SSR 활용법을 알고 있어야 합니다 ****

1. AppRouter, PageRouter
```
(개인) -> (페어)
-------------- 개인 학습 이후 페어와 논의

nextJS 13.4v부터 appRouting을 지원합니다. 기존에 있던 PageRouter와 AppRouter의 차이와
AppRouter에서 지원하는 File Convention의 종류와 활용도에 대해서 정의해보세요

p.s nextjs에서는 개발자가 직접 routing을 하지 않아도 file routing을 통해 routing을 지원합니다.
그러기 위해서는 반드시 지켜야하는 파일 컨벤션이 존재합니다.

* 정리 내용은 feat/본인 닉네임으로 커밋합니다.
* pageRouter와 appRouter의 multiple layout 적용 방법 차이도 함께 고민해보면 좋아요..!

@reference

https://velog.io/@malza_0408/NEXT.JS-13.4-%EB%AC%B8%EC%84%9C-2Routing
https://www.timegambit.com/blog/blog-log/app-router
https://velog.io/@typo/next.js-13.4
```

<br/>
<br/>

2. Best Folder Structure
```
(페어)

1번을 이해했다면 nextJS에서는 기존과는 다른 폴더 구조를 상상해볼 수 있을텐데요 아래의 조건에 따라
페어와 소통하여 가장 좋은 폴더구조를 작성해보세요. 모든 파일의 내용은 페어의 상상에 맡기며 실제 내용은 place holder로 대체 합니다.

단, 어떠한 상황에서 어떠한 개발적 가치관을 갖고 폴더 구조를 나누었는지 JS DOCS를 통해 반드시 작성할 수 있도록 해주세요.

이를 위해선 github이나 googling을 통해 다른 next-js project의 폴더구조를 분석하는 것도 좋은 방법입니다.

@component
- home --> loginform, signupform (toggle)
- todo --> onetodo, addTodo

@api
- home --> /user/sign-in, /user/sign-up
- todo --> /todo (crud)

@utils
- array-helper

@types
- todo
- user

@store(atoms)
- todo

* 폴더구조는 프로젝트로 생성하여 feat/pair-1(number)로 커밋합니다.
* 아래는 다른 연합 동아리의 프로젝트 및 폴더 구조입니다. 단 이를 결코 배껴선 안되며 본인의 의도가 녹아드는게 중요합니다.
* 파일명 또한 api, sdk, infra 등 페어가 상상하여 다양한 시도를 해보세요!

@reference

https://github.com/depromeet/toks-web
https://github.com/YAPP-Github/dangledangle-client
```

<br/>
<br/>

3. Image, Font Optimzier
```
(개인) -> (페어)

next-js에서는 Image와 Font 사용을 Optimization하여 지원합니다.
어떠한 방법으로 이를 Optimization하고 있을까요?

* 정리 내용은 feat/본인 닉네임으로 커밋합니다.

@reference

https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
https://blog.mathpresso.com/how-next-font-works-8bb72c2bae39
https://www.youtube.com/watch?v=lQsB0nZ8Bdo

https://fe-developers.kakaoent.com/2022/220714-next-image/
https://mycodings.fly.dev/blog/2022-09-08-all-about-nextjs-image-component
https://nextjs.org/docs/pages/api-reference/components/image
```

<br/>
<br/>

4. Toy Project
```
(페어)
1,2,3의 진행 현황을 보고 진행여부 판단
```
