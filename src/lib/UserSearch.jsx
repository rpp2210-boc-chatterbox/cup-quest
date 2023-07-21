import {React, useState} from 'react';

const UserSearch = ({onSearch, search}) => {

  return (
    <div className='userSearchBar'>
      <input
        type='text'
        placeholder='Have a question? Search for answers…'
        value={search}
        onChange={onSearch}
      ></input>
    </div>
  );




}

export default UserSearch;