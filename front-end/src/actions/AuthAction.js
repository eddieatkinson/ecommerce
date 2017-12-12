// An action is a JS function that returns an object.
// That object MUST have at least a property of type.

export default function(){
	// console.log("AUTH_ACTION is running......so FAST!");
	return{
		type: "AUTH_ACTION",
		payload: "User Registered"
	}
}