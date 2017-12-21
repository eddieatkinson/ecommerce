var express = require('express');
var router = express.Router();
var config = require('../config/config.js');
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var stripe = require('stripe')(config.stripeKey);
var connection = mysql.createConnection(config.db);
connection.connect();

// include random token for generating a random token
var randToken = require('rand-token');

// console.log(randToken.uid(100));

router.post('/register', (req, res, next)=>{
	// console.log(req.body);
	// res.json(req.body);
	const userData = req.body;
	// var selectQuery = `SELECT * FROM customers WHERE email = ?;`;
	// connection.query()
	const checkEmail = new Promise((resolve, reject)=>{
		const checkEmailQuery = `SELECT * FROM users WHERE email = ?;`;
		connection.query(checkEmailQuery, [userData.email], (error, results)=>{
			if(error){
				throw error; // for development
				// reject(error) // in production
			}else if(results.length > 0){
				// user already exists
				reject({
					msg: "userExists"
				});
			}else{
				resolve();
			}
		})
	});
	checkEmail.then(()=>{
		// code to run if checkEmail resolves
		console.log("User is not in the DB");
		const insertIntoCust = `INSERT INTO customers
			(customerName, city, state, salesRepEmployeeNumber, creditLimit)
				VALUES
			(?, ?, ?, ?, ?);`;
		connection.query(insertIntoCust, [userData.name, userData.city, userData.state, 1337, 10000], (error, results)=>{
			if(error){
				throw error
			}
			// get the customer id that was JUST inserted (results)
			const newID = results.insertId;
			// set up a random token for this user and store it in the DB
			const token = randToken.uid(60);
			const hash = bcrypt.hashSync(userData.password);
			console.log(newID);
			const insertUsers = `INSERT INTO users
				(cid, type, password, token, email)
					VALUES
				(?, ?, ?, ?, ?);`;
			connection.query(insertUsers, [newID, 'customer', hash, token, userData.email], (error, results)=>{
				if(error){
					throw error;
				}else{
					// If we get this far, this is going to be what's inside the AuthReducer.
					res.json({
						token: token,
						name: userData.name,
						msg: "registerSuccess"
					});
				}
			});
			// res.json({
			// 	msg: "user inserted"
			// });
		});
		
	}).catch(
		(error)=>{
			// code to run if checkEmail rejects
			res.json(error);
		}
	)
});

router.post('/login', (req, res, next)=>{
	// console.log(req.body);
	const email = req.body.email;
	const password = req.body.password;

	const checkLoginQuery = `SELECT * FROM users
		INNER JOIN customers ON users.cid = customers.customerNumber
		WHERE users.email = ?;`;

	connection.query(checkLoginQuery, [email], (error, results)=>{
		if(error){
			throw error;
		}
		if(results.length === 0){
			// this user does not exist
			res.json({
				msg: "badUser"
			});
		}else{
			// email is valid, see if password is valid
			const checkHash = bcrypt.compareSync(password, results[0].password);
			const name = results[0].customerName;
			if(checkHash){ // correct password
				const newToken = randToken.uid(60);
				const updateToken = `UPDATE users SET token = ? WHERE email = ?;`;
				connection.query(updateToken, [newToken, email], (error, results)=>{
					if(error){
						throw error;
					}else{
						res.json({
							msg: "loginSuccess",
							token: newToken,
							name: name
						})
					}
				});
			}else{
				res.json({
					msg: "wrongPassword"
				})
			}
		}
	});
});

////////////////FOR DEV PURPOSES ONLY!!!////////////
router.post('/fakeLogin', (req, res, next)=>{
	const getFirstUser = `SELECT * from users limit 1;`;
	connection.query(getFirstUser, (error, results)=>{
		if(error){
			throw error;
		}
		console.log(results);
		res.json({
			msg: "loginSuccess",
			token: results[0].token,
			name: results[0].name
		});				
	})
});
/////////////////////////////////////////////////////

