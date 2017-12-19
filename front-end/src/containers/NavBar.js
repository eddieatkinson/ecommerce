import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import Login from '../containers/Login';
// import Register from './Register';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GetProductLines from '../actions/GetProductLines';
import LoginAction from '../actions/LoginAction';
import GetCart from '../actions/GetCart';

class NavBar extends Component{
	constructor(){
		super();
		this.fakeLogin = this.fakeLogin.bind(this);
	}

	fakeLogin(){
		this.props.loginAction('fake');
	}

	componentDidMount(){
		this.props.getProductLines();
	}

	// On login, we need to update the cart.
	// componentWillReceiveProps(newProps){
	// 	console.log(newProps);
	// 	if(newProps.auth.msg === "loginSuccess"){
	// 		// The user just logged in. Get their cart.
	// 		this.props.getCart();
	// 	}
	// }

	render(){
		console.log(this.props.cart);
		var cartText;
		var rightMenuBar;
		if(this.props.auth.name !== undefined){
			if(this.props.cart.totalPrice !== undefined){
				// something's in the user's cart!
				const totalPrice = this.props.cart.totalPrice.toFixed(2);
				const totalItems = this.props.cart.totalItems;
				cartText = `(${totalItems}) items in your cart | ($${totalPrice})`
			}else{
				cartText = "Your cart is empty.";
			}
			// the user is logged in
			rightMenuBar = [
				<li key={1}>Welcome, {this.props.auth.name}!</li>,
				<li key={2}><Link to='/cart'>{cartText}</Link></li>,
				<li key={3}><Link to='/logout'>Logout</Link></li>
			]	
		}else{
			rightMenuBar = [
				<li key={0}><button className="btn btn-primary" onClick={this.fakeLogin}>FAKE LOGIN</button></li>,
          		<li key={1} id="sign-in"><Link to='/login'>Sign in</Link> or <Link to='/register'>Create an Account</Link>|&nbsp;&nbsp;</li>,
    			<li key={2}>(0) items in cart | $0.00</li> 
			]
		}
		// console.log(this.props.auth);
		// console.log(this.props.productLines);
		var shopMenu = this.props.productLines.map((pl, index)=>{
			const safeLink = encodeURIComponent(pl.productLine);
			// console.log(safeLink);
			return(<Link key={index} to={`/shop/${safeLink}`}>{pl.productLine}</Link>);
		});
		// console.log(shopMenu);
		return(
			<div id="navbar">
				<nav className="navbar navbar-fixed-top">
            		<div className="container-fluid navbar-white">
                		<div className="container">
	                		<ul className="nav navbar-nav">
	                			<li><Link to="/">Home</Link></li>
	                			<li className="dropdown">
	                				<Link to="/shop"><i className="arrow down" />Shop</Link>
	                				<ul>
	                					<li className="dropdown-links">
	                						{shopMenu}
	                					</li>
	                				</ul>
	                			</li>
	                			<li><Link to="/about">About Us</Link></li>
	                			<li><Link to="/contact">Contact Us</Link></li>
	                		</ul>
	                	</div>
                	</div>
                	<div className="container-fluid navbar-default">
	                	<div className="container navbar-default">
	                		<div className="navbar-header">
	                			<li><Link to='/'>ClassicModels Logo</Link></li>
	                		</div>
	                		<div className="nav navbar-nav pull-right">
	                     		{rightMenuBar}
	                		</div>
	                	</div>
	                </div>
                </nav>
			</div>
		);
	}
}

function mapStateToProps(state){
	// state = RootReducer
	return{
		auth: state.auth,
		productLines: state.productLines,
		cart: state.cart
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		getProductLines: GetProductLines,
		loginAction: LoginAction,
		getCart: GetCart
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);