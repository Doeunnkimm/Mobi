import { cache } from 'react'
import { getFakeData } from './_state'

// export const revalidate = 5 // ISR (5초)
export const revalidate = 0 // SSR

/**
 * ⭐️ revalidate와 아래 cache 메소드를 사용하지 않으면 SSG이다.
 */

const PostsPage = cache(async () => {
  const postList = await getFakeData()

  return (
    <>
      <h1>{new Date().toISOString()}</h1>

      {postList.map((post) => (
        <div key={post.id}>
          <span>{post.id}) </span>
          <h3>{post.name}</h3>
          <div>{post.body}</div>
          <hr />
        </div>
      ))}
    </>
  )
})

export default PostsPage
