import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../Images/logo-green.svg";

export default class Index extends Component {
	render() {
		return (
			<div>
				<nav
					style={{
						zIndex: 1000,
						position: "relative",
						backgroundColor: "transparent",
						boxShadow: "none"
					}}
				>
					<div className="nav-wrapper" style={{ backgroundColor: "transparent" }}>
						<ul id="nav-mobile" className="right">
							<li>
								<Link to="/explorer">Explorer</Link>
							</li>
						</ul>
					</div>
				</nav>
				<div className="intro">
					<div className="LoginBoxContainer" style={{ marginTop: 0 }}>
						<img src={Logo} className="BaseLogo" alt="Logo" />
						<p className="BaseText">
							Cryptofun allows you to increase and challenge your blockchain
							knowledge, You have to guess the word correctly at each step using the
							images. This words can include the name of a coin's, exchanges or
							expression in cryptos!
							<br />
							<b>Let's challenge....</b>
						</p>
						<Link className="LoginHeader RobotoMonoBold startGame" to="/login">
							START GAME
						</Link>
						<div className="socials">
							<a
								href="https://github.com/cryptofungame"
								target="_blank"
								rel="noopener noreferrer"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width={24}
									height={24}
									viewBox="0 0 438.549 438.549"
								>
									<path
										fill="#eee"
										d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417-.098-9.709-.144-18.179-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
									/>
								</svg>
							</a>
							<a
								href="https://twitter.com/cryptofungame"
								target="_blank"
								rel="noopener noreferrer"
							>
								<svg xmlns="http://www.w3.org/2000/svg" width={21} height={18}>
									<g fill="none" fillRule="evenodd">
										<path d="M-3-3h24v24H-3z" />
										<path
											fill="#55ACEE"
											fillRule="nonzero"
											d="M21 2.0484c-.5952.8805-1.3147 1.6307-2.1586 2.2506.0089.1258.0133.3145.0133.566 0 1.168-.1688 2.3337-.5063 3.4972-.3376 1.1635-.8506 2.2798-1.539 3.349-.6885 1.069-1.508 2.0147-2.4585 2.8367-.9505.8221-2.0965 1.478-3.4378 1.9676-1.3414.4897-2.776.7345-4.304.7345-2.4073 0-4.6104-.6514-6.6091-1.9541.311.036.6574.0539 1.0393.0539 1.9988 0 3.7799-.62 5.3433-1.8598-.9327-.018-1.7677-.3077-2.505-.8692-.7374-.5615-1.2437-1.278-1.5191-2.1495.2932.045.564.0674.8128.0674.382 0 .7595-.0494 1.1326-.1483-.9949-.2066-1.8188-.7075-2.4717-1.5026-.653-.7951-.9794-1.7183-.9794-2.7694v-.054c.604.3415 1.2525.5256 1.9454.5526-.5863-.3953-1.0526-.912-1.399-1.5498-.3465-.638-.5198-1.3297-.5198-2.0754 0-.7906.1955-1.5229.5863-2.1967 1.075 1.3387 2.383 2.41 3.9242 3.2142 1.5413.804 3.1913 1.251 4.9502 1.3409-.071-.3414-.1066-.6738-.1066-.9973 0-1.2039.4197-2.2303 1.2592-3.0794C12.3322.4245 13.3471 0 14.5374 0c1.2437 0 2.292.4582 3.1447 1.3746.9683-.1887 1.8788-.539 2.7316-1.0512-.3287 1.0332-.9594 1.8328-1.8921 2.3989.8261-.0899 1.6523-.3145 2.4784-.6739z"
										/>
									</g>
								</svg>
							</a>
							<a
								href="https://t.me/cryptofungame"
								target="_blank"
								rel="noopener noreferrer"
							>
								<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
									<g fill="#1C9FE0" fillRule="nonzero">
										<path d="M0 22.1961C0 23.1924.8054 24 1.8039 24h20.3922C23.1924 24 24 23.1946 24 22.1961V1.8039C24 .8076 23.1946 0 22.1961 0H1.8039C.8076 0 0 .8054 0 1.8039v20.3922zM19.344 5.6757l-2.5716 13.1752c-.0605.311-.403.452-.6446.265l-3.5104-2.7146c-.2131-.1649-.5037-.1561-.7077.021l-1.9463 1.69c-.2259.1967-.5663.087-.6528-.2092l-1.3514-4.6295-3.4915-1.388c-.3547-.1415-.3578-.6748-.004-.82l14.3293-5.888c.3038-.1251.6172.1583.551.4981z" />
										<path d="M16.6386 7.9131l-7.0502 4.3743a.7177.7177 0 0 0-.3102.8044l.7623 2.6982c.0542.1912.3295.1717.356-.0259l.198-1.4796a1.2181 1.2181 0 0 1 .3739-.727l5.8183-5.4485c.109-.1017-.0214-.2742-.148-.1959z" />
									</g>
								</svg>
							</a>
						</div>
					</div>
				</div>
				<div className="wrapper reversed">
					<div className="bubble-wrap">
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
						<div className="bubble" />
					</div>
				</div>
			</div>
		);
	}
}
