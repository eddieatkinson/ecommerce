var express = require('express');
var router = express.Router();
var config = require('../config/config.js');
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');

var connection = mysql.createConnection(config);
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
	console.log(req.body);
	const email = req.body.email;
	const password = req.body.password;

	const checkLoginQuery = `SELECT * FROM users WHERE email = ?;`;

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
			if(checkHash){
				res.json{
					msg: "loggedIn"
				}
			}else{
				res.json{
					msg: "badPass"
				}
			}
		}
	});
	res.json(req.body);
});

module.exports = router;
