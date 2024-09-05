import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";

const ViewBookingFile = (props) => {

  console.log("view file props", props?.data)
  // const bookingReceipt = useSelector(
  //   (state) => state?.booking?.getBookingReceiptResponse
  // );


  // Helper function to create a Blob URL if the receipt is raw PDF data
  const createBlobURL = (pdfData) => {
    try {
      const blob = new Blob([pdfData], { type: "application/pdf" });
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error("Error creating Blob URL:", error);
      return null;
    }
  };

  // Use the raw PDF data as Blob URL or directly as a URL if it's already a link
  const pdfFile = props?.data?.startsWith("%PDF") // Check if it's raw PDF data
    ? createBlobURL(props?.data)
    : props?.data; // Else assume it's a URL

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
            Booking Document
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         

          {pdfFile ? (
            <iframe
              src={pdfFile}
              title="Booking Receipt PDF"
              width="100%"
              height="600px"
            />
          ) : (
            <p>No PDF available or failed to load PDF.</p>
          )}
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
