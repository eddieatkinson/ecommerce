import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './containers/NavBar';
import SlickSlider from './components/SlickSlider';
import Home from './components/Home';
import Register from './containers/Register';
import Login from './containers/Login';
import ProductLines from './containers/ProductLines';
import Logout from './containers/Logout';
import Cart from './containers/Cart';

class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<NavBar />
					<div className="app-body">
						<Route exact path="/" component={SlickSlider} />
						<div className="container">
							<Route exact path="/" component={Home} />
							<Route exact path="/register" component={Register} />
							<Route exact path="/login" component={Login} />
							<Route path="/shop/:productLine" component={ProductLines} />
							<Route path="/logout" component={Logout} />
							<Route path="/cart" component={Cart} />
						</div>
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
