// import React from 'react'
import Wrapper from "../assets/wrappers/BigSidebar";
import NavLinks from './NavLinks';
import Logo from '../components/Logo';
import { useDashboardContext } from '../pages/DashboardLayout';

const BigSideBar = () => {
  const { showSidebar } = useDashboardContext();
  return (
    <Wrapper>
      <div
        className={
          //default show the big side bar
          showSidebar ? 'sidebar-container' : 'sidebar-container show-sidebar '
        }
      >
        <div className='content'>
          <header>
            <Logo />
          </header>
          {/* when click the page and the big sidebar will remain appear*/}
          <NavLinks isBigSidebar />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSideBar