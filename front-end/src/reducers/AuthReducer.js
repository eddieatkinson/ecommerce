// A reducer is a FUNCTION that returns a piece of state.

export default function(state = [], action){
	if(action.type === "AUTH_ACTION"){
		return action.payload;
	}else{
		return state;
	}
}