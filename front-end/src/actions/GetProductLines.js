import axios from 'axios';

export default function(){
	const axiosPromise = axios.get(`${window.apiHost}/productlines/get`);
	return{
		type: "GET_PRODUCTLINES",
		// axios returns a bunch of stuff (headers, config, etc.)
		// we just care about the data
		payload: axiosPromise
	}
}