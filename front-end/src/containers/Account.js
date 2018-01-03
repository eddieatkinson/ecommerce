import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
// import Login from '../containers/Login';
// import Register from './Register';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Orders from './Orders';
import Information from './Information';

class Account extends Component{
	// constructor(){
	// 	super();
	// }

	componentDidMount(){
		// this.props.getProductLines();
	}

	render(){
		// console.log(this.props.match);
		return(
			<div>
				<h1>Account Page</h1>
				<Link to='/account/orders'>Orders</Link>&nbsp; | &nbsp;
				<Link to='/account/information'>Account Information</Link>
				<div>
					<Route path='/account/orders' component={Orders} />
					<Route exact path='/account/information' component={Information} />
					<Route exact path='/account/orderDetails' component={Orders} />
				</div>
			</div>
		);
	}
}

function mapStateToProps(state){
	// state = RootReducer
	return{
		auth: state.auth,
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({

	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);