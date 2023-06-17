import LeaveConfirm from '../Utils/LeaveConfirm'

const Board = () => {
  return (
    <LeaveConfirm>
      <h1>Board Page 📝</h1>
      <input style={{ display: 'block', marginBottom: '20px' }} />
      <textarea style={{ width: '200px', height: '200px' }} />
    </LeaveConfirm>
  )
}
export default Board
