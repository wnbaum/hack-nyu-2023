import { ChatGPTAPI } from 'chatgpt'

const api = new ChatGPTAPI({
    apiKey: process.env.OPENAI_API_KEY
})

async function getTopicSummary(topic) {
	const res = await api.sendMessage("Give me a basic summary of " + topic)
	console.log(res.text)
}

module.exports = {
	getTopicSummary,
	setAPI,
}