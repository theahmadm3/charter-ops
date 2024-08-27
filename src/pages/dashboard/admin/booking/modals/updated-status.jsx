import {
  Button,
  Card,
  Col,
  FloatingLabel,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import { bookingStatusAsync } from "../../../../../slices/booking/bookingSlice";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

const UpdateStatusModal = (props) => {
  const dispatch = useDispatch();

  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Update Booking Status
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              status: "",
            }}
            validationSchema={Yup.object().shape({
              status: Yup.string()
                .required("Status ame is required")
                .min(1, "The status  must be at least 1"),
            })}
            onSubmit={(values) => {
              dispatch(
                bookingStatusAsync({ booking_id: props?.data[0]?.id, values })
              )
                .then((response) => {
                  if (response.payload.success) {
                    props.onHide();
                  }
                })
                .catch((error) => {
                  // Handle the error case if necessary
                  console.error("Error occurred:", error);
                });
            }}
            validateOnChange
            validateOnBlur
            validateOnSubmit
          >
            {({ errors, touched, handleSubmit, values, handleChange }) => (
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col>
                    <Form.Group>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Status"
                        className="my-2"
                      >
                        <Form.Select
                          aria-label="Floating label select example"
                          name="status"
                          value={values.status}
                          onChange={handleChange}
                        >
                          <option value="">Select Status</option>
                          <option value="pending">Pending</option>
                          <option value="approved">Approve</option>
                          <option value="rejected">Reject</option>
                          <option value="completed">Completed</option>
                          <option value="no_show">No Show</option>
                        </Form.Select>
                        {errors.status && touched.status ? (
                          <small className="text-danger">{errors.status}</small>
                        ) : null}
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="">
                  <Button
                    type="submit"
                    variant="success"
                    className=" my-2 me-3  border-0  "
                  >
                    <span className=" ">Update Status</span>
                  </Button>
                  <Button onClick={props.onHide} variant="danger">
                    Close
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateStatusModal;