router.get('/productlines/get', (req, res, next)=>{
	const selectQuery = `SELECT * FROM productlines;`;
	connection.query(selectQuery, (error, results)=>{
		if(error){
			throw error
		}else{
			res.json(results);
		}
	});
});

router.get('/productlines/:productline/get', (req, res, next)=>{
	const pl = req.params.productline;
	var plQuery = `SELECT * FROM productlines
		INNER JOIN products ON productlines.productLine = products.productLine
		WHERE productlines.productLine = ?;`
	connection.query(plQuery, [pl], (error, results)=>{
		if(error){
			throw error;
		}else{
			res.json(results);
		}
	});
});

router.post('/getCart', (req, res, next)=>{
	const userToken = req.body.token;
	const getUidQuery = `SELECT id FROM users WHERE token = ?;`;
	connection.query(getUidQuery, [userToken], (error, results)=>{
		if(error){
			throw error;
		}else if(results.length === 0){
			res.json({
				msg: "badToken"
			});
		}else{
			const uid = results[0].id;
			const getCartResults = `SELECT ROUND(SUM(buyPrice), 2) as totalPrice, count(buyPrice) as totalItems FROM cart
				INNER JOIN products ON products.productCode = cart.productCode
				WHERE cart.uid = ?;`;
			connection.query(getCartResults, [uid], (error, cartResults)=>{
				if(error){
					throw error;
				}else{
					const getCartProducts = `SELECT * FROM cart
						INNER JOIN products on products.productCode = cart.productCode
						WHERE uid = ?;`;
					connection.query(getCartProducts, [uid], (error, cartContents)=>{
						if(error){
							throw error;
						}else{
							var finalCart = cartResults[0];
							finalCart.products = cartContents;
							res.json(finalCart);
						}
					})
				}
			});
		}
	});
});

router.post('/updateCart', (req, res, next)=>{
	const productCode = req.body.productCode;
	const userToken = req.body.userToken;
	const getUidQuery = `SELECT id FROM users WHERE token = ?;`;
	connection.query(getUidQuery, [userToken], (error, results)=>{
		if(error){
			throw error;
		}else if(results.length === 0){
			// THIS TOKEN IS BAD. USER IS CONFUSED OR A LIAR.
			res.json({
				msg: "badToken"
			});
		}else{
			// good token
			// get user's id from last query
			const uid = results[0].id
			const addToCartQuery = `INSERT INTO cart (uid, productCode)
				VALUES (?, ?);`;
			connection.query(addToCartQuery, [uid, productCode], (error)=>{
				if(error){
					throw error;
				}else{
					// insert worked, get the sum of their products and their total
					const getCartTotals = `SELECT ROUND(SUM(buyPrice), 2) as totalPrice, count(buyPrice) as totalItems FROM cart
						INNER JOIN products ON products.productCode = cart.productCode
						WHERE cart.uid = ?;`;
					connection.query(getCartTotals, [uid], (error, cartResults)=>{
						if(error){
							throw error;
						}else{
							var finalCartSummary = cartResults[0];
							finalCartSummary.products = [];
							res.json(finalCartSummary);
						}
					});
				}
			});
		}
	});
});

