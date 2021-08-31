<template>
	<code>
		Name: {{ $route.name }}
		<br />
		Path: {{ $route.path }}
		<br />
		Params: {{ $route.params }}
	</code>
</template>

<script>
export default {
	name: 'routeName'
};
</script>