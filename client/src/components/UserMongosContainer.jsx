import React from 'react'
import UserDisplay from './UserDisplay'
import Wrapper from '../assets/wrappers/BasicInfosContainer'
import { useAllUsersMongoContext } from '../pages/AllUsers'
import PageBtnContainer from './PageBtnMongoContainer' //be careful

const UserMongosContainer = () => {
  const { data } = useAllUsersMongoContext();
  const { users, totalusers, numOfPages } = data;
  if (users.length === 0) {
    return <Wrapper>
      <h2>No users from Mongo to display...</h2>
    </Wrapper>
  }

  return (
    <Wrapper>
      <h5>共{totalusers}筆 來自MongoDB的User資料{users.length > 1}</h5>
      <div className="basicInfos">
        {users.map((user) => {
          return <UserDisplay key={user.id} {...user} />
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  )
}

export default UserMongosContainer