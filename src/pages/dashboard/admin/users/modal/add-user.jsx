import { Modal, Button, ButtonGroup } from "react-bootstrap";
import CrewForm from "./forms/add-crew-form";
import StaffForm from "./forms/add-staff-form";
import PartnerForm from "./forms/add-partner-form";
import { useEffect, useState } from "react";

function AddUser(props) {
  const [activeForm, setActiveForm] = useState(props?.user_type);
  console.log("user props", props?.user_type);
  useEffect(() => {
    setActiveForm(props?.user_type);
  }, [props?.user_type]);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add New User
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ButtonGroup className="mb-2">
          <Button
            className={activeForm === "staff" ? "active-btn" : ""}
            variant="light"
            onClick={() => setActiveForm("staff")}
          >
            Staff
          </Button>
          <Button
            className={activeForm === "partner" ? "active-btn" : ""}
            variant="light"
            onClick={() => setActiveForm("partner")}
          >
            Partner
          </Button>
          <Button
            variant="light"
            className={activeForm === "crew" ? "active-btn" : ""}
            onClick={() => setActiveForm("crew")}
          >
            Crew
          </Button>
        </ButtonGroup>

        {activeForm === "crew" && <CrewForm props={props} />}
        {activeForm === "staff" && <StaffForm props={props} />}
        {activeForm === "partner" && <PartnerForm props={props} />}
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}

export default AddUser;
