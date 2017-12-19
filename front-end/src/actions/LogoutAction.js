// This meets exactly the minimum requirements for a redux action.

export default function(formData){
	console.log("Logout action (AUTH_ACTION) is running......so FAST!");

	return{
		type: "LOGOUT"	
	}
}