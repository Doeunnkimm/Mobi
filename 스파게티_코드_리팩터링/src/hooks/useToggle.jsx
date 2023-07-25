import { useState } from 'react'

const useToggle = () => {
	const [isOpen, setOpen] = useState(false)

	const onPressToggle = () => {
		setOpen(prev => !prev)
	}

	return { isOpen, onPressToggle }
}

export default useToggle
