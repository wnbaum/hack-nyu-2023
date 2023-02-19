<script>
    import { fade } from 'svelte/transition';
	
	export let topic;
	
	
    let visible = false;
	let loading = false;

	let displayQuestion = "";
	let displayChoices = [];

	let correct;
	
    function showAnswer() {
        visible = true;
    }

	function getNewQuestion() {

        loading = true
		visible = false

		fetch('/topicQuestionMulti', {
			method: 'POST',
			body: JSON.stringify({ topic: topic }),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then(res => res.json())
		.then(function(data) {
			process(data)
            loading = false
		});
	}

	export const initialize = (_questionMulti, _answerChoices) => {
		let data = {"questionMulti": _questionMulti, "answerChoices": _answerChoices}

		// clean
		for (let i = 0; i < 4; i++) {
			let choice = document.getElementById("choice" + i);
			if (choice != undefined && choice != null) {
				choice.setAttribute("style", "")
			}
		}
		process(data)
	}

	const onlyWhiteSpace = string => (/^\\s*$/.test(string)) 
	
	function process(data) {
		let answerChoices = data.answerChoices

		displayQuestion = data.questionMulti
		displayChoices = []

		let count = 0
		let found = false
		let arr = answerChoices.split(/\n/g)
		for (let i in arr) {
			if (!onlyWhiteSpace(arr[i]) && arr[i] != "" && count < 4) {
				displayChoices.push({"text": arr[i].replace(/\*/g, ""), "index": i});
				count += 1
			}
		}
		let lastLine = arr[arr.length-1];
		correct = 0;
		for (let i = lastLine.length-1; i >= 0; i--) {
			let c = lastLine.charAt(i);
			if (c === 'A') {
				correct = 0;
				break;
			} else if (c === 'B') {
				correct = 1;
				break;
			} else if (c === 'C') {
				correct = 2;
				break;
			} else if (c === 'D') {
				correct = 3;
				break;
			}
		}
	}

	function selectAnswer(choiceIndex) {
		document.getElementById("choice" + choiceIndex).setAttribute("style", "background: #dc2626")

		document.getElementById("choice" + correct).setAttribute("style", "background: #16a34a")
	}
</script>

<main class="main">
	{#if !loading}
		<p>{displayQuestion}</p>
		{#each displayChoices as choice}
			<button id={"choice" + choice.index} class="choice" on:click={() => {selectAnswer(choice.index)}}>{choice.text}</button>
		{/each}
	{/if}
	{#if !visible}
		{#if !loading}
			<button class="next" on:click={() => {
				getNewQuestion();
			}} in:fade="{{ delay: 1000, duration: 1000 }}" out:fade="{{ delay: 0, duration: 500 }}">
				>
			</button>
		{/if}
	{/if}
    {#if visible}
		<button class="next" on:click={() => {
				getNewQuestion();
			}} in:fade="{{ delay: 1000, duration: 1000 }}" out:fade="{{ delay: 0, duration: 500 }}">
			>
		</button>
	{/if}
</main>

<style>
	.main {
		width: 70vh;
		margin-right: 50vw;
        font-family: "Roboto";
		overflow-y: auto;
		overflow-x: hidden;
		position: relative;
	}
	
	p {
		margin: 0;
	}

    .text {
        width: 100%;
        font-size: 2vh;
        font-family: "Roboto";
		margin: 0;
		white-space: pre-line;
    }

	.next {
		position: absolute;
		right: 1vh;
		bottom: 1vh;
		font-size: 3vh;
		cursor: pointer;
		outline: none;
		border: 2px solid var(--text);
		padding: 0vh;
		background: var(--secondary);
		color: var(--text);
		width: 6vh;
		height: 6vh;
		border-radius: 1vh;
	}

	#answer {
		margin-top: 6vh;
		color: #16a34a;
	}

	.choice {
		display: block;
		border: none;
		cursor: pointer;
		outline: none;
		font-size: 2vh;
		background: var(--secondary);
		margin-left: 2vh;
		margin-top: 2vh;
		border: 2px solid var(--text);
		color: var(--text);
		border-radius: 2px;
		padding: 1vh;
		width: calc(100% - 4vh);
		text-align: left;
		transition: background 0.2s ease-in-out;
	}
	.choice:hover {
		background: var(--tertiary);
	}
</style>
  