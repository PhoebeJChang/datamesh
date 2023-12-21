import React from 'react'
import UserDisplay from './UserDisplayAzure'
import Wrapper from '../assets/wrappers/BasicInfosContainer'
import { useAllUsersAzureContext } from '../pages/AllUsersAzure'
import PageBtnContainer from './PageBtnAzureContainer' //be careful

const UserAzuresContainer = () => {
  const { data } = useAllUsersAzureContext();
  const { users, totalusers, numOfPages } = data;
  if (users.length === 0) {
    return <Wrapper>
      <h2>No users from Azure to display...</h2>
    </Wrapper>
  }

  if(totalusers === 0){
    totalusers = 1;
  }

  return (
    <Wrapper>
      <h5>共{totalusers}筆 來自Azure SQL的User資料{users.length > 1 || totalusers > 0}</h5>
      <div className="basicInfos">
        {users.map((user) => {
          return <UserDisplay key={user.id} {...user} />
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  )
}

export default UserAzuresContainer