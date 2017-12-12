import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
// import { Form, Button, Col } from 'react-bootstrap';

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
	                			<li>Home</li>
	                			<li>Shop</li>
	                			<li>About Us</li>
	                			<li>Contact Us</li>
	                		</ul>
	                	</div>
                	</div>
                	<div className="container-fluid navbar-default">
	                	<div className="container navbar-default">
	                		<div className="navbar-header">
	                			<li><Link to='/'>ClassicModels Logo</Link></li>
	                		</div>
	                		<div className="nav navbar-nav pull-right">
	                			<li id="sign-in"><Link to='/account/login'>Sign in</Link> or <Link to='/account/register'>Create an Account</Link> |&nbsp;</li>
	                			<li>(0) items in cart | $0.00</li>                		
	                		</div>
	                	</div>
	                </div>
	                <Route path='/account/login' component={Login} />
	                <Route path='/account/register' component={Register} />
                </nav>
			</div>
		);
	}
}

export default NavBar;