// A reducer is a FUNCTION that returns a piece of state.
// I specifically manage the user's name, token, and last message.
// If you want to change me you need to add a case/else if.

export default function(state = [], action){
	switch(action.type){
		case "AUTH_ACTION":
			return action.payload.data;
		case "LOGOUT":
			return [];
		default:
			return state;
	}
}