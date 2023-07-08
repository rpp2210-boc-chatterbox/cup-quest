import React, { useState, useEffect } from 'react';

import UserHistoryElement from './UserHistoryElement.jsx';

import requestHandler from './requestHandler.js';

const UserHistoryList = ({user}) => {
  const [userHistory, setUserHistory] = useState([]);

  useEffect(() => {
    console.log(user)
    requestHandler(`/user/${user.name}/reviews`, {user_id: user._id}, 'get', (response) => {
      console.log(response);
      setUserHistory(response.data)
    });
    // requestHandler(props.userID)
    // pass in userID to get all user history
  }, []);

  return (
    <div className='history-list'>
            <h3>No History Yet...</h3>
      {/* {userHistory.map((historyElement) => {
        <UserHistoryElement historyElement={historyElement} />
      })} */}
    </div>
  );
};

export default UserHistoryList;