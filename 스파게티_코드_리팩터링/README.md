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
