import { createContext, useContext, useEffect, useRef, useState } from 'react'
import Dialog from '../components/Dialog'
import { createAction } from '../utils/createAction'
import { useReducer } from 'react'

export const DialLogState = {
	ALERT: 'ALERT',
	CONFIRM: 'CONFIRM',
}

// 전역 관리하고 싶은 state
const initialDialogAttr = {
	type: DialLogState.ALERT,
	text: '',
	isOpen: false,
	onConfirm: () => {},
	onCancel: () => {},
	position: {
		x: 50,
		y: 10,
	},
}

const DiaLogContext = createContext()

/**
 * ALTER_DIALOG(payload) <- 이렇게 Payload를 전달해주면 된다.
 */
export const MOVE_TO_PAGE_DIALOG = createAction('move_to_page')
export const DEFAULT_DIALOG = createAction('default')
export const CLOSE_DIALOG = createAction('close')

const dialogReducer = (state, action) => {
	// action은 dispatch를 통해 전달받은 객체
	switch (action.type) {
		case 'default':
			return {
				...state,
				type: DialLogState.ALERT,
				isOpen: true,
				...action.payload,
			}
		case 'move_to_page':
			return {
				...state,
				isOpen: true,
				type: DialLogState.ALERT, // default
				text: '페이지를 이동합니다.',
				onConfirm: () => (window.location.href = `${action.payload.url}`),
				...action.payload,
			}
		case 'close':
			return { ...state, isOpen: false }
		default:
			return { ...state, isOpen: true }
	}
}

export const useDiaLogStore = () => useContext(DiaLogContext)
const DiaLogProvider = ({ children }) => {
	const diaLogRef = useRef()
	const [diaLogAttribute, dispatch] = useReducer(
		dialogReducer,
		initialDialogAttr,
	)

	useEffect(() => {
		if (diaLogAttribute.isOpen) return diaLogRef.current.showModal()
		diaLogRef.current.close()
	}, [diaLogAttribute.isOpen])

	return (
		<DiaLogContext.Provider value={[diaLogAttribute, dispatch]}>
			{children}
			<Dialog
				{...{ ...diaLogAttribute }}
				ref={diaLogRef}
				onClose={() => dispatch(CLOSE_DIALOG())}
			/>
		</DiaLogContext.Provider>
	)
}
export default DiaLogProvider
