import '../config'
import { defineConfig } from '../config'

export default defineConfig({
  siteName: 'My Site Name',
  slogan: 'Hello World!',
  friends: [
    {
      site_name: 'Alice',
      url: 'https://github.com',
      description: 'Alice called Bob',
    },
    {
      site_name: 'Bob',
      url: 'https://github.com',
      description: 'Bob called Alice',
    },
  ],
  friendsInviteUrl: 'https://github.com',
  projects: [
    {
      name: 'Example 1',
      description: 'My first project',
      homepage: 'https://github.com',
      tags: ['project', 'example'],
    },
    {
      name: 'Example 2',
      description: 'Another project',
      homepage: 'https://github.com',
      tags: ['project', 'blog'],
    },
  ],
  aboutMeDocumentPath: 'TODO',
  documentsDir: 'TODO',
})
