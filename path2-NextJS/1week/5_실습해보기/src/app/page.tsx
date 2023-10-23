import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <h1>Home Page 🏠</h1>
      <div>
        <Link href='/posts'>Posts 페이지로 이동!</Link>
      </div>
    </main>
  )
}
