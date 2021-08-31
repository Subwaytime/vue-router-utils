import { Options, Route } from './types';
import { empty, getNameFromSegment, isDynamicSegment, isPrefix, normalizeRoutePath, split, toArray } from './utils';

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

	format() {
		const parsedRoutes = this.parse(this.routes);

		return parsedRoutes.sort((a: Route, b: Route): any => {
			// sort every error route at the end of routes array
			if (a.name && a.name.includes('error')) {
				return 1;
			}

			if(a.path && b.path) {
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

	parse(routes: Route | Route[], parentRoute?: Route) {
		let fixedRoutes: Route[] = [];

		toArray(routes).filter((route: Route) => {
			// check if route is a prefix, if yes use prefix function
			// and parse children routes
			if (isPrefix(route)) {
				if(!route.children) {
					throw new Error('Prefix Objects need Routes as `Children Array` to be applied too.');
				}
				const prefixed = this.prefix(route.children, route).flatMap((p) => this.parse(p));
				fixedRoutes = [...fixedRoutes, ...prefixed];
				return;
			}

			// check if route has children, if yes repeat parsing
			if (route.children) {
				route.children = this.parse(route.children, route);
			}

			// check if route is a child
			if (parentRoute) {
				// check if route does not have a dynamic segment, or it has one but no children routes
				if ((isDynamicSegment(route.path) && !route.children) || !isDynamicSegment(route.path)) {
					// check if parent route has a dynamic segment
					if (isDynamicSegment(parentRoute.path)) {
						route.name = `${getNameFromSegment(parentRoute.path)}${this.options.seperator}${route.name}`;
					}
					// check if route has a name
					else if (route.name) {
						const parentPath = normalizeRoutePath(parentRoute.path);

						// check if route name and parent name are equal
						if (parentRoute.name && parentRoute.name.localeCompare(route.name) != 0) {
							route.name = `${parentRoute.name}${this.options.seperator}${route.name}`;
						}
						// check if route is not included in parent path
						else if (!split(parentPath, '/').includes(route.name)) {
							route.name = `${parentPath.replace(/\//g, `${this.options.seperator}`)}${this.options.seperator}${
								route.name
							}`;
						}
					} else {
						// route has no name
						if (!route.path) {
							throw new Error('Route needs atleast a `name` or a `path`');
						}

						// check if parent route has a name
						if (parentRoute.name) {
							const path = normalizeRoutePath(route.path);
							route.name = `${parentRoute.name}${this.options.seperator}${path.replace(
								/\//g,
								`${this.options.seperator}`,
							)}`;
						} else {
							// if not then just use route path and parent path
							const parentPath = normalizeRoutePath(parentRoute.path);
							const routePath = normalizeRoutePath(route.path);
							route.name = `${parentPath.replace(/\//g, `${this.options.seperator}`)}${
								this.options.seperator
							}${routePath.replace(/\//g, `${this.options.seperator}`)}`;
						}
					}
				} else {
					if(!route.children) { return; };
					route.children = this.parse(route.children, parentRoute);
				}

				// inherit parent meta if existent
				if (parentRoute.meta) {
					route.meta = parentRoute.meta;
				}

				if(this.options.disableRooting) {
					// remove slash from route (disables vue-router rooting)
					route.path = normalizeRoutePath(route.path);
				}
			} else {
				// check whether route has no name and their path does not include a dynamic segment
				if (!route.name && !isDynamicSegment(route.path)) {
					throw new Error('Routes need to have a name assigned to them.');
				}
			}

			fixedRoutes.push(route);
		});

		return fixedRoutes;
	}

	prefix(routes: Route[], parentRoute: Route) {
		if(!parentRoute.prefix) {
			throw new Error('Prefix needs to be defined.');
		}
		const prefix: string = normalizeRoutePath(parentRoute.prefix);

		return routes.map((route) => {
			if (route.name && empty(route.children)) {
				if (isDynamicSegment(prefix)) {
					route.name = `${getNameFromSegment(prefix)}${this.options.seperator}${route.name}`;
				} else {
					route.name = `${prefix}${this.options.seperator}${route.name}`;
				}
			}

			route.path = `/${prefix}${route.path}`;

			if (parentRoute.meta) {
				route.meta = parentRoute.meta;
			}

			return route;
		});
	}
}
