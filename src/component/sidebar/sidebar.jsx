import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
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
      <Link
        key={item.to}
        to={item.to}
        className={
          location.pathname === item.to ?
            "admin-active-side admin-sidebar-link" :
            "admin-sidebar-link"
        }
      >
        <span className="m-2 fw-bold">{item.icon}</span>
        {item.text}
      </Link>
    ))
  );

  return (
    <>
      <aside
        className="sidebar shadow"
        style={{ left: showMenu ? "0" : "-390px" }}
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
        <div className="mt-5"></div>
        {
          isAdmin ?
            renderMenuItems(menuItems) :
            renderMenuItems(filteredMenuItems)
        }
      </aside>
    </>
  );
}

export default SideBar;
