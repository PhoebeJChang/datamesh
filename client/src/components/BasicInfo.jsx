/* eslint-disable react/no-unescaped-entities */
// display info abt each basic info
// it's not globaly, only use in basic info container
import React from 'react'
import { FaLocationArrow, FaBriefcase, FaCalendarAlt, FaVenusMars, FaPhone, FaHospitalUser, FaWeight, FaInfo } from 'react-icons/fa';
import { Link, Form } from 'react-router-dom';
import Wrapper from '../assets/wrappers/BasicInfo';
import BasicInfoContent from './BasicInfoContent';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
day.extend(advancedFormat);

const BasicInfo = ({
  medical_history_no,
  id_number,
  name,
  gender,
  birth_date,
  height,
  weight,
  address,
  phone,
  email,
  profession,
  history_recorder
}) => {
  const date = day(birth_date).format('MM/DD/YYYY')
  return <Wrapper>
    <header>
      <div className="main-icon">
        {name.charAt(0)}
      </div>
      <div className="info">
        <h5>{medical_history_no}</h5>
        <p>{name}</p>
        <p>身分證字號: {id_number}</p>
      </div>
    </header>
    <div className="content">
      <div className="content-center">
        <BasicInfoContent icon={<FaVenusMars />} text={gender} />
        <BasicInfoContent icon={<FaCalendarAlt />} text={date} />
        <BasicInfoContent icon={<FaLocationArrow />} text={address} />
        <BasicInfoContent icon={<FaInfo />} text={height+" cm"} />
        <BasicInfoContent icon={<FaWeight />} text={weight+ " kg"} />
        <BasicInfoContent icon={<FaPhone />} text={"+886 "+ phone} />
        <BasicInfoContent icon={<FaBriefcase />} text={profession} />
        <BasicInfoContent icon={<FaHospitalUser/>} text={history_recorder} />

        {/* <div className={`status they`}>{gender}</div> */}

      </div>
      <footer className='actions'>
        <Link className='btn edit-btn'>Edit</Link>
        <Form>
          <button type='submit' className='btn delete-btn'>
            Delete
          </button>
        </Form>
      </footer>
    </div>
  </Wrapper>
}

export default BasicInfo
