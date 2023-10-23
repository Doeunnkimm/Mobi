# SSR에서 웹 스토리지를 사용하려면

SSR(서버 사이드 렌더링) 환경에서는 서버에서 미리 렌더링을 한 후 클라이언트에게 보내주는 렌더링 과정을 거치기 때문에 클라이언트에 존재하는 웹 스토리지에 접근할 수 없습니다.

이럴 때는 어떻게 해야할까요?

```
🙌 실제로 겪었던 적이 있어 그때 정리한 내용을 적어보았습니다 :)
```

## localStorage is not defined 에러

### 에러 원인

- `CSR`과 `SSR`의 차이로 인한 에러
  Next.js는 `clinet-side`를 렌더하기 전에 `server-side` 렌더를 수행한다.
  Next.js에서 제공하는 `SSR`에선 client-side에 존재하는 **window**, **document** 같은 전역 객체를 사용할 수 없다.
  그래서 `console.log(localStorage)` 만 실행시켜도
  RefreneceError: localStorage is not defined 라는 에러가 발생한다.

### 해결 방법

1. `typeof window !== 'undefined'`

   - 페이지가 client에 마운트될 때까지 기다렸다가 localStorage에 접근해야 한다.
   - window 객체가 참조되지 않을 경우, undefined를 반환한다.

   ```jsx
   const [theme, setTheme] = useState(() => {
     typeof window !== 'undefined'
       ? localStorage.getItem('theme') === 'dark'
         ? 'dark'
         : 'light'
       : 'light'
   })
   ```

1. `useEffect`

   - useEffect는 렌더링이 되고 난 후 실행되기 때문에 server-side에서는 실행되지 않는 CSR 전용 이벤트라고 생각
   - useEffect는 렌더링 시 실행되므로, 초기 서버 빌드 시 useEffect 내부 코드는 실행 X
   - useEffect는 client-side에서만 실행되므로 localStorage에 안전하게 접근 가능

   ```jsx
   const [theme, setTheme] = useState('dark')

   useEffect(() => {
     const saveTheme = localStorage.getItem('theme')
     if (saveTheme && saveTheme === 'dark') {
       setTheme('dark')
     } else {
       setTheme('light')
     }
   }, [])
   ```
