import { Modal } from "react-bootstrap";

import BookingStepThree from "../steps/step-three/step-three";
import EditBookingStepOne from "../steps/step-one/edit-step-one";
import EditBookingStepTwo from "../steps/step-two/edit-step-two";
import EditBookingStepFour from "../steps/step-four/edit-step-four";
import EditBookingStepThree from "../steps/step-three/edit-step-three";
import EditBookingStepFive from "../steps/step-five/edit-step-five";

const ManageBookingModal = (props) => {
  return (
    <>
      <Modal
        {...props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => {
          window.location.reload(); // Refresh the page
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Manage Booking
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="bg-color-1 text-white p-3 mb-4">
            <span>Booking Information</span>
          </div>
          <EditBookingStepOne data={props?.data} />

          <div className="bg-color-1 text-white p-3 mb-4">
            <span>Flight Information</span>
          </div>
          <EditBookingStepTwo data={props?.data} />
          <div className="bg-color-1 text-white p-3 mb-4">
            <span>Additional Service</span>
          </div>
          <EditBookingStepThree data={props?.data} />
          <div className="bg-color-1 text-white p-3 mb-4">
            <span> Passenger Information </span>
          </div>
          <EditBookingStepFour data={props?.data} />

          <div className="bg-color-1 text-white p-3 mb-4">
            <span> Trip Sheet Information </span>
          </div>
          <EditBookingStepFive data={props?.data} />
        </Modal.Body>
        <Modal.Footer>
          {/* <Button onClick={props.onHide}>Close</Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ManageBookingModal;
