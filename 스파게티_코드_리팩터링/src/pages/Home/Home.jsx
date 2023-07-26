import {
	ALTER_DIALOG,
	CLOSE_DIALOG,
	DialLogState,
	useDiaLogStore,
} from '../../contexts/DialogProvider'
import { useEffect, useState } from 'react'

import styled from 'styled-components'
import { weatherApi } from '../../apis/weather.api'
import useFetch from '../../hooks/useFetch'
import NameForm from './components/NameForm'
import useDialog from '../../hooks/useDialog'

const HomePage = () => {
	const [isBackGroundBlur, setIsBackGroundBlur] = useState(true)
	const dialog = useDialog()

	const { data, loading, error } = useFetch(weatherApi.getWeather)
	const weather = data?.response.body.items.item

	useEffect(() => {
		const isHaveUserName = !!localStorage.getItem('userName')
		setIsBackGroundBlur(!isHaveUserName)
	}, [])

	const onPressNavigateBlog = () => {
		dialog.alter({
			text: '정말로 페이지를 이동하겠습니까',
			onConfirm: async () => {
				await dialog.close()
				window.location.href = '/posts'
			},
		})
	}

	if (loading) {
		return <div>로딩중...</div>
	}

	return (
		<>
			{isBackGroundBlur && <NameForm setBlurred={setIsBackGroundBlur} />}
			<div>
				<h1>Home Page</h1>
				<p>오늘의 기온</p>
				<p>{weather.find(el => el.category === 'T1H').obsrValue}도</p>
				<S.Button onClick={onPressNavigateBlog}>블로그 보러가기</S.Button>
			</div>
		</>
	)
}
export default HomePage

const Button = styled.button``

const S = { Button }
