import {
	CLOSE_DIALOG,
	CONFIRM_DIALOG,
	DialLogState,
	useDiaLogStore,
} from '../../../contexts/DialogProvider'
import { useEffect, useState } from 'react'

import PostPageNation from '../../../components/pagenation/Pagenation.Post'
import { useSearchParams } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'
import { postApi } from '../../../apis/post.api'

const LIMIT_TAKE = 10
const PostListPage = () => {
	const [params] = useSearchParams()
	const [, dispatch] = useDiaLogStore()

	const { data, loading, error } = useFetch(postApi.getPostList, {
		take: params.get('take') ?? LIMIT_TAKE,
	})
	const postList = data?.Posts

	useEffect(() => {
		const userName = localStorage.getItem('userName')
		if (!userName) {
			alert('로그인이 필요합니다')
			window.location.href = '/'
		}
	}, [])

	const onClickPost = async postId => {
		await dispatch(
			CONFIRM_DIALOG({
				text: '정말로 페이지를 이동하겠습니까',
				onConfirm: async () => {
					await dispatch(
						CONFIRM_DIALOG({
							text: '정말로 이동해버린다요!',
							onConfirm: async () => {
								window.location.href = `/post-detail/${postId}`
							},
						}),
					)
				},
				onCancel: () => {
					dispatch(CLOSE_DIALOG())
				},
			}),
		)
	}

	if (loading) return <div>로딩중...</div>

	return (
		<table>
			<caption>Post List Page</caption>
			<tr>
				<th>제목</th>
				<th>내용</th>
				<th>작성자</th>
			</tr>
			{postList.map(post => (
				<tr key={post.id} onClick={() => onClickPost(post.id)}>
					<td>{post.title}</td>
					<td>{post.content}</td>
					<td>{post.User.nickName}</td>
				</tr>
			))}
			<PostPageNation />
		</table>
	)
}
export default PostListPage
