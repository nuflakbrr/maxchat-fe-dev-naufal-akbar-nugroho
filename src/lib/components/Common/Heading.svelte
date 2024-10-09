<script>
	export let className = '';
</script>

<div class={`flex items-start gap-2 ${className}`}>
	<slot name="icon" />
	<slot name="title" />
</div>
