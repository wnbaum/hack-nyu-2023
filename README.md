![alt text](https://github.com/wnbaum/hack-nyu-2023/blob/main/src/assets/witee.png)

## Inspiration
We wanted to create a quick way to learn about a new subject and test your knowledge. ChatGPT has such a large knowledge base which we wanted to tap into to create a quick way to learn something new.

## What it does
Witee prompts the user for a topic of their choice and then generates helpful and engaging resources to encourage quick learning. Witee first gives the user a summary of the topic in order to familiarize them with something they may not know well. The user can then put their knowledge to the test in the form of quick trivia questions, a fill in the blank quiz, or multiple choice questions about the topic. When the user is satisfied, they can move back to the start screen and explore a new prompt.

Witee is not just a website. The user can also send a topic to Witee through their phone and it will respond with a fun fact about it.

## How we built it
Witee has both a front-end client and back-end server. The front-end is built with Svelte and uses reactive components for a more modular architecture. The back-end is an express.js server that serves the Svelte front-end and processes requests to the ChatGPT API, as well as handling text reply messages.

We designed the front-end in Figma first, which made it a lot easier to lay out our website in code.
We used many tools to help us build the project, including AWS to host the server, Twilio to process text messages, Domain.com to provide our domain name, and the OpenAI API to handle the natural language generation.

## Challenges we ran into
We ran into many problems during the development of Witee. First we started to write our back-end in Flask, because of a ChatGPT library. However, after finding out the library did not work with the current version of ChatGPT, we ended up switching to a Express.js back-end to utilize a more official ChatGPT API. This new API module used an experimental fetch which only worked in Node versions 18 and up, but our AWS EC2 instance only supported Node 17 which we unfortunately only found out later. We overcame this by using an experimental flag when running our server on the EC2 instance. We also some issues with Twilio where our phone number that would send back the fun facts would be blocked as it had not been toll-fee verified yet. This process takes weeks normally, so we decided to create a phone emulation to simulate what it would be like to text Witee. The emulation uses the exact same protocol as texts would, and as soon as the phone number is verified, it will start working with normal texts. Finally, we had some general troubles with ChatGPT, as it can sometimes produce unexpected output. We carefully designed our prompts to output expected results, and wrote functions to process them and display the formatted text correctly.

## Accomplishments that we're proud of
We are very happy at how well our website works. It is genuinely fun to interact with Witee, and we feel like we can throw whatever topic we want at it and it will give correct results most of the time. It was very satisfying figuring out AWS and being able to access our website like any other online. It was also cool to be able to text our website and see results come back.

## What we learned
We learned how to use Svelte to design modular and reactive front-end websites. We also learned how to use Express.js to host our front-end, as well as process any API requests from it. It was super interesting learning how to host our own website on an AWS EC2 instance (essentially a mini Linux computer), and learning how to code a client-server architecture was very insightful.

## What's next for Witee
Witee has so much potential in the future, especially with the release of an official ChatGPT API, as well as ChatGPT4, which will greatly increase the quality (and hopefully speed) of generated results. Soon, Witee could also implement more minigames such as collaborative learning with multiple people. We could utilize the current framework we have set up with Twilio and create a more interactive experience, and we could even connect others with each other over text.