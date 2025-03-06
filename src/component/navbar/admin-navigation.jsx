import { Dropdown, Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logoutAsync } from "../../slices/auth/authSlice";
// import bellIcon from "../../assets/images/bell-icon.svg";

function AdminNavigation() {
  const dispatch = useDispatch();

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
    
    window.location.href = "/";
    sessionStorage.removeItem("loading");
  };

  function scheduleLogout() {
    const expiresAtString = localStorage.getItem("expires_at");
    if (!expiresAtString) {
      console.error("No expiration time found in local storage");
      return;
    }

    const expiresAt = new Date(expiresAtString);
    const currentTime = new Date();
    const timeDifference = expiresAt - currentTime;

    if (timeDifference <= 0) {
      handleLogout();
    } else {
      setTimeout(handleLogout, timeDifference);
    }
  }
  scheduleLogout();

  let inactivityTimeout;
  let warningTimeout;
  const warningTime = 5 * 60 * 1000; // 5 minutes before logout
  const inactivityTime = 60 * 60 * 1000; // 1 hour

  function showWarning() {
    const warningMessage = document.createElement("div");
    warningMessage.id = "logout-warning";
    warningMessage.innerText =
      "You will be logged out due to inactivity in 5 minutes. Click here to stay logged in.";
    warningMessage.style.position = "fixed";
    warningMessage.style.bottom = "10px";
    warningMessage.style.right = "10px";
    warningMessage.style.backgroundColor = "red";
    warningMessage.style.color = "white";
    warningMessage.style.padding = "10px";
    warningMessage.style.zIndex = "1000";
    warningMessage.style.cursor = "pointer";
    document.body.appendChild(warningMessage);

    warningMessage.addEventListener("click", resetInactivityTimer);
  }

  function resetInactivityTimer() {
    // Clear any existing timeout
    clearTimeout(inactivityTimeout);
    clearTimeout(warningTimeout);

    // Remove warning message if it exists
    const existingWarning = document.getElementById("logout-warning");
    if (existingWarning) {
      existingWarning.remove();
    }

    // Set a new timeout for 1 hour (3600000 milliseconds)
    inactivityTimeout = setTimeout(handleLogout, inactivityTime);

    // Set a warning timeout for 55 minutes (3300000 milliseconds)
    warningTimeout = setTimeout(showWarning, inactivityTime - warningTime);
  }

  function setupInactivityTimer() {
    // List of events to listen for user interactions
    const events = ["mousemove", "keypress", "click", "scroll", "touchstart"];

    // Reset the inactivity timer on any of these events
    events.forEach((event) => {
      document.addEventListener(event, resetInactivityTimer, false);
    });

    // Initialize the inactivity timer
    resetInactivityTimer();
  }

  setupInactivityTimer();
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
                    <small className=""> {loginUser?.first_name} </small>
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
