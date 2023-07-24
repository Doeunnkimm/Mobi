# 🍝 스파게티 코드 리팩터링

- 커스텀 훅을 활용한 느슨한 관계 만들기
- 재사용 가능하고, 복잡한 상태의 변화를 useReducer로 관리하기
- 전역 상태 관리를 통한 프롭스 드릴링 해결 및 관심사 분리

## 🤔 무엇을 왜 분리했나요?

### 📄 App.js

`App.js` 파일은 초기화 로직을 컨트롤하는 역할입니다. 어떤 것이 초기화를 위해 주입되었는지를 확인하는 것 이외의 것은 분리하였습니다.

#### 1. router

`routing` 설정 관련 로직은 `/routes/routing.js`로 관심사 분리했습니다.

before

```jsx
// App.js
function App() {
	const router = createBrowserRouter([
		{ path: '/', element: <HomePage /> },
		{ path: '/posts', element: <PostListPage /> },
		{ path: '/post-detail/:postId', element: <PostDetailPage /> },
	])

	return (
		<DiaLogProvider>
			<RouterProvider router={router} />
		</DiaLogProvider>
	)
}
```

after

```jsx
// /routes/routing.jsx
const router = createBrowserRouter([
	{ path: '/', element: <HomePage /> },
	{ path: '/posts', element: <PostListPage /> },
	{ path: '/post-detail/:postId', element: <PostDetailPage /> },
])

// App.jsx
function App() {
	return (
		<DiaLogProvider>
			<RouterProvider router={router} />
		</DiaLogProvider>
	)
}
```
