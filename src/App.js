// import packages
import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
// import Components
import Login from "./components/Login.js";
import Home from "./components/Home.js";
import Game from "./components/Game.js";
import Explore from "./components/Explore.js";

class App extends Component {
	render() {
		const UserObject = JSON.parse(localStorage.getItem("User"));
		return (
			<BrowserRouter>
				<Switch>
					<Route
						path="/"
						exact
						render={({ match }) =>
							UserObject == null ? <Redirect to="/login" /> : <Redirect to="/home" />
						}
					/>

					<Route path="/login" component={Login} exact />
					<Route path="/g/:id" component={Game} />
					<Route path="/home" component={Home} />
					<Route path="/explore" component={Explore} />
					<Route
						nomatch
						render={({ location }) => {
							if (location.pathname.startsWith("/")) return <Redirect to="/" />;
						}}
					/>
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;
