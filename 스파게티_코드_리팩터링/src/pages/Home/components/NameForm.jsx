import styled from 'styled-components'

const NameForm = ({ setBlurred }) => {
	const onSubmit = e => {
		e.preventDefault()
		const userName = e.target.userName.value.trim()
		if (!userName) return alert('이름을 입력해주세요')
		localStorage.setItem('userName', userName)
		setBlurred(false)
		e.target.userName.value = ''
	}

	return (
		<S.BlurBackGround>
			<S.UserNameForm onSubmit={onSubmit}>
				<input type="text" name="userName" placeholder="Enter your name" />
				<button type="submit">Submit</button>
			</S.UserNameForm>
		</S.BlurBackGround>
	)
}

export default NameForm

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

const S = { BlurBackGround, UserNameForm }
