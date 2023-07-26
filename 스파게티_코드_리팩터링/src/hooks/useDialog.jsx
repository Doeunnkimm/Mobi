import {
	ALTER_DIALOG,
	CLOSE_DIALOG,
	CONFIRM_DIALOG,
	useDiaLogStore,
} from '../contexts/DialogProvider'

const useDialog = () => {
	const [, dispatch] = useDiaLogStore()

	return {
		confirm: attr =>
			dispatch(
				CONFIRM_DIALOG({ onCancel: () => dispatch(CLOSE_DIALOG()), ...attr }),
			),
		alter: attr => dispatch(ALTER_DIALOG(attr)),
		close: () => dispatch(CLOSE_DIALOG()),
	}
}

export default useDialog
