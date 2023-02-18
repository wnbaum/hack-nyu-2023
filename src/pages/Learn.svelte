<script>
    export let index = 1;
    let value = "";

    function changeIndex(){
       index = (index + 1)%3;
    }
</script>

<main class="main">
    <div class='board'>
        <p>Learning!</p>
    </div>
</main>

<style>
	.main {
		width: 70vh;
		height: 70vh;
		background: red;
		margin-right: 50vw;
	}

    .board {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 1em;
		max-width: 36em;
		margin: 0 auto;
	}
</style>
  