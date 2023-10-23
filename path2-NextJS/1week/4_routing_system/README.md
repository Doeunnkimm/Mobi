# NextJS에서의 Routing

NextJS에서는 기존 React에서의 라우팅 방식과 조금 다르다. 그 내용과 방법에 대해 알아보자!

## 👏 NextJS에서는 따로 route 이름을 지어주지 않아도 됩니다

```
⭐️ Next.js의 Router는 file-system 기반
```

React에서는 별도의 Router를 제공하지 않기 때문에 react-router라는 라이브러리릍 통해 구현한다.

Next.js의 Router는 file-system 기반이다. 즉, file을 만들면 그것이 즉각적으로 router로 인지되어 주소와 매핑된다.

## 👏 file-system ?

```
⭐️ app 폴더 내부의 모든 파일은 자동으로 라우트로 생성되며
   파일 이름과 구조에 따라 URL 경로가 결정!
```

```
⭐️ app/auth/login/page.tsx → '/auth/login' 주소가 된다!
```

위와 같이 폴더에 폴더를 만들면 이는 곧 자동 라우팅이 된다. 이를 **[Nested routes](https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts#nested-routes)** 라고도 한다.

이를 응용해 보았을 때, /auth/forget-password 페이지를 만들고 싶다면 아래와 같이 폴더를 만들어주면 된다.

```
/auth/forget-password/page.tsx
```

## 👏 NextJS의 특별한 네이밍 규칙

위에서 살펴보았을 때 `page.tsx`로 파일을 생성한 것을 보아 짐작할 수 있는 것처럼, NextJS에서는 특별한 네이밍 규칙을 가지고 있다.

```
- layout: 세그먼트와 그 자식들에 대한 공유 UI
- page: 라우트의 고유한 UI를 만들고 공개적으로 접근 가능하게 만듭니다
- loading: 세그먼트와 그 자식들에 대한 로딩 UI
- not-found: 세그먼트와 그 자식들에 대한 찾을 수 없는 UI
- error: 세그먼트와 그 자식들에 대한 에러 UI
- global-error: 글로벌 에러 UI
- route: 서버 측 API 엔드포인트
- template: 특별하게 다시 렌더링된 레이아웃 UI
- default: 병렬 라우트에 대한 대체 UI
```

마찬가지로, NextJS에서 정해놓은 네이밍에 맞게 지어준다면 라우팅에 포함하지 않고 사용자 파일로 사용하는 것도 가능하다.

```
⭐️ 사용자의 파일(ex. 컴포넌트, 스타일, 테스트 등)을 배치할 수 있다.
→ 라우팅에 포함되지 않으면서 사용할 수 있는!
→ 간단하게는 폴더명 앞에 언더바를 붙이면 라우팅에 포함하지 않을 수 있다.
```

<p align="center"><img src="https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fproject-organization-colocation.png&w=1920&q=75&dpl=dpl_3C8Kb6pPJZpnohJenfLLhaAtGpFy" /></p>

## 👏 params와 query-string 사용하기 - useRouter

### 1. params - slug 이용!

```
⭐️ [slug]를 이용해보자!
```

이와 같은 방법을 [Dynamic Routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)라고 한다.

우리는 React에서 `params`를 사용하기 위해 `/:params`와 같이 해주었었는데, NextJS에서는 폴더를 다음과 같이 만들어주면 된다.

<p align="center"><img src="https://github.com/mobi-community/mobi-path-nextjs/assets/112946860/8044fce8-80a2-4f1e-a993-5d77c6699d96" width="50%"/></p>

괄호 안에 들어가는 키워드는 params의 이름이 된다.

#### 🤔 params 값을 읽고 싶을 땐?

```tsx
interface Props {
  params: {
    id: string
  }
}

const PostPage = ({ params }: Props) => {
  const { id } = params
  return <div>post: {id}</div>
}

export default PostPage
```

위와 같이 props를 통해 `params`를 받을 수 있다. 실제로 아래와 같은 경로로 이동했을 때 잘 받아졌다.

<p align="center"><img src="https://github.com/mobi-community/mobi-path-nextjs/assets/112946860/a0c28da9-065e-458a-b2be-6594e76c7e97" width="50%" /></p>

### 2. queryString - useSearchParams

```tsx
'use client'

import { useSearchParams } from 'next/navigation'

const PostPage = () => {
  const searchParams = useSearchParams()
  const category = searchParams.get('category')

  return <div>category: {category}</div>
}

export default PostPage
```

위와 같이 `useSearchParams()` 훅을 사용하면 된다.

`params`와 `queryString`을 함께 사용하면 아래와 같은 코드와 화면이 된다.

```tsx
'use client'

import { useSearchParams } from 'next/navigation'

interface Props {
  params: {
    id: string
  }
}

const PostPage = ({ params }: Props) => {
  const { id } = params
  const searchParams = useSearchParams()
  const category = searchParams.get('category')

  return (
    <>
      <div>post: {id}</div>
      <div>category: {category}</div>
    </>
  )
}

export default PostPage
```

<p align="center"><img src="https://github.com/mobi-community/mobi-path-nextjs/assets/112946860/2a9b5803-8d1a-49d4-acb0-7b5baed04213" width="60%"/></p>

# 참고

- [Next.js 페이지와 라우팅](https://wikidocs.net/197683)
- [Next.js - Dynamic Routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)
- [Next.js - useSearchParams](https://nextjs.org/docs/app/api-reference/functions/use-search-params)
