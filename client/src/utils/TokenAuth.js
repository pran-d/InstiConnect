const TokenAuth = function (token) {
	let base64Payload = token.split(".")[1];
	let payloadBuffer = Buffer.from(base64Payload, "base64");
	let payload = JSON.parse(payloadBuffer.toString());
	return payload;
};

export default TokenAuth;
