// import React from 'react'
import BasicInfo from './BasicInfo'
import Wrapper from '../assets/wrappers/BasicInfosContainer'
import { useAllBasicInfosContext } from '../pages/AllBasicInfos'
import PageBtnContainer from './PageBtnContainer'

const BasicInfosContainer = () => {
  const { data } = useAllBasicInfosContext();
  const { basicInfos, totalBasicInfos, numOfPages } = data;
  if (basicInfos.length === 0) {
    return <Wrapper>
      <h2>No basic infos to display...</h2>
    </Wrapper>
  }
  return <Wrapper>
    <h5>共{totalBasicInfos}筆 病人基本資料{basicInfos.length > 1 }</h5>
    <div className="basicInfos">
      {basicInfos.map((basicInfo) => {
        return <BasicInfo key={basicInfo.medical_history_no} {...basicInfo} />
      })}
    </div>
    {numOfPages > 1 && <PageBtnContainer/>}
  </Wrapper>
}

export default BasicInfosContainer