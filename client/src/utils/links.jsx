// import React from 'react';
import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { MdAdminPanelSettings } from 'react-icons/md';

//a place where we hold our links/data of sidebar
const links = [
  {
    //this is the first path so the path should be '.'
    text: 'add patient', 
    path: '.', 
    icon: <FaWpforms />,
  },
  {
    text: 'all patient', 
    path: 'all-patients', 
    icon: <MdQueryStats />,
  },
  {
    text: 'DBs state', 
    path: 'dbs-state', 
    icon: <MdQueryStats />,
  },
  // {
  //   text: 'stats', 
  //   path: 'stats', 
  //   icon: <IoBarChartSharp />,
  // },
  // {
  //   text: 'profile', 
  //   path: 'profile', 
  //   icon: <ImProfile />,
  // },
  {
    text: 'admin', 
    path: 'admin', 
    icon: <MdAdminPanelSettings />,
  },
];

export default links;
