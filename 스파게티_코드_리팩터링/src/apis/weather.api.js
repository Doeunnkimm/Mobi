import axios from 'axios'
import { weatherConfig } from '../third-party/weather.config'

export const weatherApi = {
	getWeather: async () =>
		await axios.get('/getUltraSrtNcst', {
			baseURL: weatherConfig.api,
			params: {
				serviceKey: weatherConfig.secret_key,
				dataType: 'JSON',
				base_date: new Date().toISOString().substring(0, 10).replace(/-/g, ''),
				base_time: '0600',
				nx: 60,
				ny: 127,
			},
		}),
}
