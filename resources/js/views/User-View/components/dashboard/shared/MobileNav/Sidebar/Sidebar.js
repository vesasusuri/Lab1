import React from "react";
import { CgClose } from "react-icons/cg";
import { FaHome, FaUser, FaFileAlt, FaBriefcase } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";

const Sidebar = (props) => {
  return (
    <div className="mobile-sidebar">
      <div className="sidebar-logo-row">
        <a href="/dashboard">
          <div className="mobile-logo-container"></div>
        </a>
        <button onClick={props.click}>
          <CgClose />
        </button>
      </div>

      <div className="mobile-sidebar-links">
        <div className="nav-sidebar-link">
          <a href="/dashboard" className="nav-anchor">
            <FaHome />
            Dashboard
          </a>
        </div>

        <div className="nav-sidebar-link">
          <a href="/resume" className="nav-anchor">
            <FaFileAlt />
            Resume
          </a>
        </div>

        <div className="nav-sidebar-link">
          <a href="/profile" className="nav-anchor">
            <FaUser />
            Profile
          </a>
        </div>

        <div className="nav-sidebar-link">
          <a href="/applied-jobs" className="nav-anchor">
            <MdWork />
            Applied Jobs
          </a>
        </div>

        <div className="nav-sidebar-link">
          <a href="/unfinished-jobs" className="nav-anchor">
            <MdWork />
            Unfinished Jobs
          </a>
        </div>

        <div className="nav-sidebar-link">
          <a href="/saved-jobs" className="nav-anchor">
            <MdWork />
            Saved Jobs
          </a>
        </div>

        <div className="nav-sidebar-link">
          <a href="/interviews" className="nav-anchor">
            <FaBriefcase />
            Interviews
          </a>
        </div>

        <div className="nav-sidebar-link">
          <a href="/messages" className="nav-anchor">
            <FaBriefcase />
            Messages
          </a>
        </div>
      </div>

      <div className="sidebar-auth">
        <button type="button" className="notification-button">
          <IoIosNotifications />
        </button>

        <a href="/" className="contact-us">
          Vesa Susuri
        </a>
      </div>

      <div className="space"></div>
    </div>
  );
};

export default Sidebar;