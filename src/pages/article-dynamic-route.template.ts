// @@DOC_IMPORT_PATHS@@
import { type DynamicRoute, type PageInfo } from '@/router/routes.ts'

const articleDynamicRoute: DynamicRoute = (page: string) => {
  const articlePages: PageInfo[] = [
    // @@DOC_PATHS@@
  ]

  for (const articlePage of articlePages) {
    if (articlePage.path === page) {
      return articlePage
    }
  }

  return undefined
}

export default articleDynamicRoute
