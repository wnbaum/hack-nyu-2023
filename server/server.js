const express = require("express");
require("dotenv").config()
const chat = require("./chat")

const app = express();
const port = process.env.PORT || "3000";

app.use(express.json());
app.use(express.static('./../dist'))

app.listen(port, () => {
    console.log("Listening to requests on port " + port);
});

app.post('/topic', async (req, res) => {
    let summary = await chat.getTopicSummary(req.body.topic);
    let question = await chat.getTopicQuestion(req.body.topic);
	let fact = await chat.getTopicFact(req.body.topic);
	let result = await chat.getTopicQuestionMulti(req.body.topic);

	res.json({"summary": summary, "question": question[0], "answer": question[1], "fact": fact[0], "keywords": fact[1], "questionMulti": result[0], "answerChoices": result[1]});
});

app.post('/topicQuestion', async (req, res) => {
    let question = await chat.getTopicQuestion(req.body.topic);

	res.json({"question": question[0], "answer": question[1]});
});

app.post('/topicFact', async (req, res) => {
    let fact = await chat.getTopicFact(req.body.topic);

	res.json({"fact": fact[0], "keywords": fact[1]});
});

app.post('/topicQuestionMulti', async (req, res) => {
    let result = await chat.getTopicQuestionMulti(req.body.topic);

	res.json({"questionMulti": result[0], "answerChoices": result[1]});
});

chat.init(process.env.OPENAI_API_KEY)

const { MessagingResponse } = require('twilio').twiml;

app.post('/sms', (req, res) => {
	const twiml = new MessagingResponse();

	twiml.message('The Robots are coming! Head for the hills!');

	res.type('text/xml').send(twiml.toString());
});

// const accountSid = "ACe10fc0a6296c3c20fed92626fc77684b";
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require("twilio")(accountSid, authToken);

// client.messages
// 	.create({ body: "Hello from Twilio", from: "+18777977411", to: "+16094238558" })
// 	.then(message => console.log(message.sid));