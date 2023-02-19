<script>
	import Summary from "./games/Summary.svelte"
	import Quiz from "./games/Quiz.svelte"
	import MultipleChoice from "./games/MultipleChoice.svelte"
	import FillInTheBlank from "./games/FillInTheBlank.svelte"
	
	let topic;
	let summary;
	let question;
	let answer;
	let fact;
	let keywords;
	let answerChoices;
	let questionMulti;

    export const setLearnData = (data) => {
		topic = data.topic
        summary = data.summary
		question = data.question
		answer = data.answer
		fact = data.fact
		keywords = data.keywords
		questionMulti = data.questionMulti
		answerChoices = data.answerChoices

		initialize(fact, keywords)
	}
	
	let index = 0;

	function chooseTab(_index) {
		index = _index
	}

	let initialize;
</script>

<main class="main">
	<div class="stack">
		<div class="navbar">
			<button id="nav0" on:click={() => chooseTab(0)}>Summary</button>
			<button id="nav1" on:click={() => chooseTab(1)}>Quiz</button>
			<button id="nav2" on:click={() => chooseTab(2)}>Blanks</button>
			<button id="nav3" on:click={() => chooseTab(3)}>Multiple Choice</button>
		</div>
		<h1 class="title">{topic}</h1>
		<div id="sliderWrapper">
			<div id="gamesWrapper" style="--index:{index}">
				<Summary summary={summary}/>
				<Quiz topic={topic} question={question} answer={answer}/>
				<FillInTheBlank bind:intialize={initialize} topic={topic}/>
				<MultipleChoice  topic={topic} questionMulti={questionMulti} answerChoices={answerChoices}/>
			</div>
		</div>
	</div>
</main>

<style>

	.title {
		width: 100%;
        font-size: 5vh;
        font-weight: bold;
        font-family: "Roboto";
		margin: 0;
		margin-bottom: 1vh;
		margin-top: 5vh;
    }

	.main {
		position: relative;
		width: 70vh;
		height: 70vh;
		margin-right: 50vw;
		background: var(--secondary);
		padding: 4vh;
		overflow: hidden;
	}
	
    .navbar {
		display: flex;
		justify-content: space-between;
	}

	.navbar button {
		position: relative;
        font-size: 2.5vh;
		outline: none;
		border: none;
		color: var(--text);
		background: none;
		margin: 0;
		cursor: pointer;
		padding: 0;
	}
	.navbar button::after {
		content: "";
		position: absolute;
		top: calc(50% + 2vh);
		left: 50%;
		transform: translate(-50%, -50%);
		width: 0px;
		height: 4px;
		opacity: 0;
		background: var(--text);
		transition: width .3s ease-out, opacity .3s ease-out;
	}
	.navbar button:hover::after {
		opacity: 1;
		width: calc(100% - 1vh);
	}

	#gamesWrapper {
		position: absolute;
		display: flex;
		left: calc((-70vh - 50vw)*var(--index));
		transition: left 1s ease-in-out;
		height: 100%;
	}
	
	.stack {
		display: flex;
		flex-direction: column;
		height: 70vh;
	}

	#sliderWrapper {
		position: relative;
		flex: 1;
	}
</style>
  