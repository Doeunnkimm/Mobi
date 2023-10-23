# Next.js에서 제공하는 Font, Image Optimization

```
next-js에서는 Image와 Font 사용을 Optimization하여 지원한다.
어떠한 방법으로 이를 Optimization하고 있을까?
```

## 🤔 최적화(Optimization)를 지원한다는 것은?

```
최적화(Optimization)란 주어진 조건과 제약 사항 내에서
특정 목표를 가장 잘 달성하는 상태를 찾는 과정이나 그 결과를 말한다.

→ 해당 영역에서 가능한 한 가장 좋은 성능 혹은 결과를 도출할 수 있게 설계되었다는 것을 의미한다.
```

```
👍 Next.js는 웹사이트의 성능 최적화, 개발 생산성 향상, 사용자 경험 개선 등 다양한 목표를 돕는다.
```

## 📄 Font Optimization

> [공식 문서](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) : Next.js 13 버전부터는 폰트 최적화를 지원한다.

```
⭐️ next/font에는 모든 폰트 파일에 대한 내장 자체 호스팅이 포함

→ 이 새로운 폰트 시스템은 성능과 개인 정보 보호를 고려하여 모든 Google 폰트를 편리하게 사용할 수 있게 한다.
→ CSS 및 폰트 파일은 빌드 시간에 다운로드되어 정적 파일과 함께 배포 가능하다.
```

```
⭐️ Next 13에서는 build 타임에 미리 google font를 다운로드하여서
  로컬 디렉터리에 저장해 두고, html 파일이 이 로컬 파일을 link 하도록 구현되어 있다.
```

### next/font를 사용하면 얻는 이점

- 커스텀 폰트와 next에서 제공하는 google font를 자체 호스팅 한다.
- 구글 폰트를 next에서 제공하기 때문에 네트워크를 통해 요청 할 필요가 없다.
- `size-adjust`를 이용해 `layout Shifting`를 방지해준다.

### size-adjust ?

- 첫 번째로 거치는 단계는 `adjustFontFallbackMetrics`를 계산하는 부분
- `google-font-metrics.json`이라는 Map을 불러와서 fontFamily를 key로 준 값을 읽어온 후
- 이 값을 `calculateSizeAdjustValues`에 넣어 size-adjust, line-gap 등의 fallback font를 조정하기 위한 값을 계산

```
🤔 그래서 server에서 해주는 일들을 살펴보자면
```

