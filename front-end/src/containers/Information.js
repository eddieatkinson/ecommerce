import React, { Component } from 'react';

class Information extends Component{

	render(){
		console.log(this.props.match);
		return(
			<h1>Information</h1>
		);
	}
}

export default Information;