const express = require("express");
const chat = require("./chat")

const app = express();
const port = process.env.PORT || "3000";

require("dotenv").config()

app.use(express.json());
app.use(express.static('./dist'))

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

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const MessagingResponse = require('twilio').twiml.MessagingResponse;

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.post('/sms', async (req, res) => {
	const twiml = new MessagingResponse();

	let fact = await chat.getTopicFunFact(req.body.Body);

	twiml.message(fact);

	res.type('text/xml').send(twiml.toString());
});



// client.messages
// 	.create({ body: "Hello from Twilio", from: "+18777977411", to: "+16094238558" })
// 	.then(message => console.log(message.sid));