import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaEnvelope,
  FaStore,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUserPlus,
  FaUserTie,
} from "react-icons/fa";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Divider,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import ExitToApp from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "./Sidebar.css";
import useRoles from "../../hooks/useRoles";

const SideBar = ({ onToggleExpand }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const toggleSidebar = () => {
    const newValue = !isExpanded;
    setIsExpanded(newValue);
    if (onToggleExpand) onToggleExpand(newValue);
  };
  const { isAdmin, isTeacher } = useRoles();

  const renderItem = (to, icon, label) => (
    <ListItem disablePadding>
      <Tooltip title={!isExpanded ? label : ""} placement="right">
        <ListItemButton
          component={Link}
          to={to}
          className={`sidebar-link ${
            label.toLowerCase() === "logout" ? "logout-item" : ""
          }`}
        >
          {label.toLowerCase() === "logout" ? (
            <ExitToApp style={{ color: "red" }} />
          ) : (
            icon
          )}

          {isExpanded && (
            <ListItemText
              primary={label}
              primaryTypographyProps={{
                className: "sidebar-label",
              }}
            />
          )}
        </ListItemButton>
      </Tooltip>
    </ListItem>
  );

  const drawerContent = (
    <div className="sidebar-container">
      <div className="sidebar-content">
        {isExpanded && <h3 className="sidebar-title">Dashboard</h3>}
        <List>
          {renderItem("/home", <FaHome />, "Overview")}
          {renderItem("/home/contactUs", <FaEnvelope />, "Contact Us")}
          {renderItem("/home/store", <FaStore />, "Store")}
          {renderItem("/home/students", <FaUserGraduate />, "Students")}
          {(isAdmin || isTeacher) &&
            renderItem("/home/teachers", <FaChalkboardTeacher />, "Teachers")}
          {isAdmin && (
            <>
              {renderItem("/home/addStudent", <FaUserPlus />, "Add Student")}
              {renderItem("/home/addTeacher", <FaUserTie />, "Add Teacher")}
            </>
          )}
        </List>
        <Divider />
        {renderItem("/", <FaUserTie />, "Logout")}
      </div>

      {!isMobile && (
        <div className="sidebar-toggle-btn">
          <IconButton onClick={toggleSidebar}>
            {isExpanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
      )}
    </div>
  );

  return (
    <>
      {isMobile && (
        <div className="sidebar-mobile-icon">
          <IconButton onClick={toggleDrawer} color="inherit">
            <MenuIcon />
          </IconButton>
        </div>
      )}

      {isMobile ? (
        <Drawer
          anchor="left"
          open={isDrawerOpen}
          onClose={toggleDrawer}
          classes={{ paper: "sidebar-drawer" }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          anchor="left"
          open
          variant="permanent"
          classes={{
            paper: `sidebar-drawer ${
              isExpanded ? "sidebar-expanded" : "sidebar-collapsed"
            }`,
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
};

export default SideBar;
