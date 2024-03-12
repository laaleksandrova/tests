import GroupCard from './GroupCard.jsx';
import { uniqueId } from 'lodash';

const GroupList = ({ groups }) => {
  return (
    <>
      {groups.map((group) => (
        <GroupCard group={group} key={uniqueId()} />
      ))}
    </>
  );
};

export default GroupList;
