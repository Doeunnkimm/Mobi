# NextJS에서 CSR을 구현하려면

Next.js에서는 서버에서 pre-rendering을 하고 클라이언트에서 hydration되게 되는데요. 특히 hook를 사용하면 CSR을 사용해야 하는 이유에 대해 알아보고, CSR을 구현하는 방법에 대해서도 알아봅시다.

## 🤔 CSR을 구현한다?

```
⭐️ hook 함수를 사용하면 CSR를 사용해야 한다.
```

```
hook 함수는 상태 관리를 위한 React의 상태 관리 기법입니다.
이는 곧, 페이지가 렌더링 된 후에 데이터를 가져오기 때문에 SSR이 아닌 CSR을 사용해야 합니다.

→ hook 함수 사용이 필요한 컴포넌트를 자식으로 보내어 CSR 범위를 줄일 수 있다.
```

## 🤔 'use client'

```
⭐️ 'use client'가 있으면 클라이언트 컴포넌트
                 없으면 서버 컴포넌트

→ 'use client'를 붙이면 클라이언트 번들의 일부로 간주
```

### 🌚 서버 컴포넌트 ?

```
⭐️ 서버에서 렌더되고 요청되는 컴포넌트들
⭐️ 기본적으로, Next.js에서 컴포넌트들은 서버 컴포넌트이다.
```

#### 리액트 서버 컴포넌트들의 특징

- onClick 같은 상호작용을 포함하지 않는다.
- fallback과 함수들은 props로 전달될 수 없다.
- 상호작용하지 않으며, React state를 포함하지 않는다.
- 생명주기 hook을 포함하지 않는다.

### 🌝 클라이언트 컴포넌트 ?

```
⭐️ 클라이언트 측에서 렌더되고 fetch되는 컴포넌트들
```

#### 클라이언트 컴포넌트들의 특징

- onClick과 같은 상호작용을 포함한다.
- 클라이언트라고 불리는 브라우저에서 렌더된다.
- 'use client'라고 선언함으로써 그들이 클라이언트 컴포넌트인 것을 나타낸다.
- useState, useEffect와 같은 리액트 hooks를 사용할 계획이 있다면, 클라이언트 컴포넌트에서 사용해야 한다.

# 참고

- [Next.js - Client Side Rendering (CSR)](https://nextjs.org/docs/pages/building-your-application/rendering/client-side-rendering)
- [Next.js - React Essential](https://nextjs.org/docs/getting-started/react-essentials)
- [Nextjs data Fetching 이해하기(CSR, SSR, SSG, ISR)](https://www.philly.im/blog/grokking-data-fetching-in-nextjs)
- [[Next.js]Next.js 13 - Data Fetching, Server Components](https://ahnanne.tistory.com/92)
