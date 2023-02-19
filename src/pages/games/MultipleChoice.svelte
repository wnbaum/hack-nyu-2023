<script>
    import { fade } from 'svelte/transition';

	export let topic;
    export let questionMulti;
    export let answerChoices;
	
    let visible = false;
	let loading = false;

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
			questionMulti = data.questionMulti
			answerChoices = data.answerChoices
            loading = false
		});
		
		
	}
</script>

<main class="main">
	{#if !loading}
		<!-- <p class="text" in:fade="{{ duration: 2000 }}" out:fade="{{ duration: 500 }}">{question}</p> -->
	{/if}
	{#if !visible}
		{#if !loading}
			<input
			in:fade="{{ delay: 1000, duration: 1000 }}" out:fade="{{ delay: 0, duration: 500 }}"
			id="input"
			placeholder="Enter your answer"
			on:keydown={e => {
				if (e.key === 'Enter') {
					showAnswer();
				}
			}}
			>
		{/if}
	{/if}
    {#if visible}
		<p id="answer" class="text" in:fade="{{ duration: 2000 }}" out:fade="{{ duration: 500 }}">
			<!-- Correct Answer: {answer} -->
        </p>
		<p id="youranswer" class="text" in:fade="{{ duration: 2000 }}" out:fade="{{ duration: 500 }}">
			<!-- Your Answer: {yourAnswer} -->
		</p>
		<button on:click={() => {
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

    input {
        width: 100%;
		font-size: 2vh;
		border: none;
		outline: none;
		background: transparent;
		color: var(--text);
		border-bottom: 4px solid var(--text);
		background: var(--tertiary);
		padding: 1vh;
        margin-top: 2vh;
		position: absolute;
		height: calc(4vh - 4px);
		bottom: 1vh;
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

	button {
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
</style>
  