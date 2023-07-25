import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
/**
 * 데이터를 가져오는 커스텀 훅입니다.
 * @param {() => Promise<AxiosResponse<any, any>>} fetching axios.get으로 작성된 fetching 메서드입니다.
 * @param {Object} params get요청시 필요한 객체 형태의 params입니다.
 * @returns {Object} - 커스텀 훅의 반환 값으로, 다음과 같은 객체를 포함합니다.
 * @property {*} data - API로부터 가져온 데이터입니다.
 * @property {boolean} loading - 데이터 요청이 진행 중인지를 나타내는 상태입니다.
 * @property {string|null} error - 데이터 요청 중 발생한 에러 객체입니다. 에러가 없을 경우에는 null입니다.
 */
const useFetch = (fetching, params) => {
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetching({ params })
				setData(response.data)
				setLoading(false)
			} catch (err) {
				console.log(err)
				setError(err)
				setLoading(false)
			}
		}
		fetchData()
	}, [fetching])
	return { data, loading, error }
}
export default useFetch
