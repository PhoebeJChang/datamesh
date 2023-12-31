import React from 'react'
import UserDisplay from './UserDisplayMySQL'
import Wrapper from '../assets/wrappers/BasicInfosContainer'
import { useAllUsersMySQLContext } from '../pages/AllUsersMySQL'
import PageBtnContainer from './PageBtnMySQLContainer' //be careful

const UserMySQLsContainer = () => {
  const { data } = useAllUsersMySQLContext();
  const { users, totalusers, numOfPages } = data;
  if (users.length === 0) {
    return <Wrapper>
      <h2>No users from MySQL to display...</h2>
    </Wrapper>
  } 

  return (
    <Wrapper>
      <h5>共{totalusers}筆 來自MySQL的User資料{users.length > 1}</h5>
      <div className="basicInfos">
        {users.map((user) => {
          return <UserDisplay key={user.id} {...user} />
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  )
}

export default UserMySQLsContainer