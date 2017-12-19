// An action is a JS function that returns an object.
// That object MUST have at least a property of type.
import axios from 'axios';

export default function(formData){
	// console.log("Login action (AUTH_ACTION) is running......so FAST!");
	var axiosPromise
	// console.log(formData);
	if(formData === "fake"){ // REMOVE THIS!!! IT IS FOR DEV PURPOSES ONLY!
		axiosPromise = axios({
			url: `${window.apiHost}/fakeLogin`,
			method: "POST",
			data: formData
		});
	}else{
		axiosPromise = axios({
		url: `${window.apiHost}/login`,
		method: "POST",
		data: formData
		});
	}
	// console.log(axiosPromise);
	// Our redux-promise middleware will kick in because the payload value
	// is a promise.
	// Redux-promise will hold up the dispatch until it resolves.
	return{
		type: "AUTH_ACTION",
		payload: axiosPromise
	}
}