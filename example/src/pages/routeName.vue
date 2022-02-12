<template>
	<code>
		<span>
			Name: {{ $route.name }}
		</span>
		<br />
		<span>
			Path: {{ $route.path }}
		</span>
		<br />
		<span>
			Params: {{ $route.params }}
		</span>
	</code>
</template>

<script>
export default {
	name: 'routeName'
};
</script>