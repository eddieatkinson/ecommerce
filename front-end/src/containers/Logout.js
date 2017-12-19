import React, { Component } from 'react';
// import { Form, FormGroup, ControlLabel, FormControl, Button, Col, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import LogoutAction from '../actions/LogoutAction';
import { bindActionCreators } from 'redux';

class Logout extends Component{
	// constructor(){
	// 	super();
	// }

	componentDidMount(){
		//run the logoutAction on load
		this.props.logoutAction();
		this.props.history.push('/');
	}

	render(){
		return(
			<div>
				Logging out...
			</div>
		);
	}
}

function mapDispatchToProps(dispatch){
	// dispatch is the thing that takes any action and sends it out to all reducers
	return bindActionCreators({
		logoutAction: LogoutAction
	}, dispatch);
}

// I (Register component) need access to the dispatcher and to state.
// Goodbye export component, hello export connect.
export default connect(null, mapDispatchToProps)(Logout);