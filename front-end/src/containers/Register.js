import React, { Component } from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import AuthAction from '../actions/AuthAction';
import { bindActionCreators } from 'redux';

class Register extends Component{
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
        const formData = {
            name: event.target[0].value,
            email: event.target[1].value,
            accountType: event.target[2].value,
            password: event.target[3].value,
            city: event.target[4].value,
            state: event.target[5].value,
            salesRep: event.target[6].value
        }
        // if(formData.name === ""){
        // 	this.setState({
        // 		error: "Name field cannot be empty."
        // 	});
        // }else{
        // 	this.props.authAction(formData);        	
        // }
        this.props.authAction(formData); 
    }

	render(){
		console.log(this.props.auth);
		return (
			<Form horizontal onSubmit={this.handleSubmit}>
				<h3 className="text-danger">{this.state.error}</h3>
				<FormGroup controlId="formHorizontalName" validationState={this.state.nameError}>
					<Col componentClass={ControlLabel} sm={2}>
						Name
					</Col>
					<Col sm={10}>
						<FormControl required="true" type="text" name="fullName" placeholder="Full Name" />
					</Col>
				</FormGroup>
				<FormGroup controlId="formHorizontalName" validationState={this.state.emailError}>
					<Col componentClass={ControlLabel} sm={2}>
						Email
					</Col>
					<Col sm={10}>
						<FormControl required="true" type="email" name="email" placeholder="Email" />
					</Col>
				</FormGroup>
				<FormGroup controlId="formHorizontalName">
					<Col componentClass={ControlLabel} sm={2}>
						Account Type
					</Col>
					<Col sm={10}>
						<FormControl type="text" name="type" value="customer" disabled />
					</Col>
				</FormGroup>
				<FormGroup controlId="formHorizontalName">
					<Col componentClass={ControlLabel} sm={2}>
						Password
					</Col>
					<Col sm={10}>
						<FormControl required="true" type="password" name="password" placeholder="Password" />
					</Col>
				</FormGroup>
				<FormGroup controlId="formHorizontalName">
					<Col componentClass={ControlLabel} sm={2}>
						City
					</Col>
					<Col sm={10}>
						<FormControl type="text" name="city" placeholder="City" />
					</Col>
				</FormGroup>
				<FormGroup controlId="formHorizontalName">
					<Col componentClass={ControlLabel} sm={2}>
						State
					</Col>
					<Col sm={10}>
						<FormControl type="text" name="state" placeholder="State" />
					</Col>
				</FormGroup>
				<FormGroup controlId="formHorizontalName">
					<Col componentClass={ControlLabel} sm={2}>
						Sales Rep
					</Col>
					<Col sm={10}>
						<FormControl type="text" name="employee" placeholder="Employee you worked with" />
					</Col>
				</FormGroup>
				<FormGroup>
					<Col smOffset={2} sm={10}>
						<Button bsStyle="primary" bsSize="small" type="submit">
							Register
						</Button>
					</Col>
				</FormGroup>
			</Form>
		);
	}
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
		authAction: AuthAction
	}, dispatch);
}

// I (Register component) need access to the dispatcher and to state.
// Goodbye export component, hello export connect.
export default connect(mapStateToProps, mapDispatchToProps)(Register);