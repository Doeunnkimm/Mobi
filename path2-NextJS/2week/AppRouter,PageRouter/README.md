# App Router와 Pages Router

nextJS 13.4v부터 appRouting을 지원한다.기존에 있던 PageRouter와 AppRouter의 차이와 AppRouter에서 지원하는 File Convention의 종류와 활용도에 대해서 정의해 보자.

## Pages Router의 특징

### 1. routing

pages routing은 다음과 같이 이루어진다.

- `pages/test/index.tsx` -> /test에 라우팅
- `pages/test/hello.tsx` -> /test/hello에 라우팅
- `pages/test/[id].tsx` -> /test/~ 에 라우팅
- `pages/test/[...slug].tsx` -> /test/~, /test/~/~ .. 등에 라우팅

### 2. 기본적으로 CSR + getStaticProps, getServerSideProps

Pages Router에서는 기본 컴포넌트는 **CSR**이 된다. 여기서 **SSR**이나 **SSG**로 컴포넌트를 렌더하고 싶다면, 추가로 `getStaticProps`나 `getServerSideProps`를 사용해야 한다.

```tsx
export async function getStaticProps() {
    return {
        props: { time: new Date().toISOString() },
    };
}

export default function Foo({ time }) {
    return (

    )
}
```

```tsx
export async function getServerSideProps() {
  return {
    props: { time: new Date().toISOString() },
  }
}

export default function Foo({ time }) {
  return (
    ...
  )
}
```

### 3. { useRouter } from 'next/router'

Pages Router에서는 useRouter를 next/router에서 가져오기를 한다. 이 router에는 라우트 이동, 현재 라우트 주소, searchParam 값 가져오기 등 여러 기능을 포함한다.

```tsx
import { useRouter } from 'next/router'

export default function Push() {
  // 라우터 가져오기
  const router = useRouter()

  // 클릭시 "/" 경로로 이동하는 버튼
  return (
    <input
      type='button'
      onClick={() => router.push('/')}
    />
  )
}
```

## App Router의 특징

### 1. routing

app routing은 다음과 같이 이루어진다.

- `app/test/page.tsx` -> /test에 라우팅
- `app/test/hello/page.tsx` -> /test/hello에 라우팅
- `app/test/[id]/page.tsx` -> /test/~ 에 라우팅
- `app/test/[...slug]/page.tsx` -> /test/~, /test/~/~ .. 등에 라우팅

### 2. 😎 Next.js에서 정해준 File Convention

Next.js에서는 File 이름에 대해 컨벤션을 정해놓았다. 해당 이름으로 파일을 생성한 경우 그 이름에 맞는 기능을 편하게 사용할 수 있다.

> 친절한 [공식 문서](https://nextjs.org/docs/app/api-reference/file-conventions) ✨

- 기본 라우팅에 대해 - `page.tsx`
- 레이아웃에 대해 - `layout.tsx`
- 로딩 UI 담당 - `loading.tsx`
- 에러 UI 담당 - `error.tsx`
- 존재하지 않는 라우팅에 대해 - `not-found.tsx`
- custom 요청 핸들러에 대해 - `route.tsx`

### 3. 간편한 Multiple Layout

App router에서는 `layout.tsx`가 존재한다.

```
⭐️ Next.js 13 app router 에서는 nested layout 구조이기 때문에,
   각 페이지마다 layout.tsx를 만들어주어도
   → 메인 레이아웃이 그 다른 레이아웃을을 감싸는 구조가 된다.
```

즉 라우팅을 위해 폴더를 만들었을 때, 거기 안에서도 `layout.tsx`를 생성해주고 구성을 하면 경로에 존재하는 `layout.tsx`와 중첩되어 레이아웃이 구성되게 된다.

```
app
 | - layout.tsx ✔️
 | - page.tsx
 |
 | - hello
       | - layout.tsx ✔️
       | - page.tsx
```

#### 😂 pages router에서는 `layout.tsx`이라는 컨벤션이 없어요

그렇기 때문에 Layout 컴포넌트를 선언해 주고 일일이 감싸주어야 한다.

```tsx
import Layout from '../components/layout'

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
```

### 4. 기본적으로 SSG + Server / Client Component

> 친절한 [공식 문서](https://nextjs.org/docs/app/building-your-application/rendering) ✨

- App Router가 되면서 Server Component와 Client Component 개념이 등장했다.
- 이전과 SSG, SSR, CSR 개념은 동일하지만, 기본적으로 **SSG**가 되고, `"use client"`로 CSR로 제공할 수 있도록 하는 것에서 차이점이 있다.

**서버 컴포넌트**

- 서버에서 직접 데이터 가져오기
- 보안에 민감한 정보에 안전하게 접근
- 렌더링에 필요한 라이브러리를 번들에 포함하지 않음으로써 JS 사이즈 줄이기

**클라이언트 컴포넌트**

- onClick, onChange와 같은 이벤트 리스너
- useState, useReducer, useEffect와 같은 상태와 생명주기
- browser에서 사용할 수 있는 api
- state, effect, brower api를 사용하는 커스텀 훅

### 5. { useRouter } from 'next/navigation'

- App Router에서는 useRouter를 next/navigation에서 가져오기를 한다.
- Pages Router에서는 useRouter가 라우트 이동, 지금 라우트 주소 가져오기, searchParams 값 가져오기 등 여러 기능을 포함했었다.
- App Router에서는 `useRouter`, `usePathname`, `useParams`, `useSearchParams` 등으로 각 기능에 맞게 분리되었다.

## 🤔 엇 그러면 App Router로 당장 옮기거나 사용해야겠다 ?

아직은 Stable 하지 못하다는 의견이 많은 것 같다. 듣기로도 App Router로 사용했을 때 문제점들이 생각보다 많다고 하며 그래도 해결책이 아예 없는 것은 아니라 타파해(?) 나아가는 것도 가능하다.

그렇지만, 안정적으로 진행하고 싶다면 (아직까지는) pages router를 사용하는 것이 좋을 것 같다.

그래도 앞으로 Next.js는 빠르게 안정적이게 되도록 업데이트하지 않을까?

# @reference

- [Next.js 13 master course - routing 2](https://velog.io/@jay/Next.js-13-master-course-routing-2)
- [5 Lessons Learned From Taking Next.js App Router to Production](https://www.inngest.com/blog/5-lessons-learned-from-taking-next-js-app-router-to-production)
- [[Next JS] Pages Router 에서 App Router 전환기](https://www.timegambit.com/blog/blog-log/app-router)
