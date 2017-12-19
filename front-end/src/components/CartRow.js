import React from 'react';

function CartRow(props){
	const product = props.product;
	return(
		<tr>
			<td>{product.productName}</td>
			<td>${product.buyPrice.toFixed(2)}</td>
			<td><button className="btn btn-danger">Delete</button></td>
		</tr>
	);
}

export default CartRow;