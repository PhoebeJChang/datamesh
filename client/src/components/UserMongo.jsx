import React, { useState } from 'react';
import {  FaCalendarAlt, FaVenusMars, FaPhone, FaArrowsAlt, FaHospitalUser, FaCalendarCheck,  } from 'react-icons/fa';
import { Link, Form } from 'react-router-dom';
import Wrapper from '../assets/wrappers/BasicInfo';
import UserMongoContent from './UserMongoContent';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
day.extend(advancedFormat);

const UserMongo = ({
  _id,
  id,
  name,
  phone,
  email,
  birthday,
  gender,
  department,
  createdAt,
  updatedAt
}) => {
  const date = day(birthday).format('MM/DD/YYYY')
  return (
    <Wrapper>
    <header>
      <div className="main-icon">
        {name.charAt(0)}
      </div>
      <div className="info">
        <h5>{id}</h5>
        <p>{name}</p>
      </div>

    </header>
    <div className="content">
      <div className="content-center">
        <UserMongoContent icon={<FaVenusMars />} text={gender} />
        <UserMongoContent icon={<FaCalendarAlt />} text={date} />
        <UserMongoContent icon={<FaPhone />} text={"+886 " + phone} />
        <UserMongoContent icon={<FaHospitalUser />} text={department} />
        <UserMongoContent icon={<FaCalendarCheck />} text={createdAt} />
        <UserMongoContent icon={<FaArrowsAlt />} text={updatedAt} />

      </div>
      <footer className='actions'>
        {/* <Link to={`../edit-basic/${medical_history_no}`} className='btn edit-btn'>Edit</Link> */}
        
      </footer>
    </div>
  </Wrapper>
  )
}

export default UserMongo