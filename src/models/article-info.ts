/**
 * Information about an article.
 */
export interface ArticleInfo {
  /**
   * Article title.
   */
  title: string

  /**
   * Article page route.
   */
  route: string

  /**
   * Last modified date.
   */
  date: Date

  /**
   * Article summary.
   */
  summary: string

  /**
   * Article tags.
   */
  tags: string[]

  /**
   * Is draft or not.
   */
  draft: boolean
}
