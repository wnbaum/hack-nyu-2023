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
		width: 50vw;
		height: 50vh;
		background: red;
	}
</style>
  