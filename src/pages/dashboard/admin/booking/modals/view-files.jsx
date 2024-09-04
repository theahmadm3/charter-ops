import { Modal } from "react-bootstrap";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();


// const base64ToUint8Array = (base64) => {
//   const binaryString = window.atob(base64);
//   const len = binaryString.length;
//   const bytes = new Uint8Array(len);
//   for (let i = 0; i < len; i++) {
//     bytes[i] = binaryString.charCodeAt(i);
//   }
//   return bytes;
// };


const base64ToUint8Array = (base64) => {
  // Convert URL-safe Base64 to standard Base64
  const standardBase64 = base64
    .replace(/-/g, '+')  // Convert '-' to '+'
    .replace(/_/g, '/'); // Convert '_' to '/'

  // Add padding if necessary
  const padding = standardBase64.length % 4 === 0 ? '' : '='.repeat(4 - (standardBase64.length % 4));
  const base64WithPadding = standardBase64 + padding;

  // Decode the Base64 string
  const binaryString = window.atob(base64WithPadding);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes;
};


const ViewBookingFile = (props) => {
  console.log("pdf props", props)
  const { data } = props;

  // Convert the base64-encoded string to a Uint8Array
  const pdfBinary = base64ToUint8Array(data);

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
          <div className="bg-color-1 p-3">
            <h6>Flight File</h6>
          </div>
          <div className="pdf-container">
            <Document file={pdfBinary} className="pdf-document">
              <Page pageNumber={1} width={780} />
            </Document>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewBookingFile;
