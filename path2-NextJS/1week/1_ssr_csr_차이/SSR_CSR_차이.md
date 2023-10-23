# Next.js ?

Next는 CSR인 React를 SSR(Server-side Rendering) 방식으로 구현할 수 있도록 도와주는 프레임워크입니다.

## SSR과 CSR의 차이

SSR과 CSR의 렌더링 과정을 이미지와 함께 알아 보려고 합니다.
둘다 4단계로 이루어져 있습니다. 각각 몇 단계에서 화면을 볼 수 있으며, 몇 단계에서 상호작용이 가능해지는지를 생각해보면 더욱 차이점을 극명하게 알 수 있습니다 :)

### SSR(Server-side Rendering)

서버 쪽에서 렌더링 준비를 끝마친 상태로 클라이언트에게 전달하는 방식입니다.

![](https://velog.velcdn.com/images/doeunnkimm_/post/ac454333-ac22-4a8e-a57a-aa8340b3ffc8/image.png)

⭐️ 위 내용 중에서 가장 중요한 부분은 **렌더될 준비를 끝마친 상태로 HTML 응답을 클라이언트에게** 보내는 것! 그것을 가지고 브라우저는 Viewale한 페이지를 바로 렌더링합니다.

#### 🤔 브라우저가 렌더링을 바로 했다?

브라우저가 말하는 렌더링의 의미는 HTML, CSS, JS 파일을 받아와 이를 일고 파싱해서 실행한 결과물로 화면을 그려내는 과정입니다. 그러나 서버 사이드 렌더링에 있는 렌더링의 뜻은 이와는 좀 다른데요.

#### 🤔 서버 사이드에서의 렌더링

서버 사이드 렌더링에서의 렌더링은 **HTML 파일 내에 내용이 있느냐 없느냐** 입니다. **내용이 있다면, 렌더링이 된 것**입니다.
이렇게 서버는 HTML 파일 내에 내용이 모두 있으므로 브라우저는 바로 페이지를 렌더링합니다. 덕분에 사용자는 처음부터 빈화면을 보지 않을 수 있습니다.

JS는 어디있냐구요? 브라우저는 렌더 가능한 HTML을 받아 렌더링한 이후에 JS파일을 다운 받습니다. 이렇게 브라우저가 해당 파일을 실행시키면, 페이지의 상호작용까지도 가능해지는 것입니다.

물론, JS파일이 읽히기 전에 렌더링되어 보여지는 HTML이 있기 때문에 콘텐츠를 볼 수 있지만, 사이트를 조작할 수는 없습니다. 다만, 이때의 사용자 조작을 기억하고 있어 JS까지 성공적으로 컴파일 되었다면, 기억하고 있던 조작이 실행되고, 웹 페이지는 상호작용이 가능한 상태가 됩니다.

### CSR(Client-side Rendering)

SSR과 달리 렌더링이 클라이언트 쪽에서 일어납니다. 즉, 서버는 요청을 받으면 클라이언트에 HTML와 JS파일을 보내줍니다. 클라이언트는 그것을 받아 렌더링을 시작합니다.

> 📌 참고
> 처음 접속 시에는 HTML과 JS 파일이 우선적으로 보내지고, 그 후 CSS나 폰트 파일, 이미지 파일들 같은 리소스들은 추가적으로 로드됩니다.

![](https://velog.velcdn.com/images/doeunnkimm_/post/f629bda6-7633-425f-9672-a8af718ce9c1/image.png)

CSR은 마지막 4단계에서 화면을 볼 수 있고 상호작용할 수 있습니다.

그 이유는 서버가 HTML 파일을 줄 때, 렌더 준비가 되지 않은 파일이기 때문인데요. 즉 HTML 파일 안에는 아무런 내용이 없다는 것입니다. 그 내용은 JS파일을 받아 실행을 시켜야 그제서야 만들어집니다.

CRA를 해보면 `index.js` 에 `React.createElement`라는 메서드가 있습니다. 이는 JS에서 HTML 태그를 생성하는 것입니다.

특히, `index.html` 파일의 바디 태그 안에 `<div id="root"></div>`와 같이 div 태그 하나만 존재하고 안에는 아무 내용이 없습니다. 이렇게 아무 것도 없는 상태로 전달되므로 유저는 처음에 빈 화면을 보게 되는 것입니다.

그러나 이후, 브라우저가 추가적으로 JS 파일을 다운받고 실행하면 그때가 되어서야 index.js에서 root 태그를 화면에 렌더링 즉, 그려주게 되는 것입니다.

#### 🤩 아 이제 SSR의 렌더링될 준비가 된 HTML이란 것이 뭔지 알겠다

SSR은 `index.html` 파일 내에 화면에 그려내는 코드들이 이미 작성되어 있기 때문에 div 태그만 달랑 있는 CSR과 달리 브라우저가 HTML을 바로 받은 시점인 2단게에서 Viewable할 수 있는 것입니다!

### SSR, CSR 차이

#### 1. 웹 페이지의 로딩 시간

웹 페이지의 로딩의 종류는 2가지로 나누어 볼 수 있습니다.

- 첫 페이지 로딩 시간
  CSR: HTML, CSS, 모든 스크립트들을 한번에 불러온다
  SSR: 필요한 부분의 HTML과 스크립트만 불러온다.
  ⭐️ SSR이 더 빠르다

- 나머지 페이지 로딩 시간
  첫 페이지를 로딩한 후, 사이트의 다른 곳으로 이동하는 식의 동작을 가정해 봅시다.
  CSR: 이미 첫 페이지 로딩 시 나머지 부분을 구성하는 코드를 받아왔으므로 빠르다
  SSR: 첫 페이지를 로딩한 것처럼 페이지 이동 시마다 동일하게 미리 그려진 HTML 파일 보내고 그 이후에 JS 보내느 과정
  ⭐️ CSR이 더 빠르다

#### 2. SEO

검색 엔진은 자동화된 로봇인 '크롤러'로 웹 사아트를 읽어들입니다.

CSR은 최초로 불러온 HTML 파일의 내용이 비어있다고 했었죠? JS가 로드된 후에야 동적으로 root 안의 내용을 채우는 방식이었습니다.
따라서 웹 크롤러가 각 사이트를 돌아다니며 조사를 하는 상황이라고 가정하면, 최초로 웹 크롤러에게는 비어있는 root만 보여지게 되는 것이죠!

> 웹 크롤러는 정적인 HTML의 내용을 먼저 수집하여 색인한다.

반면 SSR은 애초에 서버 사이드에서 내용을 채운 상태로 클라이언트로 넘어오기 때문에 크롤러에 대응하기 용이합니다.

#### 3. 서버 자원 사용

SSR이 서버 자원을 더 많이 사용합니다. 클라이언트가 페이지를 이동한다거나 하면 우선 페이지가 그려지긴 하지만, 인터랙티브한 데이터가 필요하다면 브라우저 → 프론트 서버 → 백엔드 서버 → 데이터베이스를 거쳐 데이터를 가져온 후, 브라우저가 데이터가 그려지는 과정을 반복하게 됩니다.

매번 서버에 요청을 하기 때문에 서버 부하 문제가 발생할 수 있습니다.

## Next.js란 React 기반 프레임워크

React는 기본적으로 CSR 방식을 사용하는데, SSR을 사용하고 싶다면 개발자가 직접 환경을 구성해야 합니다.

Next.js는 직접 환경을 구성할 필요 없이, SSR, SSG을 쉽게 사용할 수 있도록 도와주는 React 기반 프레임워크입니다.

### 🤔 Next.js !== SSR

'Next.js가 SSR로 동작한다' 라고만 알고 있어 SSR의 단점을 알게 되면 Next.js에 대한 의구심이 드는데..

사실 Next.js는 <span style="color:#0C956C">SPA이며 SSG를 기본으로 사용하고, SSR을 사용</span>할 수 있습니다.

⭐️ Next.js는 기본적으로 SSG를 사용하기 때문에 빌드 시점에만 서버 사이드에서 pre-render한 파일들을 보내주고, 그 이후에는 CSR로 페이지를 이동하는 것입니다.

⭐️ SSG의 경우 매 요청마다 추가적인 리소스를 불러오는 것입니다.

결론적으로는, Next.js는 CSR을 사용하여 페이지 이동을 처리합니다. 필요한 경우에만 서버에 추가적인 데이터를 요청합니다. 따라서 SSR을 사용하더라고 페이지 이동 시마다 HTML과 JS파일을 전체적으로 다시 불러오는 것은 아미녀, 필요한 데이터의 업데이트만 수행하게 됩니다.

이를 통해 빠른 페이지 전환과 효율적인 네트워크 사용이 가능한 것입니다.

> 📌 Next.js가 가지고 있는 가장 강력한 장점은 Pre-rendering과 CSR의 장점을 모두 사용할 수 있게 해준다는 것입니다.

## Next.js는 어떻게 렌더링 되는가?

### pre-rendering

Next.js는 **모든 페이지를 미리 렌더링(pre-render)** 합니다.
→ 각 페이지의 HTML을 미리 생성해 둔다.

생성된 HTML은 해당 페이지에 필요한 최소한의 자바스크립트 코드와 연결되게 됩니다. 그 후 브라우저에 의해 페이지가 로드되면, 그때 자바스크립트 코드가 실행되어 페이지와 유저가 상호작용할 수 있게 되는 것입니다.

> 📌 HTML에 JS가 연결되는 것을 **Hydration**

![](https://velog.velcdn.com/images/doeunnkimm_/post/024ba372-bfac-48fb-90f1-20f5c8c7d9be/image.png)

Next.js에서 미리 렌더링 하는 방식은 2가지로 나뉩니다. **이 2가지는 HTML이 생성되는 시점이 다릅니다.**

1. SSG(Static-site Generation)
   빌드 타임에 HTML이 생성되어 매 요청마다 이를 재사용. 즉, 빌드 시점 이후에는 서버에게 따로 요청X
   → 데이터가 바뀌지 않는 블로그 글, 상품 정보 페이지 등에서 사용한다

2. SSR(Server-side Rendering)
   매 요청마다 HTML을 생성. 여기서의 '매 요청'은 웹 사이트의 페이지를 접속하거나 페이지를 새로고침할 때 발생하는 요청을 말한다.
   SSR 방식에서는 클라이언트의 각 요청마다 서버가 해당 페이지의 데이터와 리소스를 가져와서 HTML을 동적으로 생성
   → 최신 콘텐츠를 제공해야 할 때 사용

### 코드 뜯어보며 알아보는 Next.js 렌더링 과정

Next.js가 먼저 Server를 거친 후에 클라이언트에서 렌더링되는 것은 알겠지만... 어떤 코드들을 거쳐서 실제 브라우저에서 볼 수 있는 것일까요?

> [vercel/next.js](https://github.com/vercel/next.js)

#### 🤔 서버에서 render하고 반환하는 과정

우선 Next.js가 렌더링(→HTML에 내용을 채우는 과정)부터 알아봐야겠습니다 :)

---

1️⃣ 📄 [next.js/packages/next/src/server/render.tsx](https://github.com/vercel/next.js/blob/canary/packages/next/src/server/render.tsx)

```tsx
const renderDocument = async () => {
	// ...

    async function loadDocumentInitialProps(
      renderShell?: (
        _App: AppType,
        _Component: NextComponentType
      ) => Promise<ReactReadableStream>
    ) {
      const Body = ({ children }: { children: JSX.Element }) => {
        return inAmpMode ? children : <div id="__next">{children}</div>
      }

      // ...
      const { App: EnhancedApp, Component: EnhancedComponent } =
          enhanceComponents(options, App, Component)

      // ...
      const renderPage: RenderPage = async (
        options: ComponentsEnhancer = {}
      ): Promise<RenderPageResult> => {
         // ...
        const html = await renderToString(
          <Body>
            <AppContainerWithIsomorphicFiberStructure>
              {renderPageTree(EnhancedApp, EnhancedComponent, {
                ...props,
                router,
              })}
            </AppContainerWithIsomorphicFiberStructure>
          </Body>
        )
        return { html, head }
      }
  	  //...
      return {
        bodyResult,
        documentElement,
        head,
        headTags: [],
        styles,
      }
}
```

우선 Body라는 컴포넌트를 선언해서 `<div id="__next"></div>`를 만들어 children을 주입하고 있습니다.

실제로 next.js로 만든 웹 사이트에 들어가면 아래처럼 확인할 수 있었습니다.

<div align="center"><img src="https://velog.velcdn.com/images/doeunnkimm_/post/e0f9c216-d46e-423e-8a6e-7968ef3184bd/image.png" width="70%" /></div>

- `loadDocumentInitialProps` : 초기 페이지 렌더링에 필요한 컴포넌트들을 향상(기능적으로 확장하거나 성능을 최적화하는 과정)시키고, 페이지를 렌더링하는 데 사용하는 함수
- `renderPage` : `EnhancedApp`과 `EnhancedComponent`를 사용하여 페이지 컴포넌트를 렌더링하고, renderToString 함수를 통해 해당 페이지의 HTML을 생성.
- `loadDocumentInitialPropsreturn`의 return 값 : 페이지 렌더링 후 최종적으로 생성된 문서에 대한 다양한 정보 포함

결론적으로, `renderDocument`는 `App`과 `Component`를 통해 DOM에 필요한 다양한 정보를 return 하고 있었습니다.

---

2️⃣ 그 다음으로는, `renderDocument`가 호출되는 부분을 찾아가 보았습니다.

```tsx
const documentResult = await getTracer().trace(
  RenderSpan.renderDocument,
  {
    spanName: `render route (pages) ${renderOpts.pathname}`,
    attributes: {
      'next.route': renderOpts.pathname,
    },
  },
  async () => renderDocument()
)
```

호출하여 `documentResult`가 DOM에 대한 정보를 들고 있다고 파악했습니다.

---

3️⃣ 그 다음은, `documentResult`가 어디서에서 쓰이는지 찾아가 보았습니다.

```tsx
const htmlProps: HtmlProps = {
    __NEXT_DATA__: {
      // ...
      head: documentResult.head,
      headTags: documentResult.headTags,
      styles: documentResult.styles,
      // ...
  }

  const document = (
    <AmpStateContext.Provider value={ampState}>
      <HtmlContext.Provider value={htmlProps}>
        {documentResult.documentElement(htmlProps)}
      </HtmlContext.Provider>
    </AmpStateContext.Provider>
  )

 const documentHTML = await getTracer().trace(
    RenderSpan.renderToString,
    async () => renderToString(document)
  )

```

documentResult의 `documentElement`는 HTML 문서의 최상위 요소에 해당하는 DOM 요소 즉, `<html>`를 나타냅니다.

renderDocument 함수에서 `documentElement`는 HTML 문서의 최상위 요소에 대한 참조를 제공하므로, 필요에 따라 요소를 수정하거나 다른 작업을 수행할 수 있습니다. 예를 들어 내부에 추가적인 메타데이터를 추가할 수도 있겠죠?

결론적으로, DOM을 구성하기 위한 정보들이 담겨있는 `htmlProps`를 `documentElement`로 전달함으로써 HTML 문서의 구조와 속성을 구성하고 있는 것을 확인할 수 있었습니다.

최종적으로는, document를 string으로 변환하여 `documentHTML`을 만들어 내는 것까지 코드로 확인했습니다.

#### 🤔 클라이언트에서 이를 받아 렌더링하는 과정

📄 [next.js/packages/next/src/client/next.ts](https://github.com/vercel/next.js/blob/canary/packages/next/src/client/next.ts)

```typescript
initialize({})
  .then(() => hydrate())
  .catch(console.error)
```

우선 `inialize()`가 진행된 다음에 `hydrate()`를 실행하는 것을 확인할 수 있었습니다. 각각의 코드를 살펴봅시다 :)

📄 [next.js/packages/next/src/client/index.tsx](https://github.com/vercel/next.js/blob/canary/packages/next/src/client/index.tsx)

```tsx
export async function initialize(opts: { webpackHMR?: any } = {}): Promise<{
  assetPrefix: string
}> {
  // ...
  initialData = JSON.parse(
    document.getElementById('__NEXT_DATA__')!.textContent!
  )
  window.__NEXT_DATA__ = initialData

  const prefix: string = initialData.assetPrefix || ''

  appElement = document.getElementById('__next')
  return { assetPrefix: prefix }
}
```

`initialize()`는 서버에서 렌더링한 HTML에서 `__NEXT_DATA__`를 id로 갖는 엘리먼트의 컨텐츠를 브라우저의 전역객체 `window.__NEXT_DATA__`로 저장합니다. 그리고 환경에 맞게 prefix를 반환합니다.

> 📌 Next.js에서의 prefix
> 정적 자원(이미지, CSS, 폰트 등)의 경로를 지정하는 데 사용되는 옵션
> 이를 통해 정적 자원읙 경로를 설정하고 해당 자원에 접근할 수 있게 된다.

```tsx
export async function hydrate(opts?: { beforeRender?: () => Promise<void> }) {
  // ...
  const renderCtx: RenderRouteInfo = {
    App: CachedApp,
    initial: true,
    Component: CachedComponent,
    props: initialData.props,
    err: initialErr,
  }

  render(renderCtx)
}
```

`hydrate()`는 실행하려는 페이지의 에러가 있는지 확인 및 validate 체크를 하고 없다면 렌더링할 때 필요한 컨텍스트(라우터, App, Component, initialProps 등)를 `render()`의 인자로 넘겨줍니다.

```tsx
async function render(renderingProps: RenderRouteInfo): Promise<void> {
  // ...
  await doRender(renderingProps)
}

function doRender(input: RenderRouteInfo): Promise<any> {
  // ...
  renderReactElement(appElement!, (callback) => (
    <Root callbacks={[callback, onRootCommit]}>
      {process.env.__NEXT_STRICT_MODE ? (
        <React.StrictMode>{elem}</React.StrictMode>
      ) : (
        elem
      )}
    </Root>
  ))
}
```

`doRender()`를 따라가다보면, `renderReactElement()`를 실행시키고 있었습니다.

```tsx
let shouldHydrate: boolean = true // 첫 렌더에서는 항상 true이다

function renderReactElement(
  domEl: HTMLElement,
  fn: (cb: () => void) => JSX.Element
): void {
  //...
  const reactEl = fn(shouldHydrate ? markHydrateComplete : markRenderComplete)

  // ...
  if (shouldHydrate) {
    ReactDOM.hydrate(reactEl, domEl)
    shouldHydrate = false
  } else {
    ReactDOM.render(reactEl, domEl)
  }
}
```

드이어 React에서 렌더해주는 `ReactDOM.render()`와 `ReactDOM.hydrate()`를 확인할 수 있었습니다.🥹

🤔 **render()**

```tsx
ReactDOM.render(element, container, [callback])
```

- element: 화면에 그려진 React element (집어넣어 줄 요소)
- container: React element를 해당 container DOM에 렌더링 (구체적인 위치)
- callback: 렌더링 후 반환되는 값을 돌려주는 콜백 함수

CRA하게 되면 `index.js`에 다음 코드를 쉽게 볼 수 있습니다.

```tsx
import App from './App'

ReactDOM.render(<App />, document.getElementById('root'))
```

즉, `<App/>` 컴포넌트를 root라는 id를 가지고 있는 엘리먼트 내부로 넣어주어 페이지를 렌더링 해주고 있습니다.

🤔 **hyrate()**

```tsx
ReactDOM.hydrate(element, container, [callback])
```

기본적으로 `render()`와 동일하지만, ReactDOMServer로 렌더링된 HTML에 이벤트 리스터(자바스크립트 코드)를 연결해주기 위해 사용됩니다.

서버 사이드를 통해 이미 HTML에는 엘리먼트들이 채워져 있죠? 따라서 다시 render 해줄 필요 없이 hydrate를 통해 기존 마크업에 이벤트 리스너를 붙여주는 과정입니다.

# Hydration

위 과정들을 정리해봅시다 😃

Next.js는 서버에서 HTML을 문자열로 가져온 후에, 클라이언트에서 서버로부터 보내준 HTML을 `render()`, `hydrate()`하여 브라우저에 렌더링 했습니다. 이 일련의 과정을 Hydration이라고 합니다!

> 📌 Hydration 사전적 정의
> \[명사\] 수분 공급

서버의 데이터가 클라이언트의 DOM과 결합하는 과정을 빗대어 hydrate라는 단어로 정의된 것 같습니다.

React는 클라이언트 렌더링만 있어, 유저에게 보여줄 HTML, CSS 그리고 자바스크립트 모두 render() 함수를 이용해 생성하여, 모든 리소스를 한번에 렌더링합니다.

반면, Next.js는 서버에서 보여줄 HTML 컨텐츠를 미리 렌더링(내용을 채워서)하여 가져오기 때문에 render() 함수로 HTML 뼈대만 렌더하고, `hydrate()`를 통해 서버에서 받아온 HTML에 유저가 상호작용할 수 있는 이벤트 리스너(JS파일)을 연결하는 것입니다.

HTML에 JS파일(수분💦)을 주입한다고 해서 hydrate라고 이해할 수 있겠습니다!

## Next.js가 Hydration하기까지의 과정 정리

1. 서버에서 전달된 HTML 수신
2. 클라이언트 측 렌더링 (`render()`)
   클라이언트는 수신된 HTML을 우선 렌더링하고, 인터렉션을 위한 JS파일을 로드한다.
3. `hydrate()` 호출
   전달된 HTML에 이벤트 핸들러를 연결
4. 클라이언트 측 렌더링 완료
   `hydrate` 과정이 완료되면 클라이언트에서 페이지의 렌더링과 인터렉션을 관리할 수 있게 된다.

# 참고 문서

- [minuk3508 - SEO) React와 SEO](https://velog.io/@minuk3508/SEOReact%EC%99%80-SEO)
- [hanei100 - SSR vs CSR 차이](https://velog.io/@hanei100/TIL-SSR-vs-CSR-%EC%B0%A8%EC%9D%B4)
- [js_dev_js - Next.js에 대한 거의 모든 것](https://velog.io/@sj_dev_js/Next.js-%EC%97%90-%EB%8C%80%ED%95%9C-%EA%B1%B0%EC%9D%98-%EB%AA%A8%EB%93%A0-%EA%B2%83)
- [howdy-mj.me - Next.js의 렌더링 과정(Hydrate) 알아보기](https://www.howdy-mj.me/next/hydrate)
