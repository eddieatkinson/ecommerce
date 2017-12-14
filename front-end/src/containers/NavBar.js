import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Login from '../containers/Login';
import Register from './Register';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GetProductLines from '../actions/GetProductLines';

class NavBar extends Component{
	constructor(){
		super();
	}

	componentDidMount(){
		// console.log("Not yet!");
		this.props.getProductLines();
	}

	render(){
		if(this.props.auth.name != undefined){
			// the user is logged in
			var rightMenuBar = [
				<li key={1}>Welcome, {this.props.auth.name}!</li>,
				<li key={2}><Link to='/cart'>(0) items in your cart | ($0)</Link></li>,
				<li key={3}><Link to='/logout'>Logout</Link></li>
			]	
		}else{
			var rightMenuBar = [
          		<li key={1} id="sign-in"><Link to='/login'>Sign in</Link> or <Link to='/register'>Create an Account</Link>|&nbsp;&nbsp;</li>,
    			<li key={2}>(0) items in cart | $0.00</li> 
			]
		}
		console.log(this.props.auth);
		console.log(this.props.productLines);
		var shopMenu = this.props.productLines.map((pl, index)=>{
			return(<Link key={index} to={`/shop/${pl.link}`}>{pl.productLine}</Link>);
		});
		console.log(shopMenu);
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
		productLines: state.productLines
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		getProductLines: GetProductLines
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);