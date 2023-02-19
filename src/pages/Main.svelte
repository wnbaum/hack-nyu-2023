<script>
	export let callback;

	let value = "";

    function enteredTopic() {
		callback(value)
    }
</script>

<main class="main">
	<h1 class="title">Chat Bot</h1>
	<input
	bind:value={value}
	placeholder="Type in a topic to explore"
	on:keydown={e => {
		if (e.key === 'Enter') {
			enteredTopic();
		}
	}}
	>
</main>

<style>
    .title {
        text-align: center;
		width: 100%;
        font-size: 7vh;
        font-weight: bold;
        font-family: "Roboto";
    }

	.main {
		width: 70vh;
		height: 70vh;
		margin-right: 50vw;
	}

    input {
		width: 100%;
		font-size: 4vh;
		border: none;
		outline: none;
		background: transparent;
		color: var(--text);
		border-bottom: 4px solid var(--text);
		padding-bottom: 1vh;
	}
</style>
  