/* eslint-disable react/no-unescaped-entities */
// display info abt each basic info
// it's not globaly, only use in basic info container

import React, { useState } from 'react';
import { FaLocationArrow, FaBriefcase, FaCalendarAlt, FaVenusMars, FaPhone, FaHospitalUser, FaWeight, FaInfo } from 'react-icons/fa';
import { Link, Form } from 'react-router-dom';
import Wrapper from '../assets/wrappers/BasicInfo';
import BasicInfoContent from './BasicInfoContent';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import BasicInfoModal from './BasicInfoSetting'
day.extend(advancedFormat);
const BasicInfo = ({
  _id,
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
}) => {
  const date = day(birth_date).format('MM/DD/YYYY')
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [data, setData] = useState(null);
  const closeModal = () => setModalIsOpen(false);
  const openModal = () => {
    setModalIsOpen(true);
    fetchData();
  };
  const fetchData = async () => {
    try {
      // 要改網址
      const response = await fetch(`http://localhost:5100/api/v1/medCases/${medical_history_no}`);
      const data = await response.json();
      if (!data) {
        
        setData({ msg: 'Error: ' + response.status });
        return;
      }
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      
      setData({ msg: 'Network or other error' });
    }
  };
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
        <BasicInfoContent icon={<FaInfo />} text={height + " cm"} />
        <BasicInfoContent icon={<FaWeight />} text={weight + " kg"} />
        <BasicInfoContent icon={<FaPhone />} text={"+886 " + phone} />
        <BasicInfoContent icon={<FaBriefcase />} text={profession} />
        {/* <BasicInfoContent icon={<FaHospitalUser />} text={history_recorder} /> */}

        {/* <div className={`status they`}>{gender}</div> */}

      </div>
      <footer className='actions'>
        <Link to={`../edit-basic/${medical_history_no}`} className='btn edit-btn'>Edit</Link>
        <Form method='post' action={`../delete-basic/${medical_history_no}`}>
          <button type='submit' className='btn delete-btn' style={{margin_right: "0.5rem"}}>
            Delete
          </button>
        </Form>
        {/* 打開視窗的按鈕 */}
        <button type='button' className='btn show-btn' style={{margin_right: 0.5}} onClick={openModal}>
          Show
        </button>
        {/* 點完跳出的表單 */}
        <BasicInfoModal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        data={data}
      />

      </footer>
    </div>
  </Wrapper>
}

export default BasicInfo