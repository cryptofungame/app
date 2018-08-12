import Neon, { api } from "@cityofzion/neon-js";
import randomstring from "randomstring";
import config from "./config";

export default async function Send({
	toAd = "AN8cdwvqSzFjDxpftoQsz2xNuh7N27ChCk",
	fromAd,
	fromPK,
	value = {}
}) {
	const { type, amount, id } = value;
	const config = {
		net: "MainNet",
		address: fromAd,
		privateKey: fromPK,
		intents: api.makeIntent({ [type]: amount }, toAd)
	};

	const leftPad = randomstring.generate({
		length: 6,
		charset: "hex"
	});

	const rightPad = randomstring.generate({
		length: 3,
		charset: "hex"
	});

	try {
		const sendAsset = await Neon.sendAsset(config);
		const { txid, result } = sendAsset.response;

		if (result) {
			const hash = `${leftPad}${txid}${rightPad}&${id}`;
			const postHash = await fetchAsync(hash);

			return postHash;
		} else {
			window.Materialize.toast("Transaction failed. Try Again!.", 3000, "red");
		}
	} catch (err) {
		console.error(err);
		window.Materialize.toast(err, 3000, "red");
	}
}

async function fetchAsync(hash) {
	const user = JSON.parse(localStorage.getItem("User"));

	try {
		const response = await fetch(`${config.baseURL}api/v1/transaction`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: user.api_token
			},
			body: JSON.stringify({
				hash
			})
		});

		const data = await response.json();
		// only proceed once second promise is resolved
		return data;
	} catch (err) {
		console.error(err);
		window.Materialize.toast(err, 3000, "red");
	}
}
