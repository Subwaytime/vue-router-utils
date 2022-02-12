<template>
	<li :class="(current.name === $route.name ? 'node selected' : 'node')" @click.prevent="toggle">
		<div>
			<code>
				<span>
					Name: {{ current.name }}
				</span>
				<br />
				<span>
					Path: {{ current.path }}
				</span>
			</code>
		</div>
		<ul class="children-nodes" v-if="nodes">
			<tree
				v-for="(node, node_index) in nodes"
				:current="node"
				:nodes="node.children"
				:key="node_index"
				:depth="depth + 1"
				:visible="false"
			/>
		</ul>
	</li>
</template>

<script setup>
import { computed, defineProps, ref } from 'vue';

const props = defineProps({
	current: Object,
	nodes: Object,
	depth: {
		type: Number,
		default: 0
	},
	visible: {
		type: Boolean,
		default: true
	}
});

const state = ref(props.visible);
const toggle = () => state.value = !state.value;
const marker = props.nodes ? "'+'" : props.depth === 0 ? "" : "'-'";
const nodeType = computed(() => props.nodes ? 'parent-node' : 'child-node');
</script>

<style>

	.node {
		padding-left: 0.5rem;
	}

	.node > div {
		border-bottom: 1px solid #151515;
		padding: 0.5rem;
	}

	.selected {
		color: #4c6ef5;
	}

	.node::marker {
		color: #f03e3e;
		font-weight: bold;
		content: v-bind(marker);
	}
</style>