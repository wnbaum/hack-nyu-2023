var api

function init(apiKey, callback) {
	import("chatgpt")
	.then((c) => {	
		api = new c.ChatGPTAPI({
			apiKey: apiKey
		})

		callback()
	});
}

async function getTopicSummary(topic) {
	const res = await api.sendMessage("Give me a basic summary of " + topic)
	console.log(res.text)
}

module.exports = {
	init,
	getTopicSummary,
}