router.post('/makePayment', (req, res, next)=>{
	const userToken = req.body.userToken;
	const stripeToken = req.body.stripeToken;
	// console.log('==================================');
	// console.log(stripeToken);
	// console.log('==================================');
	const amount = req.body.amount;
	// stripe module required above, is assocaited with our secretkey.
	// it has a charges object which has multiple methods.
	// the one we want, is create.
	// create takes 2 args:
	// 1. object (stripe stuff)
	// 2. function to run when done
	stripe.charges.create({
		amount: amount,
		currency: 'usd',
		source: stripeToken,
		description: 'Charges for classicmodels'
	},
	(error, charge)=>{
		// stripe, when charge has been run
		// runs the callback, and sends it any errors, and the charge onject
		if(error){
			console.log(error);
			res.json({
				msg: error
			});
		}else{
			// Insert stuff from cart that was just paid into:
			// - orders
			const getUserQuery = `SELECT MAX(users.id) as id, MAX(users.cid) as cid, MAX(cart.productCode) as productCode, MAX(products.buyPrice) as buyPrice, COUNT(cart.productCode) as quantity FROM users 
				INNER JOIN cart ON users.id = cart.uid
				INNER JOIN products ON cart.productCode = products.productCode
				WHERE token = ?
				GROUP BY cart.productCode;`;
			console.log(userToken)
			console.log(getUserQuery);
			connection.query(getUserQuery, [userToken], (error2, results2)=>{
				if(error2){
					throw error2; // halt everything, dev only
				}
				const customerId = results2[0].cid;
				const insertIntoOrders = `INSERT INTO orders
					(requiredDate,comments,status,customerNumber)
					VALUES
					(NOW(),'Website Order','Paid',?)`
					connection.query(insertIntoOrders,[customerId],(error3,results3)=>{
						if(error3){
							throw error3;
						}
						console.log(results3)
						const newOrderNumber = results3.insertId;
						// results2 (the select query above) contains an array of rows. 
						// Each row has the uid, the productCOde, and the price
						// map through this array, and add each one to the orderdetails tabl

						// Set up an array to stash our promises inside of
						// After all the promises have been created, we wil run .all on this thing
						var orderDetailPromises = [];
						// Loop through all the rows in results2, which is...
						// a row for every element in the users cart.
						// Each row contains: uid, productCode,BuyPrice
						// Call the one we're on, "cartRow"
						results2.map((cartRow)=>{
							// Set up an insert query to add THIS product to the orderdetails table
							var insertOrderDetail = `INSERT INTO orderdetails
								(orderNumber,productCode,quantityOrdered,priceEach,orderLineNumber)
								VALUES
								(?,?,?,?,1);`;
							// Wrap a promise around our query (because queries are async)
							// We will call resolve if it succeeds, call reject if it fails
							// Then, push the promise onto the array above
							// So that when all of them are finished, we know it's safe to move forward

							const aPromise = new Promise((resolve, reject) => {
								connection.query(insertOrderDetail,[newOrderNumber,cartRow.productCode,cartRow.quantity, cartRow.buyPrice],(error4,results4)=>{
									// another row finished.
									if (error4){
										reject(error4)
									}else{
										resolve(results4)
									}
								})
							})
							orderDetailPromises.push(aPromise);
						})
						// When ALL the promises in orderDetailPromises have called resolve...
						// the .all function will run. It has a .then that we can use
						Promise.all(orderDetailPromises).then((finalValues)=>{
							console.log("All promises finished")
							console.log(finalValues)
							const deleteQuery = `
								DELETE FROM cart WHERE uid = ${results2[0].id}
							`
							connection.query(deleteQuery, (error5, results5)=>{
								// - orderdetails
								// Then remove it from cart
								if(error5){
									throw error5;
								}
								res.json({
									msg:'paymentSuccess'
								})								
							})
						});

					})
			});

		}
	});
});

router.post('/orders/get', (req, res, next)=>{
	// res.json(req.body.userToken);
	const getUserQuery = `SELECT * FROM users WHERE token = ?;`;
	connection.query(getUserQuery, [req.body.userToken], (error, results)=>{
		if(error){
			throw error;
		}else{
			if(results.length == 0){
				// user not found;
				res.json({
					msg: 'badToken'
				});
			}else{
				// user has valid token
				const usersId = results[0].id;
				const customersId = results[0].cid;
				const getOrderDetails = `SELECT * FROM orders 
						INNER JOIN orderdetails ON orders.orderNumber = orderDetails.orderNumber
					WHERE customerNumber = ?;`;
				connection.query(getOrderDetails, [customersId], (error, orderResults)=>{
					if(error){
						throw error;
					}else{
						res.json(orderResults);
					}
				});
			}
		}
	})
});

module.exports = router;
