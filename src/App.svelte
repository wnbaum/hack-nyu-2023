<script>
  	import Main from './pages/Main.svelte'
	import Learn from './pages/Learn.svelte'
	let index = 0;

	let callback = (topic) => {
		
		fetch('/topic', {
			method: 'POST',
			body: JSON.stringify({ topic: topic }),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then(res => res.json())
		.then(function(data) {
			data["topic"] = topic
			setLearnData(data)
			index = 1
			hideThrobber()
		});
		
		// index = 1
		// setLearnData({"topic": "Cats", "summary": "Catssssssssssssss wooo.", "question": "Why are cats so cute?", "answer": "because they are.", "fact": "fact", "keywords": "fact", "questionMulti": "question", "answerChoices": "aaaaa"});
		// // index = 1
	}

	let setLearnData;
	let hideThrobber;

	let setTopIndex = (_index) => {
		index = _index
	}
</script>

<main>
	<div id="pageWrapper" style="--index:{index}">
		<Main callback={callback} bind:hideThrobber={hideThrobber}/>
		<Learn bind:setLearnData={setLearnData} setTopIndex={setTopIndex}/>
	</div>
</main>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap');

	#pageWrapper {
		position: absolute;
		transform: translateY(-50%);
		left: calc(50% - 35vh - (70vh + 50vw)*var(--index));
		top: 50%;
		display: flex;
		transition: left 1s ease-in-out;
	}
</style>
