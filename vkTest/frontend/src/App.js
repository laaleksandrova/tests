import './App.css';
import React, { useEffect, useState } from 'react';
import { View, Panel, PanelHeader, Group, Div } from '@vkontakte/vkui';
import { GroupContext } from './components/GroupContext.jsx';
import GroupFilters from './components/GroupFilters.jsx';
import GroupList from './components/GroupList.jsx';

function App() {
  const [activePanel, setActivePanel] = useState('groups');
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState(null);
  const [filteredGroups, setFilteredGroups] = useState([]);

  useEffect(() => {
    const getGroups = async () => {
      let data = {
        result: 0,
      };
      try {
        const response = await fetch("groups.json");
        const dataFetch = await response.json();
        data = {
          result: 1,
          dataFetch,
        }
        if (data.result === 0) {
          setError('Result is 0');
        }
        setGroups(data.dataFetch);
        setFilteredGroups(data.dataFetch);
      } catch (error) {
        setError(error.message);
      }
    };

    const timeoutId = setTimeout(() => {
      getGroups();
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [])

  return (
    <GroupContext.Provider value={{ groups }}>
      <View activePanel={activePanel}>
        <Panel id="groups">
          <PanelHeader mode="primary" size="large">Группы</PanelHeader>
          {(error) ? (<Group header={error}> Ошибка при загрузке групп </Group>) :
            (<Div>
              <GroupFilters setFilteredGroups={setFilteredGroups} />
              {(filteredGroups.length === 0) ? null :
                (<GroupList groups={filteredGroups} />)}
            </Div>)
          }
        </Panel>
      </View>
    </GroupContext.Provider>
  );
}

export default App;
