import React, { Component } from "react";
import { Button, Row, Input, Col } from "react-materialize";
import Recaptcha from "react-recaptcha";

class captcha extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Verified: false
		};
	}

	LoadCaptcha = () => {
		console.log("laoded captcha succesful");
	};

	VerifyCaptcha = response => {
		if (response) {
			this.setState({ Verified: true });
		}
	};

	HandleSubscribe = () => {
		if (this.state.Verified) {
			alert("successful subscribe");
		} else {
			alert("failure subscribe");
		}
	};

	render() {
		return (
			<Row className="body">
				<Button onClick={this.HandleSubscribe}>subscribe</Button>

				<Recaptcha
					sitekey="6LcpNmgUAAAAANvu_S2VnW13rOGtJCJoTkJZi4ub"
					render="explicit"
					onloadCallback={this.LoadCaptcha}
					verifyCallback={this.VerifyCaptcha}
				/>
			</Row>
		);
	}
}

export default captcha;
