import {React, useState} from 'react';

const UserCard = ({user}) => {
  return (
    <div className='userCard'>
      <p >{user.name}</p>


    </div>
  )
}

export default UserCard;