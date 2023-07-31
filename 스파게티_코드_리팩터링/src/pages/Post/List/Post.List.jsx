import { DialLogState } from '../../../contexts/DialogProvider'
import { useEffect } from 'react'

import { useSearchParams } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'
import { postApi } from '../../../apis/post.api'
import useDialog from '../../../hooks/useDialog'
import Pagination from '../../../components/pagenation/Pagenation'

const LIMIT_TAKE = 10
const LIMIT_PAGE = 10

const PostListPage = () => {
	const [params, setParams] = useSearchParams()
	const dialog = useDialog()

	const { data, loading, error } = useFetch(postApi.getPostList, {
		take: params.get('take') ?? LIMIT_TAKE,
		page: params.get('page') ?? 1,
		take: params.get('take') ?? LIMIT_TAKE,
		limit: params.get('limit') ?? LIMIT_PAGE,
	})
	const postList = data?.Posts
	const pageNation = data?.PageNation

	useEffect(() => {
		const userName = localStorage.getItem('userName')
		if (!userName) {
			alert('로그인이 필요합니다')
			window.location.href = '/'
		}
	}, [])

	const onClickPost = async postId => {
		dialog.default({
			type: DialLogState.CONFIRM,
			text: '정말로 페이지를 이동하겠습니까',
			onConfirm: () => {
				dialog.moveTo({
					text: '정말로 이동해버린다요!',
					url: `/post-detail/${postId}`,
				})
			},
		})
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
			<Pagination pageNation={pageNation} setParams={setParams} />
		</table>
	)
}
export default PostListPage
