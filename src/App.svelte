<script>
  	import Main from './pages/Main.svelte'
	var index = 0;
</script>

<main>
	<div id="pageWrapper" style="--index:{index}">
		<Main />
		<Main />
		<Main />
	</div>
</main>

<style>
	#pageWrapper {
		position: absolute;
		transform: translateY(-50%);
		left: calc(50% - 35vh - 140vh*var(--index));
		top: 50%;
		display: flex;
		transition: left 1s ease-in-out;
	}
</style>
