import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { GiFuelTank, GiHamburgerMenu } from "react-icons/gi";
import { HiUsers } from "react-icons/hi";
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

function SideBar() {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      to: "/admin-dashboard",
      icon: <BiSolidDashboard className="sidebar-icon" />,
      text: "Dashboard",
    },
    {
      to: "/admin-booking",
      icon: <PiAirplaneInFlightFill className="sidebar-icon" />,
      text: "Flight Management",
    },

    {
      to: "/admin-aircraft",
      icon: <MdLocalAirport className="sidebar-icon" />,
      text: "Aircraft Management",
    },
    {
      to: "/transaction",
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
      text: "Client Management",
    },
    {
      to: "/statistics",
      icon: <MdOutlineBarChart className="sidebar-icon" />,
      text: "Statistics & Reporting",
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

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <>
      <aside
        className="sidebar shadow"
        style={{ left: showMenu ? "0" : "-390px" }}
      >
        <div className="text-center py-1">
          <Image src={logo} className="img-fluid" />
        </div>
        <div className="sidebar-toggle shadow" id="m-tog" onClick={toggleMenu}>
          <div className="text-center mt-1 p-1  h3">
            <GiHamburgerMenu />
          </div>
        </div>
        <div className="mt-5"></div>
        {menuItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={
              location.pathname === item.to
                ? "admin-active-side admin-sidebar-link"
                : "admin-sidebar-link"
            }
          >
            <span className="m-2 fw-bold">{item.icon}</span>
            {item.text}
          </Link>
        ))}
      </aside>
    </>
  );
}
export default SideBar;
