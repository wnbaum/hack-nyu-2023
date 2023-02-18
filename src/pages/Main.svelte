<script>
</script>

<main class="main">
    <div class='board'>
        <input
        size = "100"
        height = "100"
        placeholder="Type in a topic to explore"
        on:keydown={e => e.key === 'Enter'}
        >
    </div>
</main>

<style>
	.main {
		width: 70vh;
		height: 70vh;
		background: red;
		margin-right: 70vh;
	}

    .board {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 1em;
		max-width: 36em;
		margin: 0 auto;
	}

    .board > input {
        font-size: 2em;
        grid-column: 1/3;
    }
</style>
  