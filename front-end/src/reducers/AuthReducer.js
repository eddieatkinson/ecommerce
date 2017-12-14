// A reducer is a FUNCTION that returns a piece of state.

export default function(state = [], action){
	// console.log(action.payload);
	if(action.type === "AUTH_ACTION"){
		return action.payload.data;
	}else{
		return state;
	}
}