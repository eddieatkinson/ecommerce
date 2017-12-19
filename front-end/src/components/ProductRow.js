import React from 'react';

function ProductRow(props){
	// console.log(props.token);
	const product = props.product;
	const buyPrice = product.buyPrice.toFixed(2);
	const MSRP = product.MSRP.toFixed(2);
	var button;
	var inStockClass;
	var inStock;

	if(props.token === undefined){
		// this user is not logged in
		button = ""
	}else{
		button = <button
						className="btn btn-primary"
						onClick={()=>{
							props.addToCart(props.token, product.productCode)
						}}
					>Add to cart</button>
	}
	if(product.quantityInStock > 100){
		inStockClass = "";
		inStock = "In Stock!"
	}else if(product.quantityInStock > 0){
		inStockClass = "bg-warning";
		inStock = 'Order Soon!'
	}else{
		inStockClass = "bg-danger";
		inStock = 'Out of stock!'
	}

	return(
		<tr>
			<td>{product.productName}</td>
			<td>{product.productScale}</td>
			<td>{product.productVendor}</td>
			<td>{product.productDescription}</td>
			<td className={inStockClass}>{inStock}</td>
			<td>${buyPrice}</td>
			<td>${MSRP}</td>
			<td>{button}</td>
		</tr>
	);
}

export default ProductRow;