const Pagination = ({ pageNation, setParams, LIMIT_PAGE = 10 }) => {
	const onClickPage = page => {
		setParams({
			page,
		})
	}

	const isPrevPageVisible = pageNation?.startPage !== 1
	const isNextPageVisible =
		Math.ceil(pageNation?.currentPage / LIMIT_PAGE) !==
		Math.ceil(pageNation?.totalPage / LIMIT_PAGE)

	return (
		<div>
			{isPrevPageVisible && (
				<button onClick={() => setParams({ page: pageNation.startPage - 1 })}>
					이전
				</button>
			)}
			{pageNation &&
				Array(pageNation.endPage - pageNation.startPage + 1)
					.fill()
					.map((_, i) => pageNation.startPage + i)
					.map(page => (
						<button key={page} onClick={() => onClickPage(page)}>
							{page}
						</button>
					))}
			{isNextPageVisible && (
				<button onClick={() => setParams({ page: pageNation.endPage + 1 })}>
					다음
				</button>
			)}
		</div>
	)
}
export default Pagination
