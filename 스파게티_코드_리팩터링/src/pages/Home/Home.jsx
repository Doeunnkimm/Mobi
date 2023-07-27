import { useEffect, useState } from 'react'

import styled from 'styled-components'
import { weatherApi } from '../../apis/weather.api'
import useFetch from '../../hooks/useFetch'
import NameForm from './components/NameForm'
import useDialog from '../../hooks/useDialog'
import { DialLogState } from '../../contexts/DialogProvider'

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
		dialog.moveTo({ url: '/posts' })
		// dialog.moveTo({ url: '/posts', text: 'posts 페이지로 이동한다요 🏃‍♀️' }) // text를 변경하고 싶은 경우도 동작 ⭕️
		// dialog.moveTo({ url: '/posts', type: DialLogState.CONFIRM }) // confirm으로 열고 싶을 경우도 동작 ⭕️
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
