import { DialLogState, useDiaLogStore } from '../contexts/DialogProvider'
import { useEffect, useState } from 'react'

import styled from 'styled-components'
import { weatherApi } from '../apis/weather.api'
import useFetch from '../hooks/useFetch'

const HomePage = () => {
	const [isBackGroundBlur, setIsBackGroundBlur] = useState(true)
	const [, setDiaLogAttribute] = useDiaLogStore()

	const { data, loading, error } = useFetch(weatherApi.getWeather)
	const weather = data?.response.body.items.item

	useEffect(() => {
		const userName = localStorage.getItem('userName')
		if (!userName) {
			return setIsBackGroundBlur(true)
		} else setIsBackGroundBlur(false)
	}, [])

	const onSubmit = e => {
		e.preventDefault()
		const userName = e.target.userName.value.trim()
		if (!userName) return alert('이름을 입력해주세요')
		localStorage.setItem('userName', userName)
		setIsBackGroundBlur(false)
		e.target.userName.value = ''
	}

	const onPressNavigateBlog = () => {
		setDiaLogAttribute({
			type: DialLogState.ALERT,
			text: '정말로 페이지를 이동하겠습니까',
			isOpen: true,
			onConfirm: async () => {
				await setDiaLogAttribute({ isOpen: false })
				window.location.href = '/posts'
			},
		})
	}

	if (loading) {
		return <div>로딩중...</div>
	}

	return (
		<>
			{isBackGroundBlur && (
				<S.BlurBackGround>
					<S.UserNameForm onSubmit={onSubmit}>
						<input type="text" name="userName" placeholder="Enter your name" />
						<button type="submit">Submit</button>
					</S.UserNameForm>
				</S.BlurBackGround>
			)}
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

const BlurBackGround = styled.div`
	position: fixed;
	width: 100%;
	height: 100vh;
	z-index: 9999;
	backdrop-filter: blur(10px);
`

const UserNameForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;
`

const Button = styled.button``

const S = {
	BlurBackGround,
	UserNameForm,
	Button,
}
