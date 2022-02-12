import { defineComponent } from 'vue';

/**
 * Library options.
 */
export interface Options {
	/**
	 * Route Name Seperator
	 * @default ':'
	 */

	seperator: string;

	/**
	 * Disable Vue Router Slash Rooting
	 * @default true
	 */

	disableRooting: boolean;

	/**
	 * Defines max routes depth
	 * @default 3 levels
	 */

	maxDepth: number;
}

export type Component = ReturnType<typeof defineComponent>;

export type Route = {
	path: string;
	prefix?: string;
	name?: string;
	children?: Route[];
	component?: void
	meta?: any;
	props?: any;
};
