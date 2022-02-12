import { Options, Route } from './types';
import { isEmpty, getNameFromSegment, isDynamicSegment, isPrefix, logger, normalizeRoutePath, split, toArray, abort } from './utils';

import { config } from './constant';

export class RouterUtilities {
	readonly options: Options;
	private routes: Route[];

	constructor(routes: Route[], options?: Partial<Options>) {
		this.routes = routes;
		this.options = Object.assign({}, config, options);
		return this.format() as any;
	}

	/**
	 *
	 * @returns
	 */

	format(): Route[] {
		const parsedRoutes = this.parse(this.routes);

		return parsedRoutes.sort((a: Route, b: Route): any => {
			// sort every error route at the end of routes array
			if (a.name && a.name.includes('error')) {
				return 1;
			}

			if (a.path && b.path) {
				// sort routes alphabetically per route path
				a.path.localeCompare(b.path);
			}
		});
	}

	/**
	 *
	 * @param routes
	 * @param parentRoute
	 * @returns
	 */

	parse(routes: Route | Route[], depth: number = 0, parent?: Route): Route[] {
		let fixedRoutes: Route[] = [];

		if (depth === this.options.maxDepth) {
			abort(`Your Routes go beyond the max depth of ${this.options.maxDepth}! Try using a prefix or simplyfy your Routes.`);
		}

		toArray(routes).filter((route: Route) => {
			if (isPrefix(route)) {
				// handle prefix routes
				if (isEmpty(route.children)) {
					abort('Prefix Objects needs to have a children Property containing Routes.');
				}

				const prefixed = this.prefix(route.children as Route[], route).flatMap((r) =>
					this.parse(r),
				);
				fixedRoutes = [...fixedRoutes, ...prefixed];
				return;
			}

			// check if route has a parent
			if (parent) {
				if (isDynamicSegment(parent.path)) {
					if (route.name) {
						if (parent.name && parent.name.localeCompare(route.name) != 0) {
							route.name = `${parent.name}${this.options.seperator}${route.name}`;
						} else {
							route.name = `${getNameFromSegment(parent.path)}${this.options.seperator}${
								route.name
							}`;
						}
					} else {
						abort(`Route: ${route.path} needs to have a Name assigned to them.`);
					}
				} else if (isDynamicSegment(route.path) && !isDynamicSegment(parent.path)) {
					if (route.name) {
						if (parent.name && parent.name.localeCompare(route.name) != 0) {
							route.name = `${parent.name}${this.options.seperator}${route.name}`;
						}
					} else {
						abort(
							`Dynamic Children Route: ${route.path} needs to have a Name assigned to them.`,
						);
					}
				} else {
					if (route.name) {
						if (parent.name && parent.name.localeCompare(route.name) != 0) {
							route.name = `${parent.name}${this.options.seperator}${route.name}`;
						}
					} else {
						abort(`Route: ${route.path} needs to have a Name assigned to them.`);
					}
				}

				// inherit parent meta
				if (!isEmpty(parent.meta)) {
					route.meta = parent.meta;
				}

				// remove slash from route (disables vue-router rooting)
				if (this.options.disableRooting) {
					route.path = normalizeRoutePath(route.path);
				}
			} else {
				if (!route.name && !isDynamicSegment(route.path)) {
					abort(`Route: ${route.path} needs to have a Name assigned to them.`);
				}
			}

			// repeat if route has children
			if (!isEmpty(route.children)) {
				route.children = this.parse(route.children as Route[], depth + 1, route);
			}

			fixedRoutes.push(route);
		});

		return fixedRoutes;
	}

	/**
	 *
	 * @param routes
	 * @param parent
	 * @returns
	 */

	prefix(routes: Route[], parent: Route): Route[] {
		if (isEmpty(parent.prefix)) {
			abort('Prefix needs to be defined.');
		}

		const prefix: string = normalizeRoutePath(parent.prefix as string);

		return routes.map((route) => {
			if (route.name) {
				if (isDynamicSegment(prefix)) {
					route.name = `${getNameFromSegment(prefix)}${this.options.seperator}${route.name}`;
				} else {
					route.name = `${prefix}${this.options.seperator}${route.name}`;
				}
			} else {
				abort(`Route: ${route.path} needs to have a Name assigned to them.`);
			}

			route.path = `/${prefix}${route.path}`;

			if (parent.meta) {
				route.meta = parent.meta;
			}

			return route;
		});
	}
}
