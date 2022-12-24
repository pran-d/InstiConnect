const checkExpiry = function (token, username) {
	let base64Payload = token.split(".")[1];
	let payloadBuffer = Buffer.from(base64Payload, "base64");
	let payload = JSON.parse(payloadBuffer.toString());
	if (payload.username === username) {
		if (payload.exp * 1000 < Date.now()) {
			return false;
		}
	}
};

export default checkExpiry;
