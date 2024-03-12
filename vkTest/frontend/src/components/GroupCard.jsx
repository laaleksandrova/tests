import { Group, Header, SimpleCell, Avatar, Counter, Accordion } from '@vkontakte/vkui';
import {
  Icon24LockOpenOutline,
  Icon24LockOutline,
  Icon28UsersOutline,
  Icon28UserStarBadgeOutline,
} from '@vkontakte/icons';

const GroupCard = ({ group }) => {
  return (
    <Group header={<Header mode="primary">{group.name}</Header>}>
      {group.avatar_color && (
        <SimpleCell
          expandable="auto"
          before={
            <Avatar size={100} style={{ backgroundColor: `${group.avatar_color}` }} />
          }
        />
      )}
       {group.closed ? (
        <SimpleCell expandable="auto" before={<Icon24LockOutline />}>
          Закрытая группа
        </SimpleCell>
      ) : (
        <SimpleCell expandable="auto" before={<Icon24LockOpenOutline />}>
          Открытая группа
        </SimpleCell>
      )}
      <SimpleCell
        expandable="auto"
        before={<Icon28UsersOutline />}
        indicator={<Counter>{group.members_count}</Counter>}
      >
        Участники
      </SimpleCell>
      {group.friends && (
        <Accordion>
          <Accordion.Summary
            before={<Icon28UserStarBadgeOutline />}
            indicator={<Counter>{group.friends.length}</Counter>}
          >
            Друзья
          </Accordion.Summary>
          <Accordion.Content>
            <Group>
              {group.friends.map((friend) => (
                <SimpleCell key={friend.firstName} before={<Icon28UserStarBadgeOutline />}>
                  {friend.first_name + ' ' + friend.last_name}
                </SimpleCell>
              ))}
            </Group>
          </Accordion.Content>
        </Accordion>
      )}

    </Group>
  )
};

export default GroupCard;
