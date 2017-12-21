import React from 'react';
import { Table } from 'react-bootstrap';

export default (props)=>{
	console.log(props);
	const orderNumber = props.routeProps.match.params.orderNumber;
	const thisOrder = props.orders[orderNumber];
	var totalOrder = 0;
	const orderDetails = thisOrder.map((item, index)=>{
		totalOrder += item.priceEach * item.quantityOrdered;
		return(
			<tr key={index}>
				<td>{item.item}</td>
				<td>{item.productCode}</td>
				<td>{item.priceEach}</td>
				<td>{item.quantityOrdered}</td>
			</tr>
		);
	});
	return(
		<Table className="table table-striped">
			<thead>
				<tr>
					<th>Item</th>
					<th>Item Number</th>
					<th>Price</th>
					<th>Quantity</th>
				</tr>
			</thead>
			<tbody>
				{orderDetails}
				<tr>
					<td colSpan='4'><h1>${totalOrder}</h1></td>
				</tr>
			</tbody>
		</Table>
	);
}