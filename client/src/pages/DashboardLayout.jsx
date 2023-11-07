// import React from 'react'

import { Outlet } from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { BigSideBar, NavBar, SmallSideBar } from "../components";
import { useState, createContext, useContext } from "react";
import { checkDefaultTheme } from "../App";

const DashBoardContext = createContext();


const DashboardLayout = () => {
  // temp
  const user = { name: 'Phoebe' }
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

  const toggleDarkTheme = () => {
    //! opposite of dark 
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    //toggle a theme-class and boolean
    document.body.classList.toggle('dark-theme', newDarkTheme);
    //access to the local
    localStorage.setItem('darkTheme', newDarkTheme);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    console.log('logout user');
  };

  return (
    <DashBoardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSideBar />
          <BigSideBar />

          <div>
            <NavBar />

            {/* where our entire content should be */}
            <div className="dashboard-page">
              <Outlet context={{ user }} />
            </div>

          </div>
        </main>

      </Wrapper>
    </DashBoardContext.Provider>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export const useDashboardContext = () => useContext(DashBoardContext);
export default DashboardLayout;