<script>
    import { fade } from 'svelte/transition';

    export let topic;

    let visible = false;
    let loading = false;
    
	let factElement;
	let answerElement;

	function getNewFact() {

		visible = false
		loading = true

		fetch('/topicFact', {
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

	function process(data) {
		visible = false

		let fact = data.fact
		let keywords = data.keywords.split(",").map(x => {
			if (x.charAt(0) == " ") {
				return x.substring(1)
			} else {
				return x
			}
		})

		factElement.innerHTML = ""
		answerElement.innerHTML = ""

		var toReplace = []

		for (let i in keywords) {
			let re = new RegExp(keywords[i].toLowerCase(), "g");
			let matches;
			let lowerFact = fact.toLowerCase();
			while (matches = re.exec(lowerFact)) {
				toReplace.push({"index": matches.index, "wordIndex": i})
			}
		}
		
		toReplace.sort((a,b) => {
			return a.index - b.index 
		})

		let i = 0;
		for (let j in toReplace) {
			factElement.innerHTML += fact.substring(i, toReplace[j].index)
			factElement.innerHTML += `<input style="background: none; outline: none; border: none; color: var(--text); font-size: 2vh; border-bottom: 2px solid var(--text); width: 16vh; text-align: center;"></input>`
			
			answerElement.innerHTML += fact.substring(i, toReplace[j].index)
			answerElement.innerHTML += `<span style="color: #16a34a">` + fact.substring(toReplace[j].index, toReplace[j].index + keywords[toReplace[j].wordIndex].length) + `</span>`
			
			i = toReplace[j].index + keywords[toReplace[j].wordIndex].length
		}
		factElement.innerHTML += fact.substring(i, fact.length)
		answerElement.innerHTML += fact.substring(i, fact.length)
	}

	export const intialize = (_fact, _keywords) => {
		let data = {"fact": _fact, "keywords": _keywords}
		process(data)
	}
	
    function confirmAnswers() {
        visible = true;
    }
</script>

<main class="main">
    <p bind:this={factElement}></p>

    {#if !visible && !loading}
        <button on:click={() => {
            confirmAnswers();
        }} in:fade="{{ delay: 1000, duration: 1000 }}" out:fade="{{ delay: 0, duration: 500 }}">
        ✓
        </button>
    {/if}

    {#if visible && !loading}
    <button on:click={() => {
        getNewFact();
    }} in:fade="{{ delay: 1000, duration: 1000 }}" out:fade="{{ delay: 0, duration: 500 }}">
    >
    </button>
    {/if}

    <p class="fact" style="opacity: {visible ? "1" : "0"};" bind:this={answerElement}></p>

    
</main>

<style>
	.main {
		width: 70vh;
		margin-right: 50vw;
		position: relative;
	}

	p {
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

	.fact {
		margin-top: 6vh;
		transition: opacity 2s ease-in-out;
	}
</style>
  