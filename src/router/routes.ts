import { type FunctionComponent } from 'react'

export type Routes = PageInfo[]

export type DynamicRoute = (route: string) => PageInfo | undefined

export type PageInfo = {
  /**
   * Unique route path.
   *
   * Note that the route path is formed with current page and all
   * parent pages, where the **unique** is defined.
   *
   * * For a top-level page, `path` should start with `/`.
   * * For other pages, `path` should NOT start with `/`.
   */
  path: string;

  /**
   * Page title.
   */
  title: string;

  /**
   * The element name of the page content.
   */
  component: FunctionComponent;

  /**
   * Optional children routes.
   */
  children?: Routes | DynamicRoute;
}
