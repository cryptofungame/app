import React, { Component } from "react";
import Pubsub from "../common/pubsub";
import Coins from "../Images/coins.svg";
export default class Credit extends Component {
	state = {
		current: localStorage.getItem("credit") || 0
	};

	componentWillMount() {
		Pubsub().subscribe("Credit", coin => {
			this.setState({
				current: coin
			});
		});
	}

	render() {
		return (
			<React.Fragment>
				<img src={Coins} className="BagIcon" alt="Encrypted" />
				<p className="RobotoMonoRegular ProfilesDetailText">
					TOKENS:
					<br />
					<span>{this.state.current}</span>
				</p>
			</React.Fragment>
		);
	}
}

export const setCreditValue = value => {
	localStorage.setItem("credit", value);
	Pubsub().publish("Credit", value);
};
