import React from 'react'
import Wrapper from '../assets/wrappers/BasicInfoContent';

const BasicInfoContent = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className='basic-icon'>{icon}</span>
      <span className='basic-text'>{text}</span>
    </Wrapper>
  );
}

export default BasicInfoContent