import '../config'
import { defineConfig } from '../config'

export default defineConfig({
  siteName: 'My Site Name',
  githubUsername: 'realth000',
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
      description: undefined,
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
  aboutMeDocumentPath: '/* This config is not used yet */',
  documentsDir: '/* This config is not used yet */',
  sourceCodeUrl: 'https://github.com/realth000/miko-blog',
})
