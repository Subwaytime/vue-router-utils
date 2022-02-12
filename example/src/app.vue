<template>
	<div class="wrapper">
		<navigation />
		<router-view></router-view>
		<div class="routes">
			<h3> All Routes </h3>
			<ul>
				<tree
					v-for="(route, route_index) in routes"
					:current="route"
					:nodes="route.children"
					:key="route_index"
				/>
			</ul>
		</div>
	</div>
</template>


<script setup>
import navigation from './components/navigation.vue';
import tree from './components/tree.vue';
import { routes } from './router';
</script>