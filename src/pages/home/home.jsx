import React, { useState } from 'react';
import { Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SideBar from '../../components/SideBar/SideBar';
import { getRoleBasedRoutes } from '../../Routers/RoleRoutes';
import './home.css'; 
import {
 
  useMediaQuery,
  
} from "@mui/material";
const Home = () => {
  const role = useSelector((state) => state.user.role);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
   const isMobile = useMediaQuery("(max-width: 768px)");
  
  return (
    <div className="home-wrapper">
      <SideBar onToggleExpand={setIsSidebarExpanded} />
      <div
        className={`main-content ${isSidebarExpanded ? 'expanded' : 'collapsed'}${!isMobile&&isSidebarExpanded?' expanded':'collapsed'}`}
      >
        <Routes>{getRoleBasedRoutes(role)}</Routes>
      </div>
    </div>
  );
};

export default Home;
