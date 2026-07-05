/**
 * Configuration for the blog.
 */
export interface MikoConfig {
  /**
   * Your site name.
   */
  siteName: string

  /**
   * The headline to show in homepage.
   */
  slogan: string

  /**
   * All projects shown in the project page.
   */
  projects: MikoProject[]

  /**
   * All friends website records.
   */
  friends: MikoFriends[]

  /**
   * Invitation url for friends website.
   */
  friendsInviteUrl: string

  /**
   * Path to the document served as about me.
   */
  aboutMeDocumentPath: string

  /**
   * Path to the directory holding all article documents.
   */
  documentsDir: string
}

/**
 * The projects built by yourself.
 *
 * Project will be shown in the 'Projects' tab.
 */
export interface MikoProject {
  /**
   * Project name.
   */
  name: string

  /**
   * Project description.
   */
  description: string

  /**
   * Project homepage.
   *
   * Repository url or standalone homepage.
   */
  homepage: string

  /**
   * Words describe the project related to.
   *
   * e.g. ["Typescript", "UI", "React"]
   */
  tags: string[]
}

/**
 * Friends website records.
 */
export interface MikoFriends {
  /**
   * Website name.
   */
  site_name: string

  /**
   * Website description.
   */
  description: string | undefined

  /**
   * Website url.
   */
  url: string
}

export function defineConfig(config: MikoConfig): MikoConfig {
  return config
}
