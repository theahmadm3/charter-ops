import { Modal, Button, ButtonGroup } from "react-bootstrap";
import CrewForm from "./forms/add-crew-form";
import StaffForm from "./forms/add-staff-form";
import PartnerForm from "./forms/add-partner-form";
import { useEffect, useState } from "react";

function AddUser(props) {
  const [activeForm, setActiveForm] = useState(props?.user_type);
  useEffect(() => {
    setActiveForm(props?.user_type);
  }, [props?.user_type]);

  const handleChange = (event) => {
    setActiveForm(event.target.value);
  };
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
        <div className="form-group mb-2">
          <label htmlFor="formSelect">Select Form Type</label>
          <select
            id="formSelect"
            className="form-control"
            value={activeForm}
            onChange={handleChange}
          >
            <option value="staff">Staff</option>
            <option value="partner">Partner</option>
            <option value="crew">Crew</option>
          </select>
        </div>

        {activeForm === "crew" && <CrewForm props={props} />}
        {activeForm === "staff" && <StaffForm props={props} />}
        {activeForm === "partner" && <PartnerForm props={props} />}
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}

export default AddUser;
