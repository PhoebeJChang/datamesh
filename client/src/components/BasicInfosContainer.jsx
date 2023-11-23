// import React from 'react'
import BasicInfo from './basicInfo';
import Wrapper from '../assets/wrappers/BasicInfosContainer'
import { useAllBasicInfosContext } from '../pages/AllBasicInfos'

const BasicInfosContainer = () => {
  const { data } = useAllBasicInfosContext();
  const { basicInfos } = data;
  if (basicInfos.length === 0) {
    return <Wrapper>
      <h2>No basic infos to display...</h2>
    </Wrapper>
  }
  return <Wrapper>
    <div className="basicInfos">
      {basicInfos.map((basicInfo) => {
        return <BasicInfo key={basicInfo.medical_history_no} {...basicInfo} />
      })}
    </div>
  </Wrapper>
}

export default BasicInfosContainer