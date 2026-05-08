import { ColumnLayout } from '@/components/ColumnLayout'
import Scaffold from '@/components/Scaffold'
import type { MikoFriends } from '@/config'
import { getI18n } from '@/i18n/i18n-context'
import configValue from '@/values/config-value'

function _FriendsPage(friend: MikoFriends, id: number) {
  return (
    <div
      key={id}
      className="group bg-surface-container-low hover:bg-surface-container-high rounded-xl p-4"
    >
      <a href={friend.url}>
        <h3 className="text-on-surface group-hover:text-primary mb-2 text-2xl font-bold">
          {friend.site_name}
        </h3>
        <div className="text-on-surface-variant mb-2 text-lg">
          {friend.description}
        </div>
      </a>
    </div>
  )
}

export default function FriendsPage() {
  const tr = getI18n().friendsPage
  const inviteUrl = configValue.friendsInviteUrl
  const friends = configValue.friends

  return (
    <Scaffold>
      <ColumnLayout className="gap-y-4">
        <h1 className="my-2 text-2xl font-bold md:text-4xl">{tr.title}</h1>
        {friends.map((f, idx) => _FriendsPage(f, idx))}
        <a
          className="md:text-md hover:text-tertiary mt-8 mb-4 text-sm"
          href={inviteUrl}
        >
          {tr.invite}
        </a>
      </ColumnLayout>
    </Scaffold>
  )
}
