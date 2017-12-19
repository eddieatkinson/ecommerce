import axios from 'axios';

export default function(userToken, productCode){
	// console.log(userToken, productCode);
	// console.log("Ruprate Rart Running!");

	const thePromise = axios({
		method: "POST",
		url: `${window.apiHost}/updateCart`,
		data:{
			userToken, // same as userToken: userToken -- cool ES6 way to do it
			productCode
		}
	});

	return{
		type: "UPDATE_CART",
		payload: thePromise
	}
}