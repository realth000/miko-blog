import '../config'
import { defineConfig } from '../config'

export default defineConfig({
  siteName: 'My Site Name',
  slogan: 'Hello World!',
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
