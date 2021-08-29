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
}

export type Component = ReturnType<typeof defineComponent>;

export type Route = {
	path: string;
	prefix?: string;
	name?: string;
	children?: Route[];
	component?: Component
	meta?: any;
	props?: any;
};
