var api

function init(apiKey) {
	import("chatgpt")
	.then((c) => {	
		api = new c.ChatGPTAPI({
			apiKey: apiKey
		})
	});
}

async function getTopicSummary(topic) {
	const res = await api.sendMessage("Give me a basic summary of " + topic + ".")
	return res.text
}

async function getTopicQuestion(topic) {
	const res = await api.sendMessage("Remove pretext and context. Give me a simple quiz question about " + topic + ".")
	const res2 = await api.sendMessage("What is the answer to that question.", {
		conversationId: res.conversationId,
		parentMessageId: res.id
	})
	return [res.text, res2.text]
}

async function getTopicFact(topic) {
	const res = await api.sendMessage("Give me a basic fact about " + topic + ".")
	const res2 = await api.sendMessage("Remove pretext and context. Give me four key words from the previous fact seperated by commas.", {
		conversationId: res.conversationId,
		parentMessageId: res.id
	})
	return [res.text, res2.text]
}

async function getTopicFunFact(topic) {
	const res = await api.sendMessage("Give me a fun fact about " + topic + ".")
	return res
}

async function getTopicQuestionMulti(topic) {
	const res = await api.sendMessage("Remove pretext and context. Give me a simple quiz question about " + topic + ".")
	const res2 = await api.sendMessage(`
	This is an example of multiple choice answers:\n
	A) red\n
	B) blue\n
	C) green\n
	D) purple\n
	Now, write multiple choice answers for the previous question. Then, write the letter of the correct answer on a new line.
	`, {
		conversationId: res.conversationId,
		parentMessageId: res.id
	})
	return [res.text, res2.text]
}

module.exports = {
	init,
	getTopicSummary,
	getTopicQuestion,
	getTopicFact,
	getTopicQuestionMulti,
	getTopicFunFact
}