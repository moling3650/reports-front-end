function createRoutes (routes, prefix = '') {
  if (!Array.isArray(routes)) {
    throw new Error('routes must be array')
  }
  return routes.map(routeConfig => {
    const route = Object.assign({}, { name: routeConfig }, routeConfig)
    if (!route.name) {
      throw new Error('route.name is undefined')
    }
    if (!route.path) {
      route.path = `/${route.name}`
    }
    route.path = prefix + route.path
    if (!route.component || typeof route.component !== 'function') {
      route.component = () => import(`@/pages${prefix}/${route.name}`)
    }
    if (route.children) {
      route.children = createRoutes(route.children, route.path === '/' ? `/${route.name}` : route.path)
    }
    return route
  })
}

export default createRoutes
