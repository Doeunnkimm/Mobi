import {
	CLOSE_DIALOG,
	DEFAULT_DIALOG,
	MOVE_TO_PAGE_DIALOG,
	useDiaLogStore,
} from '../contexts/DialogProvider'

const useDialog = () => {
	const [, dispatch] = useDiaLogStore()

	return {
		default: attr =>
			dispatch(
				DEFAULT_DIALOG({
					onCancel: () => dispatch(CLOSE_DIALOG()),
					...attr,
				}),
			),
		moveTo: attr =>
			dispatch(
				MOVE_TO_PAGE_DIALOG({
					onCancel: () => dispatch(CLOSE_DIALOG()),
					...attr,
				}),
			),
		close: () => dispatch(CLOSE_DIALOG()),
	}
}

export default useDialog
