import React from 'react';
import { IUserInfoProps } from '../types/typeUser';

const UserInfo = React.memo(({ user }: IUserInfoProps) =>
  user ? (
    <table className='user-info'>
      <thead>
        <tr>
          <th>Username</th>
          <th>Phone number</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className='username'>{user.username}</td>
          <td>{user.phone}</td>
        </tr>
      </tbody>
    </table>
  ) : (
    <>No user yet...</>
  )
);

export default UserInfo;
