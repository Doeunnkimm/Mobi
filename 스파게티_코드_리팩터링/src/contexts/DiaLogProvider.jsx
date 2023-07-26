import { createContext, useContext, useEffect, useRef, useState } from 'react'
import Dialog from '../components/Dialog'
import { createAction } from '../utils/createAction'
import { useReducer } from 'react'

export const DialLogState = {
	CLOSE: 'CLOSE',
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
export const ALTER_DIALOG = createAction(DialLogState.ALERT)
export const CONFIRM_DIALOG = createAction(DialLogState.CONFIRM)
export const CLOSE_DIALOG = createAction(DialLogState.CLOSE)

const dialogReducer = (state, action) => {
	// action은 dispatch를 통해 전달받은 객체
	switch (action.type) {
		case DialLogState.ALERT:
			return {
				...state,
				type: DialLogState.ALERT,
				isOpen: true,
				onClose: () => {
					return { ...state, isOpen: false }
				},
				...action.payload,
			}
		case DialLogState.CONFIRM:
			return {
				...state,
				type: DialLogState.CONFIRM,
				isOpen: true,
				...action.payload,
			}
		case DialLogState.CLOSE:
			return { ...state, isOpen: false }
		default:
			return
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
