export default function(state = [], action){
	// console.log(action.payload);
	if(action.type === "GET_PRODUCTLINES"){
		return action.payload.data;
	}else{
		return state;
	}
}