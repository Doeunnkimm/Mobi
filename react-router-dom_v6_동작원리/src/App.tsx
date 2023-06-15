import Home from './pages/Home'
import Intro, { IntroProp } from './pages/Intro'
import Melon from './pages/Melon'
import createRouter from './router'

function App() {
  const pages = {
    home: () => <Home />,
    melon: () => <Melon />,
    intro: (params: IntroProp) => <Intro name={params.name} age={params.age} />,
  }
  const router = createRouter()
  router
    .addRoute('#/', pages.home)
    .addRoute('#/melon', pages.melon)
    .addRoute('#/intro/:name/:age', pages.intro as () => JSX.Element)
    .start()

  const onClickRouter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (
      e.target instanceof HTMLElement &&
      e.target.matches('[data-navigate]')
    ) {
      const navigateURL = e.target.dataset.navigate // `data-navigate` 속성 값을 가져온다
      if (navigateURL) {
        router.navigate(navigateURL, true)
      }
    }
  }

  return (
    <>
      <header>
        <a href="#/">home</a>
        <a href="#/melon">melon</a>
      </header>

      <header>
        <button data-navigate="/" onClick={onClickRouter}>
          home
        </button>
        <button data-navigate="/melon" onClick={onClickRouter}>
          melon
        </button>
        <button data-navigate="/intro/doeunn/23">intro</button>
      </header>
      <main></main>
    </>
  )
}

export default App
