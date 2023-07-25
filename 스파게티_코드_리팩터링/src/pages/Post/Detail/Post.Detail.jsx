import { useEffect, useState } from 'react'

import CommentPageNation from '../components/pagenation/Pagenation.Comment'
import { useSearchParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { postApi } from '../apis/post.api'
import useToggle from '../hooks/useToggle'

const LIMIT_TAKE = 20
const PostDetailPage = () => {
	const [params] = useSearchParams()
	const { isOpen: isOpenCommentList, onPressToggle } = useToggle()

	const { data: postDetail, loading } = useFetch(postApi.getPostDetail)
	const { data: commentResponse } = useFetch(postApi.getComment, {
		take: params.get('take') ?? LIMIT_TAKE,
	})
	const commentList = commentResponse?.Comments

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
				{!isOpenCommentList && (
					<button onClick={onPressToggle}>댓글 보기</button>
				)}
				{isOpenCommentList && (
					<button onClick={onPressToggle}>댓글 숨기기</button>
				)}
				{isOpenCommentList && (
					<>
						{commentList?.map(comment => (
							<div key={comment.id}>
								<p>{comment.content}</p>
								<p>{comment.User.nickName}</p>
							</div>
						))}
						<CommentPageNation />
					</>
				)}
			</div>
		</div>
	)
}
export default PostDetailPage
