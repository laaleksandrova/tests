import {
  Group,
  Header,
  FormLayoutGroup,
  FormItem,
  Select,
} from '@vkontakte/vkui';
import { useContext, useEffect, useState } from "react";
import { GroupContext } from "./GroupContext.jsx";

const GroupFilters = ({  setFilteredGroups }) => {
  const { groups } = useContext(GroupContext);
  const getUniqueColors = (groups) => ([ ...new Set(groups.map((group) => group.avatar_color))]);
  const [ filteredOptions , setFilteredOptions ] = useState({
    status: 'all',
    color: 'all',
    friends: 'all',
  });

  useEffect(() => {
    const filteredGroups = groups.filter((group) => {
      const { status, color, friends } = filteredOptions;
      const statusFilterValue = (status === 'closed') ? true : false;
      const friendsFilterValue = (friends === 'yes') ? true : false;

      if (status !== 'all' && group.closed !== statusFilterValue) {
        return false;
      }
      if (friends !== 'all' && !!group.friends !== friendsFilterValue) {
        return false;
      }
      if (color !== 'all' && color !== 'transparent' && group.avatar_color !== color) {
        return false;
      }
      if (color  === 'transparent' && group.avatar_color) {
        return false;
      }

      return true;
    });

    setFilteredGroups(filteredGroups);
  }, [filteredOptions]);

  const handleChange = (e, id) => {
    setFilteredOptions({ ...filteredOptions, [id]: e.target.value });
  }

  return (
    <Group header={<Header>Фильтры</Header>}>
      <FormLayoutGroup mode="horizontal">
        <FormItem top="Статус группы" htmlFor="status">
          <Select
            id="status"
            placeholder="Выберите открытые/закрытые группы"
            defaultValue="all"
            onChange={(e) => handleChange(e, "status")}
            options={[
              { label: 'Все', value: 'all' },
              { label: 'Открытые', value: 'opened' },
              { label: 'Закрытые', value: 'closed' },
            ]}
          />
        </FormItem>
        <FormItem top="Цвет аватара" htmlFor="color">
          <Select
            id="color"
            placeholder="Выберите цвет аватара группы"
            defaultValue="all"
            onChange={(e) => handleChange(e, "color")}
            options={[
              { label: 'Все', value: 'all' },
              ...getUniqueColors(groups).map((color)=> (
                { label: color || 'отсутствует',
                value: color || 'transparent', }
              )),
            ]}
          />
        </FormItem>
        <FormItem top="Наличие друзей в группе" htmlFor="friends">
          <Select
            id="friends"
            placeholder="Выберите наличие друзей в группе"
            defaultValue="all"
            onChange={(e) => handleChange(e, "friends")}
            options={[
              { label: 'Все', value: 'all' },
              { label: 'Есть', value: 'yes' },
              { label: 'Нет', value: 'no' },
            ]}
          />
        </FormItem>
      </FormLayoutGroup>
    </Group>
  )
};

export default GroupFilters;
