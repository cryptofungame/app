import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { api } from "@cityofzion/neon-js";
import BigNumber from "bignumber.js";
import { Col, Modal, Button, Row, Preloader, Dropdown, NavItem } from "react-materialize";
import Credit, { setCreditValue } from "./Credit";
import Send from "../common/send";
import AllTruncatedFunction from "./truncate";
import Bag from "../Images/Bag.svg";
import NEOICON from "../Images/NEO.svg";
import success from "../Images/success.svg";
import config from "../common/config";

export const toBigNumber = value => new BigNumber(value);
class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			UserArray: [],
			truncatedPrivateKey: "",
			toggle: true,
			truncatedPrivateKeyArray: [],
			GAS: "",
			NEO: "",
			Packages: [],
			PackageArray: [],
			PaymentComponent: false,
			Loader: false,
			PackagesComponent: true,
			refId: "",
			PackagesPlaceHolder: "Choose Packages...",
			visible: false
		};
	}

	Logout = () => {
		localStorage.removeItem("User");
		this.props.history.push("/login");
	};

	GasNeoValue = (token, privateKey) => {
		const user = JSON.parse(localStorage.getItem("User"));

		api.neoscan
			.getBalance("MainNet", user.address)
			.then(result => {
				// console.log(result);
				if (result.assets.GAS && result.assets.NEO) {
					const { GAS, NEO } = result.assets;
					this.setState({
						NEO: toBigNumber(NEO.balance).toString(),
						GAS: toBigNumber(GAS.balance).toString()
					});
				} else {
					this.setState({
						NEO: 0,
						GAS: 0
					});
				}
			})
			.catch(e => {
				console.log(e);
			});
	};

	GetPackages = () => {
		fetch(`${config.baseURL}api/v1/plans`, {
			method: "GET"
		})
			.then(response => response.json())
			.then(json => {
				// console.log(json);
				this.setState({ Packages: json });
			})
			.catch(error => {
				console.log(error);
				this.setState({ Loader: false });
			});
	};

	componentWillMount() {
		const UserObject = JSON.parse(localStorage.getItem("User"));

		this.setState({ UserArray: UserObject });
		const truncatedPrivateKey = AllTruncatedFunction.truncate(UserObject.address);
		this.setState({
			truncatedPrivateKey: truncatedPrivateKey.next,
			truncatedPrivateKeyArray: truncatedPrivateKey
		});
		this.GasNeoValue(UserObject.api_token, UserObject.PrivateKey);
		this.GetPackages();
	}

	Toggle = () => {
		this.state.toggle === true
			? this.setState({
					truncatedPrivateKey: this.state.truncatedPrivateKeyArray.prev,
					toggle: false
			  })
			: this.setState({
					truncatedPrivateKey: this.state.truncatedPrivateKeyArray.next,
					toggle: true
			  });
	};

	BuyCoins = () => {
		const { PackageArray } = this.state;
		if (PackageArray.length === 0) {
			window.Materialize.toast("select packages", 3000);
		} else {
			this.setState({ Loader: true, PackagesComponent: false });
			const user = JSON.parse(localStorage.getItem("User"));
			const buyCoins = Send({
				fromAd: user.address,
				fromPK: user.PrivateKey,
				value: {
					id: PackageArray.id,
					type: PackageArray.type.toUpperCase(),
					amount: PackageArray.amount * 1
				}
			});

			buyCoins
				.then(res => {
					// console.log(res);
					if (res) {
						setCreditValue(res.new_credit);
						this.setState({
							Loader: false,
							PaymentComponent: true,
							refId: res.hash
						});
						window.Materialize.toast(res.message, 3000, "red");
					} else {
						this.setState({ Loader: false, PackagesComponent: true });
						window.Materialize.toast("not enough credit in your wallet", 3000);
					}
				})
				.catch(err => {
					console.log(err);
					this.setState({ Loader: false, PaymentComponent: true });
					window.Materialize.toast(err, 3000);
				});
		}
	};

	SetPackageArray = packages => {
		this.setState({
			PackageArray: packages,
			PackagesPlaceHolder: `${packages.coins} COINS — ${
				packages.amount
			} ${packages.type.toUpperCase()}`
		});
		// console.log(packages);
	};

	render() {
		const PackagesItem = this.state.Packages.map(packages => {
			return (
				<div key={packages.id} onClick={this.SetPackageArray.bind(this, packages)}>
					<li>
						<span>
							{packages.coins} COINS — {packages.amount} {packages.type.toUpperCase()}
						</span>
					</li>
					<NavItem divider />
				</div>
			);
		});

		return (
			<Row>
				<Col m={12} l={12} className="HeaderSectionsContainer">
					<Col s={12} l={6} m={7} className="HeaderLeftSection NonPadding">
						<Link to="/home">
							<img src={NEOICON} alt="NEO" className="ProfilePicture" />
						</Link>
						{/* <img
							src={`${this.state.UserArray.avatar}`}
							alt="avatar"
							className="ProfilePicture"
						/> */}
						<p className="RobotoMonoRegular ProfilesDetailText WalletDetailText">
							Wallet:
							<br />
							<a className="WalletKey" onClick={this.Toggle}>
								{this.state.truncatedPrivateKey}
							</a>
							<a className="LogoutButton" onClick={this.Logout}>
								(LOGOUT)
							</a>
						</p>
						<p className="RobotoMonoRegular ProfilesDetailText NeoText">
							NEO:
							<br />
							<span>{this.state.NEO}</span>
						</p>
						<p className="RobotoMonoRegular ProfilesDetailText GasText">
							GAS:
							<br />
							<span>{this.state.GAS}</span>
						</p>
					</Col>
					<Col s={12} l={6} m={5} className="HeaderRightSection NonPadding">
						<Credit />
						<Modal
							header="BUY COINS"
							className="BuyCoinDisplay"
							trigger={
								<a className="BuyCoinButton RobotoMedium">
									<img src={Bag} className="BagIcon" />
									BUY COINS
								</a>
							}
							actions={
								<div>
									{!this.state.PaymentComponent && (
										<Button
											flat
											waves="light"
											onClick={this.BuyCoins}
											className="BuyCoinButton RobotoMedium"
										>
											<img src={Bag} className="BagIcon" />
											BUY COINS
										</Button>
									)}
									<Button
										modal="close"
										flat
										waves="light"
										className="CancelModalButton"
									>
										Close
									</Button>
								</div>
							}
						>
							{/* PackagesComponent */}
							{this.state.PackagesComponent === true ? (
								<div className="BuyCoinModalContainer">
									{/* <p className="ModalHeader RobotoRegular">Select packages</p> */}
									<div className="PackagesSelectBox">
										<Dropdown
											trigger={
												<Button className="materialDropDown">
													{this.state.PackagesPlaceHolder}
												</Button>
											}
										>
											{PackagesItem}
										</Dropdown>
									</div>
								</div>
							) : null}
							{/* PackagesComponent */}

							{/* Loader */}
							{this.state.Loader === true ? <Preloader size="small" /> : null}
							{/* Loader */}

							{/* PaymentComponent */}
							{this.state.PaymentComponent === true ? (
								<div className="successModal">
									<img src={success} className="SucessImage" />
									<p className="ModalHeader RobotoRegular success">
										Your payment is successful
									</p>
									<p className="ModalText RobotoRegular">
										Tracking Code:
										<br />
										<a
											target="_blank"
											href={`https://neoscan.io/transaction/${
												this.state.refId
											}`}
											style={{ wordBreak: "break-all" }}
										>
											{this.state.refId}
										</a>
									</p>
								</div>
							) : null}
							{/* PaymentComponent */}
						</Modal>
					</Col>
				</Col>
			</Row>
		);
	}
}

export default withRouter(Header);
