# 3.typescript react project를 생성하여 init + vite✨

vite를 이용해 project를 init했습니다. 먼저 init하는 방법을 간단하게 알아보고 vite에 대해서 알아봅시다.

## 🤔 프로젝트 생성

```bash
$ yarn create vite [프로젝트 명] --template react-ts
```

## 🤔 실행해보기

```bash
$ yarn install
```

```bash
$ yarn dev
```

위 명령어를 통해 실행하게 되면 터미널에 뜨게 되는 `localhost:5173`을 확인하고 브라우저를 통해 접속하게 되면 아래와 같은 화면이 나오게 됩니다.

<p align="center"><img src="https://github.com/Doeunnkimm/Frontend/assets/112946860/33dbf949-29d6-4208-acca-277c18cfa812" width="70%"/></p>

## 🤔 Vite

> 🔥 [공식문서](https://ko.vitejs.dev/)

비트(Vite, 프랑스어로 빠름이라는 뜻..!)는 node.js 기반의 Vue 개발을 위한 스캐폴딩(scaffolding) 도구입니다. Vite는 Vue 뿐만 아니라 대부분의 프론트엔드 프레임워크를 지원합니다.

### 스캐폴딩(scaffolding)

개발 프로세스를 보다 쉽고 빠르게 시작할 수 있도록 기본적인 코드 구조, 디렉토리 구조, 파일 시스템 등을 자동으로 생성해주는 도구나 프레임워크를 말합니다. 덕분에 개발자는 새로운 프로젝트를 시작할 때 모든 것을 일일이 설정하고 구축하는 번거로움을 피할 수 있도록 도와줍니다.

`Create React App(CRA)` 역시도 React 애플리케이션을 위한 스캐폴딩 도구입니다.

### Vite는 번들링하지 않고 ESM 방식을 사용합니다

비트는 자바스크립트 네이티브 모듈(ESM)을 기반으로 한 데브 서버입니다. 비트는 로컬에서 개발을 할 때 번들링을 하지 않고 ESM 방식을 사용하기 때문에 로컬 서버 구동 속도가 매우 빠릅니다.

```
500개 정도 되는 모듈을 갖고 있는 웹 서비스를 웹팩 데브 서버와 비트로 비교해 본다면
실행 시간이 20~30배 이상 차이가 난다고 합니다.
```

웹팩 데브 서버는 처음 로컬 서버를 시작할 때 관련 있는 모듈들을 번들링 해서 메모리에 적재하는 시간이 필요하기 때문에 어느 정도의 시간이 필요합니다. 반면 비트는 번들링을 하지 않고 바로 서버를 실행하기 때문에 명령어를 실행함과 동시에 서버가 바로 구동됩니다.

#### 자바스크립트 네이티브 모듈(ESM)

ESM은 모듈화 문법인 `import`, `export`를 별도의 도구 없이 브라우저 자체에서 소화해 낼 수 있는 모듈 방식을 말합니다. 만약 아래와 같은 코드를 웹팩과 같은 번들러 없이 브라우저에서 실행하면 에러가 발생합니다.

app.js

```js
import { sum } from './math.js'

console.log(sum(10, 20))
```

```html
<script src="./app.js"></script>
```

<p align="center"><img src="https://github.com/Doeunnkimm/Frontend/assets/112946860/09ca5f25-fe46-4dbd-adeb-71f91d9a7a94" /></p>

기존의 브라우저에서는 `import`와 `export`를 해석할 수 있는 능력이 없었습니다. 하지만 이제는 `script` 태그에 아래와 같이 `type="module"` 속성을 추가하면 정상 동작하는 것을 볼 수 있습니다.

```html
<script
  type="module"
  src="./app.js"></script>
```

브라우저에서 `import`와 `export`를 소화할 수 있는 능력이 바로 ESM입니다.

#### 브라우저에서 ESM을 지원하기 전이 있었습니다

브라우저에서 ESM(ES Module)을 지원하기 전까지, JavaScript 모듈화를 언어 레벨에서 진행할 수 없었습니다. 그래서 소스 모듈을 브라우저에서 실행할 수 있는 파일로 크롤링, 처리 및 연결하는 "번들링(Bundling)"이라는 해결 방법을 사용해야 했습니다.

이 번들링을 해주는 도구로는 `Webpack`이 가장 대표적으로, 이런 번들링 작업을 진행해줌으로써 프론트엔드 개발자의 생산성을 크게 향상시켰습니다. 파일 단위로도 코드를 관리할 수 있으니까요.

#### 지루할 정도로 긴 서버 구동

번들러 기반의 도구의 애플리케이션 내 모든 소스 코드에 대해 크롤링 및 빌드 작업을 마쳐야지만이 실제 페이지를 제공할 수 있습니다.

#### Vite는 개발 서버의 시작 시간을 개선합니다

Vite는 애플리케이션의 모듈을 `dependencies`와 `source code` 두 가지 카테고리로 나누어 개발 서버의 시작 시간을 개선합니다.

**Dependencies**

```
- 사전 번들링 기능은 Esbuild를 사용
- Go로 작성된 Esbuild는 Webpack과 같은 기존 번들러 대비 10-100배 빠른 속도를 제공
```

> [Esbuild](https://esbuild.github.io/)

**Source code**

```
- Native ESM을 이용해 소스 코드를 제공
- 브라우저가 요청하는 대로 소스 코드를 변환하고 제공하기만 하면 된다.
```

<p align="center"><img width="689" alt="image" src="https://github.com/Doeunnkimm/Frontend/assets/112946860/4e0fd39a-6b74-4562-9319-44adc60c7f57"></p>

<p align="center"><img width="688" alt="image" src="https://github.com/Doeunnkimm/Frontend/assets/112946860/6aaf39ed-73e9-4245-ad53-83c60ddd7672"></p>

## 😨 아직 ESM 방식을 사용하게 되면 왜 번들링을 안 해도 되는지 모르겠다 알아보자

### 🤔 type="module"이 뭘 어쩌길래

#### Module

```
- 개발하는 웹의 크기가 커지면 파일을 여러 개로 분리해야할 수 있는데
  이때 분리된 파일 각각을 "Module"이라고 부른다.
- 모듈에 export, import를 적용하면 다른 모듈을 불러올 수 있다.
```

#### <script type="module">의 특징

```
- <script type="module">을 통해 해당 스크립트가 모듈인 것을 알 수 있도록 한다.
- 모듈 각각을 필요할 때마다 불러온다.
- 즉, 필요한 모듈만 동적으로 로드하므로 초기 로딩 속도가 개선된 것
- 모듈을 찾는 것은 브라우저에서 처리
```

#### 번들링과의 차이점

🔎 번들링
```
production 빌드에서 로딩 속도와 네트워크 요청 횟수를 최적화 하는데 도움
```
🔎 script type="module"
```
모듈을 찾는 것은 개발 환경에서 빠른 개발 속도와 변경 사항 반영에 유용
```

### ❓ 그럼 Vite는 프로덕션 환경에서 빌드는 어떻게 하는건가

🔎 개발 환경
```
빠른 개발 속도 제공
```
🔎 프로덕션 환경
```
빌드 시에는 Roullup(모듈 번들러)을 이용하여 번들링 수행
```

### 🤔 CRA는 CommonJS 기반의 방법이라는데 CommonJS가 뭐길래

🔎 CRA
```
CommonJS 방식
```
🔎 Vite
```
ES 모듈 방식
```

#### node.js에서 사용하는 모듈 시스템

```
node.js에서 사용하는 모듈 시스템에는
- commonJS
- ES 모듈
```

#### 그래서 CRA일 때랑 Vite일 때와 env 파일 불러오는 방법이 다른 것이다

CRA에서와 Vite에서와의 모듈 시스템 자체가 다르니 env 파일을 불러오는 방법에서부터 차이가 존재한다.

🔎 CRA에서는
```
process.env.
```
🔎 Vite에서는
```
import.meta.env.
```