1. [adjustFontFallbackMetrics](https://github.com/vercel/next.js/blob/ec671bb5f55f84405604934f13fa0161e27def98/packages/font/src/google/loader.ts#L60)을 계산

   <p align="center"><img src="https://github.com/Doeunnkimm/Mobi/assets/112946860/c2e4f5fe-94b2-4176-b12f-037d044a690a"/></p>

   `getFallbackFontOverrideMetrics`에 `fontFamily`를 넣어 return하고 있다.

   <p align="center"><img src="https://github.com/Doeunnkimm/Mobi/assets/112946860/376b5e09-cbc0-4c0f-b6c9-c0ce1fed741c" /></p>

   `calculateSizeAdjustValues`에 fontFamily를 넣어 객체를 사용하고 있다. 그리고 객체의 프로퍼티로 return 하고 있다.

   <p align="center"><img src="https://github.com/Doeunnkimm/Mobi/assets/112946860/63f6e2b2-c879-4346-aed7-28ddfdf1f99e" /></p>

   [`calculateSizeAdjustValues`](https://github.com/vercel/next.js/blob/ec671bb5f55f84405604934f13fa0161e27def98/packages/next/src/server/font-utils.ts#L113)를 살펴보면, `google-font-metrics.json`에서 `fontKey`를 통해 폰트를 찾고 이 값을 찾고 계산한 후 return하고 있다.

   > fallback 폰트와의 layout shift를 발생시킬 수 있는 size 차이를 비교해서 size-adjust 속성을 조정하는 방식으로 동작

### 사용해보자

1.  [google fonts](https://fonts.google.com/)에서 폰트를 선택하자

    `Noto Sans Korean`을 선택했다.

    <p align="center"><img src="https://github.com/Doeunnkimm/Mobi/assets/112946860/d5322728-daa5-4074-9b55-e56763581a33" /></p>

2.  `src/styles/fonts.ts` 파일에 사용할 폰트 내용들을 미리 정의해두자

    ```ts
    import { Noto_Sans_KR } from 'next/font/google'

    export const notoSansKr = Noto_Sans_KR({
      weight: ['100', '300', '400', '500', '700', '900'],
      // subsets: ['latin'], // 다국어의 경우(_KR, _JP, ...) 해당 속성없이
      preload: false, // preload를 false를 해주어도 동작 O
    })
    ```

3.  root 경로에 있는 `layout.tsx`에 아래 내용을 추가해주자

    ```tsx
    import { notoSansKr } from '@/styles'

    export default function RootLayout({
      children,
    }: {
      children: React.ReactNode
    }) {
      return (
        <html lang='en'>
          <body className={notoSansKr.className}>{children}</body>
        </html>
      )
    }
    ```

    적용 후 devtools에서 styles 탭을 확인하니 아래와 같이 잘 적용된 것을 확인할 수 있었다.
    <p align="center"><img width="30%" src="https://github.com/Doeunnkimm/Mobi/assets/112946860/fc704a7f-544f-4edc-9d1c-c0f40db2291a" /></p>

### 조금 더 알아보자면

```
🤔 1. `subsets: ['latin']` 속성을 주지 않았을 때 발생하는 에러에 대해
```

```
subsets은 preload할 하위 집합을 지정하여, 글꼴 파일을 줄이고 성능이 향상시킨다.
그리고 preload의 기본값은 true이기 때문에, subsets가 없으면 preload할 대상을 알 수 없으므로 경고가 발생한다.
```

그런데, subsets에서 한글은 제공하지 않는다.

presets에 존재하지 않는, 예를 들어 영어가 아닌 **다국어에만 해당 폰트를 사용하는 경우**라면 **preload를 false**로 사용할 수 있다.

추가로, [github에서 code](https://github.com/vercel/next.js/blob/canary/packages/font/src/google/font-data.json#L7920C8-L7920C8)를 통해 알아보았을 때, subsets를 쉽게 확인 가능했다.

<br>

```
🤔 2. 코드로 알아보는 `next/font`
```

[소스 코드에서 Noto_Sans_KR](https://github.com/vercel/next.js/blob/canary/packages/font/src/google/index.ts#L14149)을 찾아보았다.

   <p align="center"><img src="https://github.com/Doeunnkimm/Mobi/assets/112946860/a058143b-e98c-4545-b83f-2e7b24b16a18" width="70%"/></p>

아래 보이는 `NextFont`와 `NextFontWithVariable`은 다음과 같았다.

   <p align="center"><img src="https://github.com/Doeunnkimm/Mobi/assets/112946860/39873142-5b81-40df-804d-0777a024631f" width="70%"/></p>

그렇기 때문에 `layout.tsx`에서 `body`에 `className`으로 폰트를 적용해 줄 수 있었던 것이다.

```
🤔 3. size-adjust 방식이 layout shift 방지에 도움이 되는 이유?
```

<p align="center"><img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/0*fPBMnCN5jCoeM46C.png" width="60%"/></p>

`size-adjust`는 글꼴과 관련된 글리프 윤곽선 및 메트릭에 대한 승수를 정의한다. 이렇게 하면 동일한 글꼴 크기로 렌더링할 때 다양한 글꼴의 디자인을 더 쉽게 조화시킬 수 있다.

<p align="center"><img src="https://github.com/Doeunnkimm/Mobi/assets/112946860/f56cc127-daed-4a0f-9fc2-94f9aeb661ef" width="60%"/></p>

위 사진과 같이 같은 `size-adjust: 100%`라 하더라도 크기가 달라 렌더링 시 layout shift 문제가 발생할 수 있는데, 서버에서 윤곽선 및 여러 메트릭에 대해 계산하여 layout이 shift 되는 문제를 방지해준다.

## 🖼️ Image Optimization

Next.js에서 `next/image`의 Image 컴포넌트는 다양한 최적화를 제공한다.

## webp 포멧 제공

```
- webp는 2010년 구글에서 만들었다.
- webp는 고품질의 이미지를 표현하면서도 png, jpg 등 기존의 포맷보다 파일의 크기가 작다.
👍 무손실 압축 방식이다.
```

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbhXSf4%2Fbtsk5QQdufy%2Fn31G6ruBKV2aqi1rKIZfNk%2Fimg.png"></p>

아래 이미지는 `<img>`와 `<Image>`를 같이 렌더링하여 네트워크 탭에서 확인한 결과이다.

보시면 형식 자체가 다르다. `<img>` 태그로 이미지를 로드한 경우는 png, `<Image>` 컴포넌트로 로드한 경우에는 webp라는 유형으로 로드가 된다.

webp는 png나 jpeg보다 훨씬 가볍게 동일 혹은 더 좋은 화상의 이미지를 제공할 수 있는 포멧이다. 크롬에서는 wepb를 알아서 제공하기 때문에 최적화된 이미지 포멧으로 제공을 하게 된다.

👍 용량도 좀 더 적도 더 좋은 퀄리티의 이미지를 가져올 수 있게 됩니다.

## lazy loading 제공

처음 viewport에 보이지 않는 위치에 `<Image>` 컴포넌트로 이미지가 존재할 경우 `lazy loading`이 된다.

<p align="center"><img src="https://blog.kakaocdn.net/dn/nW32O/btsk5StPrLJ/raJeKDXjAcCcFakcJ5MHXk/img.gif" /width="60%"></p>

## 반응형 이미지 제공

**Next.js는 srcset을 자동으로 설정**하여 **이미지 후보들을 생성**하고 viewport의 너비에 따라 로드될 이미지 후보들 중에서 선택하여 로드한다.

### `<Image>`의 layout 속성

이를 사용하기 위해서는 `<Image>`에 `layout` 이라는 속성이 필요하다.
이 속성은 해당 이미지가 **viewport에 따라 어떻게 반응하는지**에 대한 속성이다.

4가지 옵션이 존재한다.

- intrinsic
  default값이며, 이미지의 width와 height에 따라 얼마나 많은 자리를 차지하는지 계산

- fixed
  이미지의 정확한 width와 height를 사용하여 표시

- fill
  이미지를 상위 엘리먼트의 width와 height에 맞추기 위해 자동으로 width와 height를 조절.
  반드시 상위 엘리먼트는 `position: relative`을 적용해야 한다.<br>
  ⭐️ 이미지 사이즈를 모를 때 사용하면 좋은 옵션

- responsive
  부모 컨테이너의 width에 맞게 이미지를 확대. 반드시 부모 컨테이너에 `display: block`을 추가해야 한다.

> 반응형을 위해서는 `fill` 혹은 `responsive`로 사용

🚨 주의할 점은 layout 속성을 사용하면 width와 height 속성을 사용할 수 없다.

#### `<Image>`의 sizes 속성

현재 뷰포트의 너비에 따라 로드될 이미지를 설정할 수 있습니다. `sizes`는 layout 속성 값이 responsive와 fill인 경우메나 사용되는 속성이다.

```jsx
<div style={{ position: 'relative', width: '300px', height: '300px' }}>
  <Image
    src='/images/test.png'
    alt='test'
    // width={300}
    // height={300}
    layout='fill'
    sizes='(max-width: 768px) 50vw,
         (max-width: 1024px) 100vw'
    placeholder='blur'
    blurDataURL='image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='
  />
</div>
```

![](https://velog.velcdn.com/images/doeunnkimm_/post/b8500827-557e-4163-a897-ea2ddaccecfb/image.png)

자동으로 srcset이 지정되어 있는 모습을 볼 수 있었다.

## 모든 이미지를 최적화해주진 않아요

Next.js의 이미지 최적화 모듈의 코드 일부분을 보면 다음과 같다.

```ts
const vector = VECTOR_TYPES.includes(upstreamType)
const animate =
  ANIMATABLE_TYPES.includes(upstreamType) && isAnimated(upstreamBuffer)

if (vector || animate) {
  return { buffer: upstreamBuffer, contentType: upstreamType, maxAge }
}
```

SVG와 같은 vector 이미지, 그리고 GIF와 같은 상대적으로 복잡하고 최적화에 오래 걸리는 애니메이션 이미지의 경우에서는 기본적으로 최적화 기능을 제공하지 않고 바로 응답을 내려주게 되어 있다.

# @reference

- [next.js v13 @next/font 적용기](https://velog.io/@sangbooom/nextfont-%EC%A0%81%EC%9A%A9)
- [next.js : google font 적용하기🧚‍♀️(feat. tailwind)](https://velog.io/@dusunax/next.js-google-font-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0feat.-tailwind)
- [How @next/font works](https://blog.mathpresso.com/how-next-font-works-8bb72c2bae39)
- [Next.js 13에서 웹 글꼴 최적화](https://www.lydiahallie.io/blog/optimizing-webfonts-in-nextjs-13)
