import React, { Component } from "react";
import { Row, Col } from "react-materialize";
import cx from "classnames";
import Header from "./Header.js";
import GradientArray from "./StepGradient";
import { Link, Route, withRouter } from "react-router-dom";
import Spinner from "./Spinner.js";
import config from "../common/config.js";
const colors = new GradientArray();
class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			color: "#4263EB",
			Loader: false,
			UserQuestionsArray: [],
			Progress: [],
			UserFound: false
		};
	}

	componentWillMount() {
		const UserObject = JSON.parse(localStorage.getItem("User"));
		if (UserObject !== null) {
			this.setState({ UserFound: true });
			this.GetUserQuestions(UserObject.api_token);
		} else {
			this.setState({ UserFound: false });
			this.props.history.push("/");
		}
	}

	GetUserQuestions = token => {
		this.setState({ Loader: true });
		fetch(`${config.baseURL}api/v1/user-questions`, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: token
			}
		})
			.then(response => response.json())
			.then(json => {
				this.setState({
					Loader: false,
					UserQuestionsArray: json.questions,
					Progress: json.progress
				});
				// console.log(this.state.UserQuestionsArray);
			})
			.catch(error => {
				console.log(error);
				this.setState({ Loader: false });
			});
	};

	render() {
		if (this.state.Loader === true) {
			return <Spinner />;
		}
		const phase1 = colors.gradientList("#4263EB", "#4caf50", 80);
		const AllLevel = this.state.UserQuestionsArray.map(level => {
			const ConditionalLink = level.level_status === "3" ? Route : Link;
			return (
				<Col key={level.id} l={2} m={3} s={6} className="LevelBoxContainer">
					<ConditionalLink
						to={{
							pathname: `/g/${level.slug}`
						}}
					>
						<div
							className={cx("LevelBox", { done: level.level_status == 1 })}
							style={{
								backgroundColor:
									level.level_status === "2" || level.level_status === "1"
										? phase1[level.title - 1]
										: "#E1E3E6",
								boxShadow:
									level.level_status === "2" || level.level_status === "1"
										? "0 4px 8px 0 rgba(0,0,0,0.17)"
										: null
							}}
						>
							<div className="content">
								<p
									className="LevelBoxNumber RobotoMonoBold"
									style={{
										color:
											level.level_status === "2" || level.level_status === "1"
												? "#333"
												: "#A0A6AD"
									}}
								>
									{level.title}
								</p>
							</div>
						</div>
					</ConditionalLink>
				</Col>
			);
		});

		return (
			<main className="MainBody">
				{this.state.UserFound === true ? <Header /> : null}
				<div className="BottomGradiant" />
				<div className="container">
					<Row>
						<p className="LevelsProgress RobotoMonoBold">
							Progress: {this.state.Progress.solved}/{this.state.Progress.all}
						</p>
						{AllLevel}
					</Row>
				</div>
			</main>
		);
	}
}

export default withRouter(Home);
