import { Modal } from "react-bootstrap";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { useSelector } from "react-redux";

const ViewBookingFile = (props) => {
  const bookingReceipt = useSelector(
    (state) => state?.booking?.getBookingReceiptResponse
  );

  return (
    <>
      <Modal
        {...props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Booking File
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="bg-color-1 p-3 mb-3">
            <h6>Flight File</h6>
          </div>

          <div className="pdf-container">
            {bookingReceipt ? (
              <Viewer fileUrl={bookingReceipt} />
            ) : (
              <p>No PDF available</p>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={props.onHide}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewBookingFile;
