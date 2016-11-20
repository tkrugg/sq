import React from 'react';
import moment from "moment";


const Event = ({time, action, user}) => {
  return (
    <div className="table__row">
      <div className="table__cell">
        {moment(time).fromNow()}
      </div>
      <div className="table__cell">
        <img src={user.avatar_url} alt={user.display_login}/>
        <a href={user.url}>@{user.display_login}</a>
      </div>
      <div className="table__cell">{action}</div>
    </div>
  );
};

export default Event;
