import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';
import Order from '../components/Order';

class Orders extends Component{
	constructor(){
		super();
		this.state = {
			myOrders: {}
		}
	}

	componentDidMount(){
		if(this.props.auth.token !== undefined){
			const thePromise = axios({
				method: "POST",
				url: `${window.apiHost}/orders/get`,
				data: {
					userToken: this.props.auth.token
				}
			});

			thePromise.then((response)=>{
				// console.log(response.data);
				const orderNumbers = {};
				response.data.forEach((order)=>{
					// console.log(order);
					const key = order.orderNumber
					if(orderNumbers[key] === undefined){
						orderNumbers[key] = [];
					}
					orderNumbers[key].push(order);
				});
				this.setState({
					myOrders: orderNumbers
				});
			});
		}
	}

	render(){
		// const orderNumbers = this.state.myOrders.map((order, index)=>{
		// 	return(
		// 		<tr key={index}>
		// 			<td><Link to='account/orderDetails'>{order.orderNumber}</Link></td>
		// 			<td>{order.orderDate}</td>
		// 		</tr>
		// 		);
		// });

		// console.log(this.state.myOrders);
		if(this.props.auth.token === undefined){
			return(
				<h1>Please <Link to='/login'>login</Link> to view your orders</h1>
			)
		}

		var ordersByNumber = [];
		let uniqueKey = 0;
		for(var key in this.state.myOrders){
			uniqueKey += 1;
			// let thisOrder = this.state.myOrders[key]
			// console.log(this.state.myOrders[key]);
			ordersByNumber.push(
				<tr key={uniqueKey}>
					<td>
						<Link to={`/account/orders/${key}`}>{key}</Link>
					</td>
				</tr>
			);
		}
		return(
			<div>
				<Table className="table table-striped">
					<thead>
						<tr>
							<th>Order Number</th>
						</tr>
					</thead>
					<tbody>
						{ordersByNumber}
					</tbody>
				</Table>
				<Route exact path='/account/orders/:orderNumber' render={(props) => (
                	<Order routeProps={props} orders={this.state.myOrders} />
          		)}/>
			</div>
		);
	}
}

function mapStateToProps(state){
	return{
		auth: state.auth
	}
}

export default connect(mapStateToProps)(Orders);