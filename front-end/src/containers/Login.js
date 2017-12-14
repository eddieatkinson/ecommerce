import React, { Component } from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button, Col, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import LoginAction from '../actions/LoginAction';
import { bindActionCreators } from 'redux';

class Login extends Component{
	constructor(){
		super();
		this.state = {
			error: ""
		}
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillReceiveProps(newProps){
		console.log(this.props);
		console.log(newProps);
		if(newProps.auth.msg === "registerSuccess"){
			// User was inserted, we have token and name safely in auth reducer.
			// Move them to home page.
			this.props.history.push('/')
		}else if(newProps.auth.msg === "userExists"){
			this.setState({
				error: "This email address is already registered. Please login or choose a different email."
			});
		}
	}

	handleSubmit(event){
		event.preventDefault();
		console.log("handleSubmit running....and RUNNING!");
		const formData = {
			email: event.target[0].value,
			password: event.target[1].value,
		}
		this.props.loginAction(formData);        	
	}
	render(){
		return(
			<div className="register-wrapper">
				<Form horizontal onSubmit={this.handleSubmit}>
					<FormGroup controlId="formHorizontalName" validationState={this.state.nameError}>
						<Col componentClass={ControlLabel} sm={2}>
							Email
						</Col>
						<Col sm={10}>
							<FormControl required="true" type="email" name="email" placeholder="Email" />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontalName" validationState={this.state.emailError}>
						<Col componentClass={ControlLabel} sm={2}>
							Password
						</Col>
						<Col sm={10}>
							<FormControl required="true" type="password" name="password" placeholder="Password" />
						</Col>
					</FormGroup>
					<FormGroup>
						<Col smOffset={2} sm={10}>
							<Button bsStyle="success" bsSize="small" type="submit">
								Login
							</Button>
						</Col>
					</FormGroup>
				</Form>
			</div>
		)
	}
	// render(){
	// 	console.log(this.props.auth);
	// 	return (
	// 		<Form horizontal onSubmit={this.handleSubmit}>
	// 			<h3 className="text-danger">{this.state.error}</h3>
	// 			<FormGroup controlId="formHorizontalName" validationState={this.state.emailError}>
	// 				<Col componentClass={ControlLabel} sm={2}>
	// 					Email
	// 				</Col>
	// 				<Col sm={10}>
	// 					<FormControl type="email" name="email" placeholder="Email" />
	// 				</Col>
	// 			</FormGroup>
	// 			<FormGroup controlId="formHorizontalName">
	// 				<Col componentClass={ControlLabel} sm={2}>
	// 					Password
	// 				</Col>
	// 				<Col sm={10}>
	// 					<FormControl type="password" name="password" placeholder="Password" />
	// 				</Col>
	// 			</FormGroup>
	// 			<FormGroup>
	// 				<Col smOffset={2} sm={10}>
	// 					<Button bsStyle="primary" bsSize="small" type="submit">
	// 						Register
	// 					</Button>
	// 				</Col>
	// 			</FormGroup>
	// 		</Form>
	// 	);
	// }
}

function mapStateToProps(state){
	// state = RootReducer
	return{
		// key = this.props.KEY will be accessible to this component
		// value = property of RootReducer
		auth: state.auth
	}
}

function mapDispatchToProps(dispatch){
	// dispatch is the thing that takes any action and sends it out to all reducers
	return bindActionCreators({
		loginAction: LoginAction
	}, dispatch);
}

// I (Register component) need access to the dispatcher and to state.
// Goodbye export component, hello export connect.
export default connect(mapStateToProps, mapDispatchToProps)(Login);