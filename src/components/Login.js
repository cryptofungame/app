import React, { Component } from "react";
import { Button, Row, Input, Col } from "react-materialize";
import { setCreditValue } from "./Credit";
import Spinner from "./Spinner";
import Logo from "../Images/logo.svg";
import login from "../Images/login.svg";
import config from "../common/config";
class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Loader: false,
			PrivateKey: ""
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({ PrivateKey: event.target.value });
	}

	// componentWillMount() {
	// 	console.log(JSON.parse(localStorage.getItem("User")));
	// }

	Login = () => {
		const User = JSON.parse(localStorage.getItem("User"));
		// console.log(User);
		if (this.state.PrivateKey !== "") {
			this.setState({ Loader: true });
			// console.log(this.state.PrivateKey);
			fetch(`${config.baseURL}/neo-game/public/api/v1/login`, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					privateKey: this.state.PrivateKey
				})
			}).then(response => {
				if (response.status === 200) {
					response.json().then(json => {
						// console.log(json);
						if (User === null) {
							var UserObjects = {
								PrivateKey: this.state.PrivateKey,
								api_token: json.result.api_token,
								address: json.result.address,
								credit: json.result.credit,
								avatar: json.result.avatar
							};

							localStorage.setItem("User", JSON.stringify(UserObjects));
							this.setState({ Loader: false });
							setCreditValue(json.result.credit);

							// console.log(json);
							this.props.history.push("/home");
						} else {
							// console.log(json);
							User["api_token"] = json.result.api_token;
							User["address"] = json.result.address;
							User["credit"] = json.result.credit;
							User["avatar"] = json.result.avatar;
							localStorage.setItem("User", JSON.stringify(User));
							setCreditValue(json.result.credit);

							this.setState({ Loader: false });
							this.props.history.push("/home");
						}
					});
				} else {
					this.setState({ Loader: false });
					window.Materialize.toast("wrong private key please signup", 2000);
				}
			});
		} else {
			window.Materialize.toast("please fill the input", 2000);
		}
	};

	Register = () => {
		this.setState({ Loader: true });
		fetch(`${config.baseURL}/neo-game/public/api/v1/register`, {
			method: "GET"
		})
			.then(response => response.json())
			.then(json => {
				// console.log(json);
				this.setState({ PrivateKey: json.private_key, Loader: false });
				var UserObjects = { PrivateKey: this.state.PrivateKey };
				localStorage.setItem("User", JSON.stringify(UserObjects));

				window.Materialize.toast(
					"you have been registred please copy and save your private key",
					3000
				);
			})
			.catch(error => {
				console.log(error);
				this.setState({ Loader: false });
				window.Materialize.toast("error", 3000);
			});
	};

	render() {
		return (
			<Row className="body">
				<div className="LoginBoxContainer">
					<img src={Logo} className="LoginLogo" alt="Logo" />
					<p className="LoginHeader RobotoMonoBold">Login to neo Wallet</p>
					{this.state.Loader === false ? (
						<div className="LoginBox">
							<Input
								label="enter your private key"
								value={this.state.PrivateKey}
								onChange={this.handleChange}
								className="LoginInput"
								s={12}
							/>
							<Col s={12} m={12} l={12} className="LoginBoxFooter NoPadding">
								<Col s={3} m={4} l={4} className="LoginButtonContainer">
									<Button
										waves="light"
										className="LoginButton"
										onClick={this.Login}
									>
										<a>
											<img src={login} className="LoginIcon" alt="Login" />Login
										</a>
									</Button>
								</Col>
								<Col s={9} m={8} l={8}>
									<p className="LoginFooterText">
										New to NEO?{" "}
										<a
											className="LoginSignUpButton RobotoRegular"
											onClick={this.Register}
										>
											Create an account
										</a>
									</p>
								</Col>
							</Col>
						</div>
					) : (
						<div className="LoginBox">
							<Spinner />
						</div>
					)}
				</div>
			</Row>
		);
	}
}

export default Login;
