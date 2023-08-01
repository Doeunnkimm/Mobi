# 🍝 스파게티 코드 리팩터링

- 커스텀 훅을 활용한 느슨한 관계 만들기
- 재사용 가능하고, 복잡한 상태의 변화를 useReducer로 관리하기
- 전역 상태 관리를 통한 프롭스 드릴링 해결 및 관심사 분리

## 🤔 무엇을 왜 분리했나요?

### 📄 App.js

`App.js` 파일은 초기화 로직을 컨트롤하는 역할입니다. 어떤 것이 초기화를 위해 주입되었는지를 확인하는 것 이외의 것은 분리하였습니다.

#### 1. router

`routing` 설정 관련 로직은 `/routes/routing.js`로 관심사 분리했습니다.

🧶 [commit log](https://github.com/Doeunnkimm/Mobi/commit/2ededcd618a028d3530b34dd5ad887d548730764)

---

### 📄 Home.jsx

Home 컴포넌트는 View 로직을 위한 컴포넌트입니다. View 역할에 충실할 수 있도록 이외의 의존성을 분리하려고 합니다.


#### 1. api 요청

어떤 url에 무슨 param을 요청을 보낸다라는 내용의 로직은 `apis` 폴더에 분리해 주었습니다.

🧶 [commit log](https://github.com/Doeunnkimm/Mobi/commit/204511a7ecb555a0eebc72054de53aac6e631f06)

---

#### 2. fetching 부분

컴포넌트 안에서 길어지는 `try-catch`문을 관심사 분리하기 위해 그리고 앞으로도 작성하게 될 fetching 부분들을 간편하게 사용하기 위해 hook함수를 정의했습니다.

덕분에 fetch data의 상태를 쉽게 관리할 수 있었고, 길어지는 try-catch문을 분리할 수 있었습니다.

🧶 [commit log](https://github.com/Doeunnkimm/Mobi/commit/3f76871f5aa4aa382d3b1d083cd03b6d22191fa6)

---

#### 3. userName에 따라 setBlurred하는 부분

`localStorage`에 값이 있느냐 없느냐에 따라 상태값을 업데이트해주면 되는 로직이라 다음과 같이 코드를 줄여주었습니다.

🧶 [commit log](https://github.com/Doeunnkimm/Mobi/commit/5db46c6a0e2b22e83a6bac4013f5b64d4b48989d)

---

#### 4. 이름 입력하는 form 컴포넌트로 분리

`Home.jsx`에는 `isBackGroundBlur`의 값에 따라 다른 컴포넌트를 보여줍니다. 색깔이 다른 로직이라는 생각이 들어 구분하여 빠르게 관련된 이벤트 함수까지 파악할 수 있도록 분리했습니다.

isBackGroundBlur가 true일 때는 `onSubmit`만 사용되고, false일 때는 `onPressNavigateBlog`만 사용되어 구분해두면 각 컴포넌트에서 사용되는 이벤트 함수임을 빠르고 정확하게 파악할 수 있을 것이라고 생각했습니다.

🧶 [commit log](https://github.com/Doeunnkimm/Mobi/commit/5db46c6a0e2b22e83a6bac4013f5b64d4b48989d)

---

### 📄 Post.Detail.jsx

이번에도 View 로직에 집중하여 이외의 로직들은 관심사 분리해줍니다.

#### 1. Data Fetching 부분

앞서 훅 함수화 해두었던 useFetch를 통해 Data Fetching 하는 부분을 리팩터링해줍니다.

이전 useFetch에서 params를 받는 것을 고려해주지 못해 `useFetch`를 수정해주었습니다.

🧶 [commit log](https://github.com/Doeunnkimm/Mobi/commit/5d98700d24bc8036e3d5356e4d277afa1ca950a5)

---

#### 2. 댓글 보이기/숨기기 관련 onClick 이벤트 함수 - useToggle

중복되는 코드가 있어 리팩토링 해주었습니다. 또한 프로젝트를 진행한다고 했을 때 아래 코드처럼 onClick 했을 시 open/close를 제어할 일이 많을 수 있다고 생각들어 연습 겸.. useToggle() 이라는 훅 함수를 만들어서 주입해 주었습니다.

🧶 [commit log](https://github.com/Doeunnkimm/Mobi/commit/b419425585fbc52a4e54fac821235b5aaaf69fd6)

---

#### 3. CommentList 컴포넌트 분리 및 버튼 렌더링 리팩터링

댓글 목록은 버튼이 눌렸을 때만 렌더링되는 요소이므로 `Post.Detail` 컴포넌트와는 분리하여 자식 컴포넌트로 만들어주었습니다.

그리고 버튼은 `isOpenCommentList` boolean 값에 따라 텍스트만 바뀌므로 리팩터링을 해주었습니다.

🧶 [commit log](https://github.com/Doeunnkimm/Mobi/commit/da4274090e7f1053ec51a11692e64246b78d0cbb)

---

### 📄 Post.List.jsx

#### 1. Data Fetching 부분

위에서 했던 것과 동일하게 `useFetch` 커스텀 훅을 통해 Data Fetching 부분을 관심사 분리합니다.

🧶 [commit log](https://github.com/Doeunnkimm/Mobi/commit/d0683a721c12a73a0249614449670c1eb9446bc0)

---

### ⚙️ Diglog 관련

#### 1. useReducer 도입
기존에는 provider의 value로 포함되어 있던 setState를 통해 dialog의 상태를 관리했습니다. 때문에 복잡한 dialog의 상태를 업데이트하기 위해서 복잡한 코드를 작성해야 했습니다.

dialog

```js
const initialDialogAttr = {
	type: DialLogState.ALERT,
	text: '',
	isOpen: false,
	onConfirm: () => {},
	onCancel: () => {},
	position: {
		x: 50,
		y: 10,
	},
}
```

이를 원하는대로 업데이트하고 싶다면 아래와 같이 set함수를 사용해야 했습니다.

```js
setDiaLogAttribute({
			type: DialLogState.ALERT,
			text: '정말로 페이지를 이동하겠습니까',
			isOpen: true,
			onConfirm: async () => {
				await setDiaLogAttribute({ isOpen: false })
				window.location.href = '/posts'
			},
		})
```

위와 같이 복잡하게 상태 업데이트하는 로직을 보완하기 위해 `useReducer`를 도입했습니다.

제가 useReducer를 사용한 이유는 위 코드에서 보이는 복잡한 상태 업데이트 로직을 컴포넌트로부터 분리하고 로직 자체를 재사용하기 위함이였습니다.

대표적으로 `moveTo`를 통해 url만을 payload로 받아 dialog의 확인 버튼을 누르면 이동할 수 있도록 reducer의 case를 하나 작성했습니다.

첫 번째 관련 커밋 : 🧶 [commit log](https://github.com/Doeunnkimm/Mobi/commit/c7037b8b317aa1e26830133c2b95f5b015af9bdb)  <br>
두 번째 관련 커밋 : 🧶 [commit log](https://github.com/Doeunnkimm/Mobi/commit/8368a5e3705f280f88e40c166f0bb70102a1198b)

---

#### 2. useDialog
로직에 큰 변화는 없지만 보다 간편하게 사용될 수 있다고 생각이 들어 도입을 결정했습니다. 기존에는 dispatch를 통해 상태 업데이트를 하기위해서는 아래와 같이 작성해주어야 했습니다.

```js
dispatch(MOVE_TO_DIALOG({ url: '/posts' }))
```

useDialog에서는 위 로직을 이미 담고 있어 사용할 때는 보다 편하게 사용할 수 있었습니다.

```js
const dialog = useDialog()

dialog.moveTo({ url: '/posts' })
```

🧶 [commit log](https://github.com/Doeunnkimm/Mobi/commit/ffb79387c8be54525fffe773a32dae285d2b8e74)

---

**🔥 useState & useReducer에 대해**

두 hook 모두 상태를 관리한다는 점에서는 공통점을 가집니다.

다만, 복잡한 state를 다뤄야할 때 useReducer를 사용하면 코드를 좀 더 간결하고 유지보수하기 쉽습니다.

왜냐하면, useReducer를 사용하게 되었을 때, Reducer는 dispatch를 통해 action을 전달받고, 해당 **내용에 따라 상태를 업데이트**합니다. 이때 action의 내용에 따라 **Reducer가 state 업데이트를 처리**해주기 때문에 상태 업데이트가 필요할 때 **복잡한 상태 업데이트 로직을 직접 작성해 주지 않아도** 됩니다.

따라서 useReducer는 상태를 업데이트하는 로직을 컴포넌트로부터 분리할 수 있어, **상태 관리가 용이**해지고 **재사용성이 증가**된다는 장점이 있습니다.

보통의 경우 useState를 사용해도 좋지만, 상태와 업데이트 로직이 길어진다면 점진적으로 useReducer를 고려해 보아도 좋다고 합니다. 단순하게 시작하고 필요한 경우에 추가를 하는 것이 좋겠습니다.

---

## 🔥🤔 추가 리팩터링한 내용

### Pagination

#### 1. Pagination 내부에서 fetch ❌

Pagination을 사용하고 있는 컴포넌트에서 이미 fetch를 하고 있다. params로 page만 넘겨받으면 되기 때문에 한번더 Pagination 내부에서도 fetch를 할 필요가 없습니다.

🧶 [commit log](https://github.com/Doeunnkimm/Mobi/commit/4ecebfdb08b8a62d4c327aa0c6ed70426aa3f289)

---

### useFetch

#### 1. params의 내용이 달라졌을 때 다시 fetch

`useFetch`를 통해 전달받는 params의 내용이 달라지면 새로운 데이터를 원한다는 의미와 같은데, 이전에는 새로 fetch를 하지 못했습니다. 그래서 params를 의존성 배열에 그대로 넣었더니 무한 렌더링 문제가 발생했습니다. 때문에 params 자체를 JSON.stringify하여 의존성 배열에 넣어주어 달라지는 params에 따라 새로 fetch할 수 있도록 로직을 수정해 주었습니다.

🧶 [commit log](https://github.com/Doeunnkimm/Mobi/commit/5fd7cf95ba85040e48f80a7ab6fe11a3c73691a3) 

---

### env
Vite의 경우 ESM 방식으로 모듈을 찾기 때문에 CRA 때와는 다른 방법으로 env 파일을 인식해야 했고, env 파일에서도 인식할 수 있도록 반드시 지켜야하는 이름 규칙도 달랐습니다.

```
CRA: process.env. + REACT_APP_
Vite: import.meta.env. + VITE_APP_
```

🧶 [commit log](https://github.com/Doeunnkimm/Mobi/commit/79934d0eb05a1a637728198c55f07360518320a4)
