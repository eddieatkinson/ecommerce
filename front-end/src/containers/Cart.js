import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import GetCart from '../actions/GetCart';
import CartRow from '../components/CartRow';
import axios from 'axios';

class Cart extends Component{
	constructor(){
		super();
		this.makePayment = this.makePayment.bind(this);
	}

	makePayment() {
		// console.log(this.props);
		var handler = window.StripeCheckout.configure({
			key: 'pk_test_5UMWsDsNLN6twtXUc7NzGAop',
			locale: 'auto',
			image: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Astaire%2C_Fred_-_Never_Get_Rich.jpg',
			token: (token) => {
				var theData = {
					amount: this.props.cart.totalPrice * 100,
					stripeToken: token.id,
					userToken: this.props.auth.token,
				}
				axios({
					method: 'POST',
					url: `${window.apiHost}/makePayment`,
					data: theData
				}).then((response) => {
					console.log(response);
					if(response.data.msg === 'paymentSuccess') {
						this.props.history.push('/thankyou');
					}else{
						console.log(response.data.msg);
					}
				});
			}
		});
		handler.open({
			name: "Pay Now",
			description: 'Give me what you owe me',
			amount: this.props.cart.totalPrice * 100
		})
	}

	componentDidMount(){
		// console.log(this.props.auth);
		if(this.props.auth.token === undefined){
			this.props.history.push('/login');
		}else{
			this.props.getCart(this.props.auth.token);
		}
	}

	render(){
		console.log(this.props.cart);
		// if no one is logged in, though no one should be at this route if not logged in
		if(this.props.cart.products === undefined){
			this.props.cart.products = [];
		}
		if(this.props.cart.totalItems === 0){
			return(
				<div>
					<h3>Your cart is empty! Get shopping or <Link to='/login'>login</Link>.</h3>
				</div>
			);
		}else{
			var cartArray = this.props.cart.products.map((product, index)=>{
				// console.log(product);
				return(
					<CartRow key={index} product={product} />
				);
			});
			return(
				<div>
					<h2>Your order total is: ${this.props.cart.totalPrice} - <button className="btn btn-primary" onClick={this.makePayment}>Checkout</button></h2>
					<table className="table table-striped">
						<thead>
							<tr>
								<th>Product</th>
								<th>Price</th>
								<th>Remove</th>
							</tr>
						</thead>
						<tbody>
							{cartArray}
						</tbody>
					</table>
				</div>
			)
		}
	}
}

function mapStateToProps(state){
	return{
		auth: state.auth,
		cart: state.cart
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		getCart: GetCart
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);