import React, { Component } from "react";
import { Row } from "react-materialize";
import Spinner from "./Spinner.js";
import config from "../common/config.js";

export default class Explorer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loader: false,
			// UserFound: false,
			users: []
		};
	}

	componentWillMount() {
		this.GetLeaderboardData();
	}

	GetLeaderboardData = () => {
		this.setState({ loader: true });
		fetch(`${config.baseURL}api/v1/users`, {
			method: "GET"
		})
			.then(response => response.json())
			.then(json => {
				this.setState({
					loader: false,
					users: json
				});
			})
			.catch(error => {
				console.log(error);
				this.setState({ loader: false });
			});
	};

	GetUserFromAddress = () => {
		const address = this.refs.searchbox.value;
		if (address) {
			this.setState({ loader: true });
			fetch(`${config.baseURL}api/v1/search?address=${address}`, {
				method: "GET"
			})
				.then(response => response.json())
				.then(json => {
					this.setState({
						loader: false,
						users: {
							result: [json]
						}
					});
					// console.log(json);
					if (json.error) {
						window.Materialize.toast("Address not found!", 3000, "red");
					}
				})
				.catch(error => {
					console.log(error);
					window.Materialize.toast(error, 3000, "red");
					this.setState({ loader: false });
				});
		}
		return false;
	};

	render() {
		const { users } = this.state;
		const userTable = (
			<table className="responsive-table">
				<thead>
					<tr>
						<th>#</th>
						<th>Address</th>
						<th>Level</th>
					</tr>
				</thead>
				<tbody>
					{users.result &&
						users.result.map((user, index) => (
							<tr key={user.id}>
								<td>{user.rank}</td>
								<td>
									<code>{user.address}</code>
								</td>
								<td>{user.progress}</td>
							</tr>
						))}
				</tbody>
			</table>
		);
		if (this.state.loader === true) {
			return <Spinner />;
		}
		return (
			<main className="MainBody" style={{ paddingTop: "5vh" }}>
				<div className="container">
					<h2>Explorer</h2>
					<Row>
						<form onSubmit={this.GetUserFromAddress}>
							<div className="input-field col s6">
								<input
									id="icon_prefix"
									type="text"
									className="validate"
									ref="searchbox"
								/>
								<label htmlFor="icon_prefix"># Search Address</label>
							</div>
							<div className="col s6">
								<span className="blue badge" style={{ color: "#fff" }}>
									Total Users: {users.all_users}
								</span>
							</div>
						</form>
					</Row>
					<Row>
						{users.result ? (
							<div className="col s12">{userTable}</div>
						) : (
							<h3>
								Address not found! <a onClick={this.GetLeaderboardData}>Back</a>
							</h3>
						)}
					</Row>
				</div>
			</main>
		);
	}
}
