<script>
  	import Main from './pages/Main.svelte'
	let index = 0;
</script>

<main>
	<div id="pageWrapper" style="--index:{index}">
		<Main bind:index={index}/>
		<Main />
		<Main />
	</div>
</main>

<style>
	#pageWrapper {
		position: absolute;
		transform: translateY(-50%);
		left: calc(50% - 35vh - (70vh + 50vw)*var(--index));
		top: 50%;
		display: flex;
		transition: left 1s ease-in-out;
	}
</style>
