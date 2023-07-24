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

### 📄 Home.jsx

Home 컴포넌트는 View 로직을 위한 컴포넌트입니다. View 역할에 충실할 수 있도록 이외의 의존성을 분리하려고 합니다.

#### 1. api 요청

어떤 url에 무슨 param을 요청을 보낸다라는 내용의 로직은 `apis` 폴더에 분리해 주었습니다.

before

```jsx
// Home.jsx
const HomePage = () => {
	...
	const fetchWeather = async () => {
		try {
			const response = await axios.get('/getUltraSrtNcst', {
				baseURL: weatherConfig.api,
				params: {
					serviceKey: weatherConfig.secret_key,
					dataType: 'JSON',
					base_date: new Date()
						.toISOString()
						.substring(0, 10)
						.replace(/-/g, ''),
					base_time: '0600',
					nx: 60,
					ny: 127,
				},
			})
			setWeather(response.data.response.body.items.item)
		} catch (err) {
			console.log(err)
			throw new Error('failed load weather api')
		}
	}
}
```

after

```jsx
// /apis/weather.api.js
export const weatherApi = {
	getWeather: async () =>
		await axios.get('/getUltraSrtNcst', {
			baseURL: weatherConfig.api,
			params: {
				serviceKey: weatherConfig.secret_key,
				dataType: 'JSON',
				base_date: new Date().toISOString().substring(0, 10).replace(/-/g, ''),
				base_time: '0600',
				nx: 60,
				ny: 127,
			},
		}),
}

// Home.jsx
const HomePage = {
	...
	const fetchWeather = async () => {
		try {
			const response = await weatherApi.getWeather() // 모듈화한 함수를 호출
			setWeather(response.data.response.body.items.item)
		} catch (err) {
			console.log(err)
			throw new Error('failed load weather api')
		}
	}
}
```

#### 2. fetching 부분

컴포넌트 안에서 길어지는 `try-catch`문을 관심사 분리하기 위해 그리고 앞으로도 작성하게 될 fetching 부분들을 간편하게 사용하기 위해 hook함수를 정의했습니다.

useFetch

```jsx
const useFetch = fetching => {
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetching()
				setData(response.data)
				setLoading(false)
			} catch (err) {
				setError(err)
				setLoading(false)
			}
		}
		fetchData()
	}, [fetching])
	return { data, loading, error }
}
```

위 훅 함수를 적용하면 아래와 같습니다.

before

```jsx
const HomePage = () => {
	const [weather, setWeather] = useState()

	const fetchWeather = async () => {
		try {
			const response = await weatherApi.getWeather()
			setWeather(response.data.response.body.items.item)
		} catch (err) {
			console.log(err)
			throw new Error('failed load weather api')
		}
	}

	useEffect(() => {
		fetchWeather()
	}, [])
}
```

after

```jsx
const HomePage = () => {
	...
	const { data, loading, error } = useFetch(weatherApi.getWeather)
	const weather = data?.response.body.items.item
}
```

덕분에 fetch data의 상태를 쉽게 관리할 수 있었고, 길어지는 try-catch문을 분리할 수 있었습니다.
