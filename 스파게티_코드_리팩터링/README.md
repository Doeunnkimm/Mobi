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

#### 3. userName에 따라 setBlurred하는 부분

`localStorage`에 값이 있느냐 없느냐에 따라 상태값을 업데이트해주면 되는 로직이라 다음과 같이 코드를 줄여주었습니다.

before

```jsx
useEffect(() => {
	const userName = localStorage.getItem('userName')
	if (!userName) {
		return setIsBackGroundBlur(true)
	} else setIsBackGroundBlur(false)
}, [])
```

after

```jsx
useEffect(() => {
	const isHaveUserName = !!localStorage.getItem('userName') // boolean
	setIsBackGroundBlur(!isHaveUserName)
}, [])
```

#### 4. 이름 입력하는 form 컴포넌트로 분리

`Home.jsx`에는 `isBackGroundBlur`의 값에 따라 다른 컴포넌트를 보여줍니다. 색깔이 다른 로직이라는 생각이 들어 구분하여 빠르게 관련된 이벤트 함수까지 파악할 수 있도록 분리했습니다.

isBackGroundBlur가 true일 때는 `onSubmit`만 사용되고, false일 때는 `onPressNavigateBlog`만 사용되어 구분해두면 각 컴포넌트에서 사용되는 이벤트 함수임을 빠르고 정확하게 파악할 수 있을 것이라고 생각했습니다.

```jsx
// /Home/components/NameForm.jsx
const NameForm = ({ setBlurred }) => {
	const onSubmit = e => {
		// ...
	}

	return (
		<S.BlurBackGround>
			<S.UserNameForm onSubmit={onSubmit}>
				<input type="text" name="userName" placeholder="Enter your name" />
				<button type="submit">Submit</button>
			</S.UserNameForm>
		</S.BlurBackGround>
	)
}

// /Home/Home.jsx
const HomePage = () => {
	...
	return (
		<>
			{isBackGroundBlur && <NameForm setBlurred={setIsBackGroundBlur} />}
			<div>
				...
			</div>
		</>
	)
}
```

### 📄 Post.Detail.jsx

이번에도 View 로직에 집중하여 이외의 로직들은 관심사 분리해줍니다.

#### 1. Data Fetching 부분

앞서 훅 함수화 해두었던 useFetch를 통해 Data Fetching 하는 부분을 리팩터링해줍니다.

이전 useFetch에서 params를 받는 것을 고려해주지 못해 `useFetch`를 수정해주었습니다.

useFetch

```jsx
const useFetch = (fetching, params) => {
	...

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetching({ params })
				...
			} catch (err) {
				...
			}
		}
		...
	}, [fetching])
	...
}
```

수정해준 `useFetch`를 통해 `Post.Detail.jsx`에 있는 Data Fetching 관려 로직을 리팩터링 해봅시다.

```jsx
const PostDetailPage = () => {
	...
	const { data: postDetail, loading } = useFetch(postApi.getPostDetail)
	const { data: commentResponse } = useFetch(postApi.getComment, {
		take: params.get('take') ?? LIMIT_TAKE,
	})
	const commentList = commentResponse?.Comment
}
```

#### 2. 댓글 보이기/숨기기 관련 onClick 이벤트 함수 - 중복된 코드

중복되는 코드가 있어 리팩토링 해주었습니다.

before

```jsx
const onClickMoreComments = async () => {
	setIsOpenCommentList(true)
}

const onClickHiddenComments = () => {
	setIsOpenCommentList(false)
}
```

after

```jsx
const onClickToggleComments = () => {
	setIsOpenCommentList(prev => !prev)
}
```
