import { Modal } from "react-bootstrap";
import EditCrewForm from "./forms/edit-crew-form";
import EditStaffForm from "./forms/edit-staff-form";
import EditPartnerForm from "./forms/edit-partner-form";

function EditUser(props) {
  const type = props?.data[0]?.user_type;
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {type === "Crew" && <EditCrewForm data={props} />}
          {type === "Staff" && <EditStaffForm data={props} />}
          {type === "Partner" && <EditPartnerForm data={props} />}
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}
export default EditUser;
