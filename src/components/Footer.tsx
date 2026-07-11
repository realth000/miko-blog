import { IconBrandGithub, IconCode, IconHammer } from '@tabler/icons-react'
import configValue from '@/values/config-value'

export default function Footer() {
  const sourceCodeUrl = configValue.sourceCodeUrl
  const githubUsername = configValue.githubUsername

  return (
    <div className="text-on-surface-variant my-4 flex justify-center gap-4 text-xs">
      {githubUsername && (
        <a
          href={`http://github.com/${githubUsername}`}
          className="hover:text-primary flex gap-1 underline"
        >
          <IconBrandGithub size={16} />
          {githubUsername}
        </a>
      )}
      {sourceCodeUrl && (
        <a
          href={sourceCodeUrl}
          className="hover:text-primary flex gap-1 underline"
        >
          <IconCode size={16} />
          Source Code
        </a>
      )}
      <div className="flex gap-1">
        <IconHammer size={16} />
        Built with&nbsp;
        <a
          href="https://github.com/realth000/miko-blog"
          className="hover:text-primary underline"
        >
          miko-blog
        </a>
      </div>
    </div>
  )
}
