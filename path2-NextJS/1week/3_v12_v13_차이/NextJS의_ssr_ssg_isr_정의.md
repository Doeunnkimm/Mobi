# NextJS가 Data Fetching을 하는 방법

```
⭐️ NextJS가 Data Fetching을 하는 방법, SSR & SSG & ISR
```

## 🤔 SSR (Server Side Rendering)

```
⭐️ 요청 시 마다 달라지는 내용을 pre-rendering된 HTML울 받는다.
→ 새로고침하면 데이터를 매번 새로 fetching
```

아래 처럼 새로고침을 할 때마다 새로운 데이터를 받아 매번 업데이트가 가능하다. 따라서 변화가 자주 일어나는 페이지에 적합하다.

<p align="center"><img src="https://github.com/mobi-community/mobi-path-nextjs/assets/112946860/df591531-fd18-46d9-8c48-115be527cc6d" /></p>

---

## 🤔 SSG (Static Site Generation)

```
⭐️ 빌드 시점에 pre-render된, 정해진, 고정되어 버린 HTML로 받는다.
→ 새로고침해도 빌드 시점에 굳어진 고정된 HTML을 매번 받게 된다.
```

아래처럼 처음 빌드 시점 이후에 새로고침을 하더라도 고정된 데이터를 받게 된다. 따라서 변화가 없는 페이지에 적합하다. 그러면 이미 만들어진 페이지를 제공하면 되므로 서버에 부담이 없이 서비스를 제공할 수 있다.

<p align="center"><img src="https://github.com/mobi-community/mobi-path-nextjs/assets/112946860/b44cc250-52ef-41ec-ab3b-e352fc9a7ce3" /></p>

---

## 🤔 ISR (Incremental Static Regeneration)

```
⭐️ 특정 주기로 데이터를 다시 pre-fetching한 HTML을 받는다.
→ 새로고침해도 특정 주기가 지나야만 새로운 HTML을 받을 수 있다.
```

아래는 주기를 3초로 지정해 두었을 때인데, 새로고침을 아무리 해도 3초 뒤에만 데이터를 새로 불러오게 된다. 정보가 계속 업데이트 되는 사이트라고 하더라도 ISR을 이용하면 특정 주기로 데이터를 새로 fetching 해와서 SSG와 SSR의 장점을 적절히 사용할 수 있다.

<p align="center"><img src="https://github.com/mobi-community/mobi-path-nextjs/assets/112946860/82375c4e-99c1-4540-85e2-72591d663534" /></p>
