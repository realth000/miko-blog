import { log } from '@/log'
import AboutPage from '@/pages/AboutPage'
import HomePage from '@/pages/HomePage'
import NotFoundPage from '@/pages/NotFoundPage'
import ProjectsPage from '@/pages/ProjectsPage'
import ArticlesPage from '@/pages/generated/ArticlesPage'
import articleDynamicRoute from '@/pages/generated/article-dynamic-route'
import type { PageInfo, Routes } from '@/router/routes'

/**
 * All available routes.
 */
const appRoutes: Routes = [
  {
    path: '/',
    title: 'Home',
    component: HomePage,
  },
  {
    path: '/articles',
    title: 'Articles',
    component: ArticlesPage,
    children: articleDynamicRoute,
  },
  {
    path: '/projects',
    title: 'Projects',
    component: ProjectsPage,
  },
  {
    path: '/about',
    title: 'About',
    component: AboutPage,
  },
]

export const notFondPageTarget: PageInfo = {
  path: '/notFound',
  title: 'Page not found',
  component: NotFoundPage,
}

export function findRoute(route: string): PageInfo | undefined {
  log('find route:', route)
  return _findRoute(route, appRoutes)
}

function _findRoute(
  route: string,
  pageMap: Routes | undefined,
): PageInfo | undefined {
  if (pageMap === undefined) {
    return undefined
  }

  for (const p of pageMap) {
    if (p.path === route) {
      return p
    }

    if (!route.startsWith(`${p.path}/`) || !p.children) {
      continue
    }

    if (Array.isArray(p.children)) {
      const returnValue = _findRoute(
        route.replace(`${p.path}/`, ''),
        p.children,
      )
      if (!returnValue) {
        continue
      }

      return returnValue
    }

    if (typeof p.children === 'function') {
      // Dynamic route.
      return p.children(route.replace(`${p.path}/`, ''))
    }

    // Unreachable.
    return undefined
  }

  return undefined
}
