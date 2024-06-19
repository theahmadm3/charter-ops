import { Dropdown, Container, Nav, Navbar, Form, Image } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAsync } from "../../slices/auth/authSlice";
// import bellIcon from "../../assets/images/bell-icon.svg";

function AdminNavigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = localStorage.getItem("user");

  let loginUser = null;

  if (user) {
    try {
      loginUser = JSON.parse(user);
    } catch (error) {
      console.error("Error parsing 'user' from localStorage:", error);
    }
  }

  const handleLogout = async () => {
    dispatch(logoutAsync());

    await localStorage.removeItem("token");
    await localStorage.removeItem("user");
    // navigate("/");
    window.location.href = "/";
    localStorage.removeItem("loading");
  };
  return (
    <>
      <Navbar expand="lg" className=" shadow bg-body-tertiary" sticky="top">
        <Container>
          <Navbar.Brand href="/"> </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto"></Nav>
            <Nav className="mx-auto"></Nav>
            <Nav>
              <div className="border-end pe-4">
                {/* <Image src={bellIcon} className="m-3" /> */}
              </div>
              <Dropdown>
                <Dropdown.Toggle variant="white" id="dropdown-basic">
                  <span className="small">
                    Welcome <br />
                    <small className=""> {loginUser?.firstname} </small>
                  </span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#">Profile</Dropdown.Item>
                  <Dropdown.Item
                    className="text-danger"
                    onClick={() => handleLogout()}
                  >
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
export default AdminNavigation;
