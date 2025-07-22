import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { GiFuelTank, GiHamburgerMenu } from "react-icons/gi";

import {
  MdLocalAirport,
  MdOutlineBarChart,
  MdOutlineReceipt,
} from "react-icons/md";
import { BiSolidDashboard } from "react-icons/bi";
import { FaCog, FaUser } from "react-icons/fa";
import { PiAirplaneInFlightFill } from "react-icons/pi";
import logo from "../../assets/images/flybird-logo.png";
import { Image } from "react-bootstrap";
import { IoIosPeople } from "react-icons/io";
import { FaEnvelopeOpenText } from "react-icons/fa";

function SideBar() {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  const isAdmin = user?.role?.role_name === "admin";
  const role = user?.role?.role_name;

  const rolePaths = {
    "Commercial": [
      "/admin-dashboard",
      "/admin-booking",
      "/admin-transaction",
      "/admin-clients",
      "/admin-add-booking",
    ],
    "Logistics and Supply": [
      "/admin-dashboard",
      "/admin-maintenance",
      "/admin-fuel",
    ],
    "Maintenance": [
      "/admin-dashboard",
      "/admin-maintenance",
      "/admin-fuel",
    ],
  };

  // Determine allowed paths for the user's role (empty array if role not found)
  const allowedPaths = role ? rolePaths[role] || [] : [];

  const menuItems = [
    {
      to: "/admin-dashboard",
      icon: <BiSolidDashboard className="sidebar-icon" />,
      text: "Dashboard",
    },
    {
      to: "/admin-booking",
      icon: <PiAirplaneInFlightFill className="sidebar-icon" />,
      text: "Flight/Aircraft Management",
    },
    {
      to: "/admin-maintenance",
      icon: <MdLocalAirport className="sidebar-icon" />,
      text: "Aircraft Maintenance",
    },
    {
      to: "/admin-transaction",
      icon: <MdOutlineReceipt className="sidebar-icon" />,
      text: "Transaction & Payment",
    },
    {
      to: "/admin-fuel",
      icon: <GiFuelTank className="sidebar-icon" />,
      text: "Fuel Management",
    },
    {
      to: "/admin-clients",
      icon: <IoIosPeople className="sidebar-icon" />,
      text: "Client Record",
    },
    {
      to: "/admin-report",
      icon: <MdOutlineBarChart className="sidebar-icon" />,
      text: "Statistics & Reporting",
    },
    {
      to: "/contact-requests",
      icon: <FaEnvelopeOpenText className="sidebar-icon" />,
      text: "Contact Request",
    },
    {
      to: "/admin-users",
      icon: <FaUser className="sidebar-icon" />,
      text: "Users",
    },
    {
      to: "/admin-config",
      icon: <FaCog className="sidebar-icon" />,
      text: "Config",
    },
  ];

  const filteredMenuItems = menuItems.filter((item) =>
    allowedPaths.includes(item.to)
  );

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const renderMenuItems = (items) => (
    items.map((item) => (
      <NavLink
        key={item.to}
        to={item.to}
        className={({ isActive }) =>
          `tw-rounded-full tw-inline-flex tw-items-center tw-hover:bg-white tw-hover:text-black sidebar-links ${isActive
            ? "tw-bg-white tw-text-black shadow"
            : "tw-text-white"
          }`
        }
      >
        <span className="m-2 fw-bold">{item.icon}</span>
        {item.text}
      </NavLink>
    ))
  );

  return (
    // <>
    //   <aside
    //     className="sidebar tw-fixed tw-h-screen tw-bg-gradient-to-b tw-from-indigo-900 tw-to-indigo-950 tw-text-white tw-shadow-lg"
    //     style={{ left: showMenu ? "0" : "-390px" }}
    //   >
    //     <div className="text-center py-1">
    //       <div className="skyops-logo">
    //         <span className="sky">Charter</span><span className="ops">O<span className="cloud"></span>ps</span>
    //       </div>
    //     </div>

    //     <div className="sidebar-toggle shadow" id="m-tog" onClick={toggleMenu}>
    //       <div className="text-center mt-1 p-1 h3">
    //         <GiHamburgerMenu />
    //       </div>
    //     </div>

    //     <div className="tw-p-6 tw-flex tw-flex-col tw-gap-4">
    //       {
    //         isAdmin ?
    //           renderMenuItems(menuItems) :
    //           renderMenuItems(filteredMenuItems)
    //       }
    //     </div>
    //   </aside>
    // </>
    <>
      <aside
        className="sidebar shadow tw-backdrop-blur-sm tw-bg-white/5 tw-border-b tw-border-white/10 tw-shadow-sm"
        style={{ left: showMenu ? "0" : "-390px", background: 'linear-gradient(to bottom, rgba(135, 206, 235, 0.3), rgba(70, 130, 180, 0.4))' }}
      >
        <div className="text-center py-1">
          <div className="skyops-logo">
            <span className="sky">Charter</span><span className="ops">O<span className="cloud"></span>ps</span>
          </div>
        </div>
        <div className="sidebar-toggle shadow" id="m-tog" onClick={toggleMenu}>
          <div className="text-center mt-1 p-1  h3">
            <GiHamburgerMenu />
          </div>
        </div>
        <div className="mt-5 tw-flex tw-flex-col tw-gap-y-5 tw-px-2">
          {
            isAdmin ?
              renderMenuItems(menuItems) :
              renderMenuItems(filteredMenuItems)
          }
        </div>
      </aside>
    </>
  );
}

export default SideBar;
