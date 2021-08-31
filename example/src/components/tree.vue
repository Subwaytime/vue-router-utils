<template>
	<li :class="(current.name === $route.name ? 'node selected' : 'node')">
		<div :style="(nodes ? 'cursor: pointer' : 'cursor: default' )" type="button" @click.prevent="show = !show" v-if="current">
			{{ rc(current) }}
		</div>
		<ul v-if="nodes && show">
			<tree
				v-for="(node, node_index) in nodes"
				:current="rc(node)"
				:nodes="node.children"
				:key="node_index"
			/>
		</ul>
	</li>
</template>

<script>
import { ref } from 'vue';
export default {
	name: "tree",
	props: {
		current: Object,
		nodes: Object
	},
	setup(props) {
		const show = ref(true);
		const marker = props.nodes ? "'+'" : "'-'";

		function rc(node) {
			if(node.children) {
				delete node.children;
				return node;
			}

			return node;
		}

		return {
			rc,
			marker,
			show
		}
	}
};
</script>

<style>
	.node > div {
		margin-left: 0.25em;
	}

	.selected {
		color: #4c6ef5;
	}

	.node::marker {
		color: #f03e3e;
		font-weight: bold;
		font-size: 1.1rem;
		content: v-bind(marker);
	}
</style>