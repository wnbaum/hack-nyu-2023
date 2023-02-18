import { ChatGPTAPI } from 'chatgpt'
import * as dotenv from 'dotenv'
dotenv.config()

const api = new ChatGPTAPI({
	apiKey: process.env.OPENAI_API_KEY
})

const res = await api.sendMessage('Give me a basic summary of how helicopters are built.')
console.log(res.text)