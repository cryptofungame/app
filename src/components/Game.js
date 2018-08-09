import React, { Component } from "react";
import { Col, Modal, Button, Row, Preloader, Badge } from "react-materialize";
import { withRouter } from "react-router-dom";
import cx from "classnames";
import Header from "./Header";
import { setCreditValue } from "./Credit";
import Spinner from "./Spinner";
import base64 from "./base64";
// import Captcha from "./captcha";
import config from "../common/config";
import back from "../Images/back.svg";

class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
			values: [],
			inputSize: "",
			Loader: false,
			questionArray: [],
			UserFound: false,
			UserArray: [],
			QuestionSlug: "",
			validationError: false,
			ButtonLoader: false,
			showModal: false
		};
	}

	RenderInput() {
		return Array.apply(null, Array(this.state.inputSize)).map((el, i) => (
			<React.Fragment key={i}>
				<Col l={2} m={3} s={6}>
					<input
						type="text"
						ref={`input[${i}]`}
						maxLength="1"
						className="Input"
						placeholder="a"
						// value={this.state.values[i] ? this.state.values[i] : "0"}
						onKeyUp={this.onKeyDown.bind(this, i)}
						// onChange={this.onChange.bind(this)}
						// value={this.state.values[i]}
					/>
				</Col>
			</React.Fragment>
		));
	}

	onKeyDown(index, e) {
		const value = e.target.value;
		const key = e.keyCode ? e.keyCode : e.which;
		const valuesArray = this.state.values;

		if (key === 8 && !value) {
			const prevInput = this.refs[`input[${index - 1}]`];
			valuesArray[index] = null;

			if (prevInput) {
				prevInput.focus();
			}
		}

		if (value) {
			const nextInput = this.refs[`input[${index + 1}]`];
			valuesArray[index] = value;
			if (nextInput) {
				nextInput.focus();
			}
		}

		this.setState({
			values: valuesArray
		});
	}

	GetQuestionDetail = (token, slug) => {
		this.setState({ Loader: true });
		fetch(`${config.baseURL}/neo-game/public/api/v1/user-questions/${slug}`, {
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
					questionArray: json,
					inputSize: json.answer_length
				});
				// console.log(this.state.inputSize);
			})
			.catch(error => {
				console.log(error);
				this.setState({ Loader: false });
			});
	};

	ShowHint = () => {
		this.setState({ Loader: true });
		fetch(`${config.baseURL}/neo-game/public/api/v1/show-hint/${this.state.QuestionSlug}`, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: this.state.UserArray.api_token
			}
		}).then(response => {
			if (response.status === 200) {
				response.json().then(json => {
					setCreditValue(json.credit);
					const tempValues = [];
					this.setState({ Loader: false });
					json.hint.map((hash, index) => {
						let _hash = null;
						if (hash) {
							_hash = base64.decode(hash);
						}
						tempValues[index] = _hash;
						this.refs[`input[${index}]`].value = _hash;
					});
					this.setState({
						values: tempValues
					});

					this.forceUpdate();
					this.RenderInput();
					// console.log(json);
				});
			} else {
				this.setState({ Loader: false });
				window.Materialize.toast("credit is not enough!", 2000);
			}
		});
	};

	ShowAnswer = () => {
		this.setState({ Loader: true });
		fetch(`${config.baseURL}/neo-game/public/api/v1/show-answer/${this.state.QuestionSlug}`, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: this.state.UserArray.api_token
			}
		}).then(response => {
			if (response.status === 200) {
				response.json().then(json => {
					setCreditValue(json.credit);
					const tempValues = [];
					this.setState({ Loader: false });
					json.answer.map((hash, index) => {
						let _hash = null;
						if (hash) {
							_hash = base64.decode(hash);
						}
						tempValues[index] = _hash;
						this.refs[`input[${index}]`].value = _hash;
					});
					this.setState({
						values: tempValues
					});

					this.forceUpdate();
					this.RenderInput();
					// console.log(json);
				});
			} else {
				this.setState({ Loader: false });
				window.Materialize.toast("credit is not enough!", 2000);
			}
		});
	};

	componentWillMount() {
		const UserObject = JSON.parse(localStorage.getItem("User"));
		const { match } = this.props;
		const slugId = match.params.id;
		if (UserObject !== null) {
			this.setState({ UserFound: true });
			this.setState({ UserArray: UserObject, QuestionSlug: slugId });
			this.GetQuestionDetail(UserObject.api_token, slugId);
		} else {
			this.setState({ UserFound: false });
			this.props.history.push("/");
		}
	}

	back = () => {
		this.props.history.push("/question");
	};

	CheckAnswer = (event, index) => {
		const values = this.state.values;
		// console.log(values);
		if (values.length === this.state.inputSize) {
			this.setState({ ButtonLoader: true });
			fetch(`${config.baseURL}/neo-game/public/api/v1/answer/${this.state.QuestionSlug}`, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: this.state.UserArray.api_token
				},
				body: JSON.stringify({
					answer: this.state.values.join("")
				})
			}).then(response => {
				response.json().then(json => {
					if (response.status === 200) {
						setCreditValue(json.credit);
						this.setState({
							ButtonLoader: false,
							validationError: false,
							showModal: json
						});
						window.jQuery("#modal").modal("open");

						// console.log(json);
					} else {
						// console.log(json);
						window.Materialize.toast(json.message, 2000);
						this.setState({
							validationError: true,
							ButtonLoader: false
						});
					}
				});
			});
			event.preventDefault();
			// console.log(this.state.values);
		} else {
			window.Materialize.toast("please fill the input", 2000);
			this.setState({
				validationError: true
			});
		}
	};

	render() {
		// let boxClass = ["CheckAnswerButton", "RobotoMonoBold"];
		// if (this.state.validationError === true) {
		// 	boxClass.push("Vibration", "RedBackground");
		// }

		if (this.state.Loader === true) {
			return <Spinner />;
		}

		// console.log(this.state.values);
		return (
			<Row className="MainBody Game">
				{this.state.UserFound === true ? <Header /> : null}
				<Col l={12} m={12} s={12} className="GameContainer">
					<div className="container">
						{/* <GameHeader currentLevel={this.state.questionArray.title} /> */}
						<Col s={12} m={12} l={12} className="GameNavbarBox NoPadding">
							<Col s={12} l={6} m={7} className="GameNavbarLeftBox NoPadding">
								<div className="GameLeftNavbarSecion">
									<a className="BackText RobotoMonoBold" onClick={this.back}>
										<img src={back} className="BackIcon" />BACK
									</a>
									<span className="QuestionNumber RobotoMonoBold">
										Question #{this.state.questionArray.title}:
									</span>
								</div>
							</Col>
							<Col s={12} l={6} m={5} className="GameNavbarRightBox NoPadding">
								<div className="test">
									<Modal
										header="SHOW HINT"
										trigger={
											<a className="GameNavbarButton RobotoRegular ShowHint">
												SHOW HINT
											</a>
										}
										actions={
											<div>
												<Button
													flat
													modal="close"
													waves="light"
													onClick={this.ShowHint}
													className="BuyCoinButton"
												>
													YES
												</Button>
												<Button
													modal="close"
													flat
													waves="light"
													className="CancelModalButton"
												>
													NO
												</Button>
											</div>
										}
									>
										<p className="ModalHeader RobotoRegular">
											Are you sure to continue?
											<Badge className="new badge red">-10 coins</Badge>
										</p>
										{/* <Captcha /> */}
									</Modal>
									<p className="GameNavbarButtonDescription RobotoItalic">
										- 10 coins
									</p>
								</div>
								<div className="test">
									<Modal
										header="SHOW ANSWER"
										trigger={
											<a className="GameNavbarButton RobotoRegular ShowAnswer">
												SHOW ANSWER
											</a>
										}
										actions={
											<div>
												<Button
													flat
													modal="close"
													waves="light"
													onClick={this.ShowAnswer}
													className="BuyCoinButton"
												>
													YES
												</Button>
												<Button
													modal="close"
													flat
													waves="light"
													className="CancelModalButton"
												>
													NO
												</Button>
											</div>
										}
									>
										<p className="ModalHeader RobotoRegular">
											Are you sure to continue?
											<Badge className="new badge red">-20 coins</Badge>
										</p>
									</Modal>
									<p className="GameNavbarButtonDescription RobotoItalic">
										- 20 coins
									</p>
								</div>
							</Col>
						</Col>
						<Col l={12} m={12} s={12}>
							<div className="GameContent">
								<img
									src={`${this.state.questionArray.image_source}`}
									className="GameImage"
								/>
								<Col l={12} m={12} s={12} className="GameInputBox">
									<form onSubmit={this.CheckAnswer}>{this.RenderInput()}</form>
								</Col>
								<a
									className={cx("RobotoMonoBold", "CheckAnswerButton", {
										RedBackground: this.state.validationError,
										Vibration: this.state.validationError
									})}
									onClick={this.CheckAnswer}
								>
									{this.state.ButtonLoader === true ? (
										<Preloader size="small" />
									) : (
										"CHECK ANSWER"
									)}
								</a>
							</div>
						</Col>
					</div>
				</Col>

				{this.state.showModal && (
					<Modal
						id="modal"
						header={this.state.showModal.message.toUpperCase()}
						className="BuyCoinDisplay"
						actions={
							<Button modal="close" flat waves="light" className="CancelModalButton">
								Close
							</Button>
						}
					>
						<div className="successAnswer">
							<img
								src={this.state.showModal.image_source}
								alt={this.state.showModal.message}
							/>
							<a href="eterum.org" target="_blank">
								eterum.org
							</a>

							<p>{this.state.showModal.answer_description}</p>
						</div>
					</Modal>
				)}
			</Row>
		);
	}
}

export default withRouter(Game);
