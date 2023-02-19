<script>
	export let callback;

	let value = "";

    function enteredTopic() {
		callback(value)
    }

	let entered = false;

	export const hideThrobber = () => {
		entered = false
	}
</script>

<main class="main">
	<h1 class="title">Witee</h1>
	<input
	bind:value={value}
	placeholder="Type in a topic to explore"
	on:keydown={e => {
		if (e.key === 'Enter') {
			enteredTopic();
			value = ""
			entered = true;
		}
	}}
	>
	{#if entered}
		<div class="loader"></div>
	{/if}
</main>

<style>
	
	.loader {
		border: 2vh solid var(--secondary); 
		border-top: 2vh solid var(--text);
		border-radius: 50%;
		width: 10vh;
		height: 10vh;
		animation: spin 2s linear infinite;
		margin: auto;
		margin-top: 10vh;
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}

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
  