// import React from 'react';
import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaIdCard, FaPenSquare, FaWpforms, FaUsers } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { MdAdminPanelSettings } from 'react-icons/md';
import { BsPencilSquare } from 'react-icons/bs';

//a place where we hold our links/data of sidebar
const links = [
  {
    //this is the first path so the path should be '.'
    text: 'add basic info', 
    path: '.', 
    icon: <FaWpforms />,
  },
  {
    text: 'all basic info', 
    path: 'all-basicinfos', 
    icon: <FaIdCard />,
  },
  {
    text: 'all users Mongo', 
    path: 'all-users-mongo', 
    icon: <FaUsers />,
  },
  {
    text: 'all users MySQL', 
    path: 'all-users-mysql', 
    icon: <FaUsers />,
  },
  {
    text: 'all users Azure', 
    path: 'all-users-azure', 
    icon: <FaUsers />,
  },
  // {
  //   text: 'edit basic Info', 
  //   path: 'edit-basic', 
  //   icon: <BsPencilSquare />,
  // },
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
  // {
  //   text: 'admin', 
  //   path: 'admin', 
  //   icon: <MdAdminPanelSettings />,
  // },
  
];

export default links;
