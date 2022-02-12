import type { Options } from './types';

export const MODULE_NAME = 'vue-router-utils';

export const config: Required<Options> = {
	seperator: ':',
	disableRooting: true,
	maxDepth: 3
};