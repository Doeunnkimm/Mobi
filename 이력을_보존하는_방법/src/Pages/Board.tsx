import LeaveConfirm from '../Utils/LeaveConfirm'

const Board = () => {
  return (
    <LeaveConfirm message="페이지를 떠나시겠어요?">
      <h1>Board Page 📝</h1>
      <input style={{ display: 'block', marginBottom: '20px' }} />
      <textarea style={{ width: '200px', height: '200px' }} />
    </LeaveConfirm>
  )
}
export default Board
