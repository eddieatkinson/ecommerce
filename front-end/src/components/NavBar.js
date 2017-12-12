import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Login from '../containers/Login';
import Register from './Register';

class NavBar extends Component{
	constructor(){
		super();
	}
	render(){
		return(
			<div id="navbar">
				<nav className="navbar navbar-fixed-top">
            		<div className="container-fluid navbar-white">
                		<div className="container">
	                		<ul className="nav navbar-nav">
	                			<li><Link to="/">Home</Link></li>
	                			<li><Link to="/shop">Shop</Link></li>
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
	                			<li id="sign-in"><Link to='/login'>Sign in</Link> or <Link to='/register'>Create an Account</Link>|&nbsp;&nbsp;</li>
	                			<li>(0) items in cart | $0.00</li>                		
	                		</div>
	                	</div>
	                </div>
                </nav>
			</div>
		);
	}
}

export default NavBar;