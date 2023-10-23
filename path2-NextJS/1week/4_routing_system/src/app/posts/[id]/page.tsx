'use client'

import { useSearchParams } from 'next/navigation'

interface Props {
  params: {
    id: string
  }
}

const PostPage = ({ params }: Props) => {
  const { id } = params
  const { get } = useSearchParams()
  const category = get('category')

  return (
    <>
      <div>post: {id}</div>
      <div>category: {category}</div>
    </>
  )
}

export default PostPage
