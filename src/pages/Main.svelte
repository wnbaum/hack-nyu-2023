<script>
</script>

<main>
    <div class='board'>
        <input
        placeholder="Enter text"
        on:keydown={e => e.key === 'Enter'}
        >
    </div>
</main>

<style>
    .board > input {
        font-size: 1.4em;
        grid-column: 1/3;
    }
</style>
  