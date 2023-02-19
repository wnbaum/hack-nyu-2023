<script>
	export let summary;
</script>

<main class="main">
    <p class="summary">{summary}</p>
</main>

<style>
	/* width */
	::-webkit-scrollbar {
		width: 8px;
	}

	/* Track */
	::-webkit-scrollbar-track {
		border-radius: 10px;
		background: var(--primary);
	}
	
	/* Handle */
	::-webkit-scrollbar-thumb {
		background: var(--text); 
		border-radius: 10px;
	}

	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
		background: #ccc; 
	}

    .summary {
        width: 100%;
        font-size: 2vh;
        font-family: "Roboto";
		margin: 0;
		margin-bottom: 1vh;
		white-space: pre-line;
    }

	.main {
		width: 70vh;
		margin-right: 50vw;
        font-family: "Roboto";
		overflow-y: auto;
	}
</style>
  