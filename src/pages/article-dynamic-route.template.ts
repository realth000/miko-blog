// @ts-expect-error Not used in template
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { lazy } from 'react'
import { type DynamicRoute, type PageInfo } from '@/router/routes'

const articleDynamicRoute: DynamicRoute = (page: string) => {
  const articlePages: PageInfo[] = [
    // @@DOC_PATHS@@
  ]

  for (const articlePage of articlePages) {
    if (articlePage.path === page) {
      return articlePage
    }
  }

  return
}

export default articleDynamicRoute
