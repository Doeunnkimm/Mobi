import Home from './pages/Home'
import Melon from './pages/Melon'
import createRouter from './router'

function App() {
  const pages = {
    home: () => <Home />,
    melon: () => <Melon />,
  }
  const router = createRouter()
  router.addRoute('#/', pages.home).addRoute('#/melon', pages.melon).start()

  const onClickRouter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (
      e.target instanceof HTMLElement &&
      e.target.matches('[data-navigate]')
    ) {
      const navigateURL = e.target.dataset.navigate // `data-navigate` 속성 값을 가져온다
      if (navigateURL) {
        router.navigate(navigateURL)
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
      </header>
      <main></main>
    </>
  )
}

export default App
