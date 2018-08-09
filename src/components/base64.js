const base64 = {
	encode: str => btoa(unescape(encodeURIComponent(str))),
	decode: str => decodeURIComponent(escape(atob(str)))
};

export default base64;
