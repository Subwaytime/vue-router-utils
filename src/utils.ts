import { Route } from './types';
import consola from 'consola';

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

/**
 * Check if Route is a Prefix Object
 * @param route
 */

export function isPrefix(route: Route) {
	return route.prefix && !route.name && !route.path && !route.component;
}

/**
 * Check if Path contains a dynamic Segment
 * @param path
 */

export function isDynamicSegment(path: string): boolean {
	return path.includes('/:') || path.includes(':');
}

/**
 * Get Name from dynamic Segment
 * @param segment
 */

export function getNameFromSegment(segment: string): string {
	const element = split(normalizeRoutePath(segment), '/').find((seg) => isDynamicSegment(seg));
	return split(element.replace(/(:|\/:)/g, ''), '_')[0];
}

/**
 * Normalize Route Path by removing forwarding Slash if existent
 * @param path
 */

export function normalizeRoutePath(path: string): string {
	return path.charAt(0) === '/' ? path.slice(1) : path;
}

/**
 * Simple Info/Warn/Error Consola Instance
 */

export const logger = consola.create({});