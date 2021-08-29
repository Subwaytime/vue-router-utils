import { Route } from './types';

/**
 * Split String on Seperator into Array
 * @param string
 * @param seperator
 */

export function split(string: string, seperator: string): string[] {
	return string.split(seperator);
}

/**
 * Turns a Value into Array
 * @param string
 * @param seperator
 */

export function toArray<T>(value: T | T[]): T[] {
	if(Array.isArray(value)) {
		return value;
	} else {
		return [value];
	}
}

/**
 * Check if Value is Empty
 * supports: Array, Object, String
 * @param value
 */

export function empty(value: any) {
	if (value === null || value === undefined || value === '{}' || value === '') {
		return true;
	}

	if (Array.isArray(value) && Object.keys(value).length <= 0) {
		return true;
	}

	return false;
}

export function isPrefix(route: Route): boolean {
	return route.prefix && !route.name && !route.path && !route.component;
}

export function isDynamicSegment(path: string): boolean {
	return path.includes('/:') || path.includes(':');
}

export function getNameFromSegment(segment: string): string {
	const element = split(normalizeRoutePath(segment), '/').find((seg) => isDynamicSegment(seg));
	return split(element.replace(/(:|\/:)/g, ''), '_')[0];
}

export function normalizeRoutePath(path: string): string {
	return path.charAt(0) === '/' ? path.slice(1) : path;
}