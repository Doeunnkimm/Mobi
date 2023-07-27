import { useEffect, useState } from 'react'

import { useSearchParams } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'
import { postApi } from '../../../apis/post.api'
import useToggle from '../../../hooks/useToggle'
import CommentList from './components/Comment.List'

const PostDetailPage = () => {
	const [params] = useSearchParams()
	const { isOpen: isOpenCommentList, onPressToggle } = useToggle()
	const isShownCommentBtn = isOpenCommentList ? '숨기기' : '보기'

	const { data: postDetail, loading } = useFetch(postApi.getPostDetail)

	useEffect(() => {
		const userName = localStorage.getItem('userName')
		if (!userName) {
			alert('로그인이 필요합니다')
			window.location.href = '/'
		}
	}, [])

	useEffect(() => {
		if (!isOpenCommentList) return
	}, [params])

	if (loading) return <div>로딩중..</div>

	return (
		<div>
			<h1>Post Detail Page</h1>
			<div>
				<p>제목: {postDetail.title}</p>
				<p>내용: {postDetail.content}</p>
				<button onClick={onPressToggle}>댓글 {isShownCommentBtn}</button>
				{isOpenCommentList && <CommentList />}
			</div>
		</div>
	)
}
export default PostDetailPage
