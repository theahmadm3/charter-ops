import { Formik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { getAllBookingAsync } from "../../slices/booking/bookingSlice";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { IoChevronForward } from "react-icons/io5";
import { MdCancel } from "react-icons/md";

const BookingFilter = () => {
  const dispatch = useDispatch();

  const handleFetch = async () => {
    await dispatch(getAllBookingAsync({}));
  };

  return (
    <>
      <Formik
        initialValues={{
          service_name: "",
          rate_type: "",
          charge_rate: "",
          currency: "",
          remarks: "",
        }}
        validationSchema={Yup.object().shape({
          //   service_name: Yup.string()
          //     .required("Service name is required")
          //     .min(3, "The service name must be at least 3 characters"),
          //   rate_type: Yup.string().required("Rate type is required"),
          //   charge_rate: Yup.string().required("Charge rate is required"),
          //   currency: Yup.string().required("Currency is required"),
        })}
        onSubmit={(values) => {
          dispatch(getAllBookingAsync(values))
            .then((response) => {
              if (response.payload.success) {
                // Uncomment the next line if you want to hide the form/modal on success
                // props.onHide();
              }
            })
            .catch((error) => {
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
              <Col md={3}>
                <Form.Group>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Trip Type"
                    className="my-2"
                  >
                    <Form.Select
                      aria-label="Floating label select example"
                      name="trip_type"
                      value={values.trip_type}
                      onChange={handleChange}
                    >
                      <option value="">Select Trip Type</option>
                      <option value="local">Local</option>
                      <option value="international">International</option>
                    </Form.Select>
                    {errors.trip_type && touched.trip_type ? (
                      <small className="text-danger">{errors.trip_type}</small>
                    ) : null}
                  </FloatingLabel>
                </Form.Group>
              </Col>

              <Col md={3}>
                <Form.Group>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Aircraft Reg No"
                    className="my-2"
                  >
                    <Form.Control
                      type="text"
                      placeholder=""
                      name="aircraft_reg_no"
                      value={values.aircraft_reg_no}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                </Form.Group>
              </Col>

              <Col md={3}>
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
                  </FloatingLabel>
                </Form.Group>
              </Col>

              <Col md={2}>
                <Button
                  type="submit"
                  variant="success"
                  className=" my-2 me-3 py-3  border-0  "
                >
                  <span className=" ">
                    <IoChevronForward />
                  </span>
                </Button>

                <Button
                  variant="danger"
                  className=" my-2 me-3 py-3  border-0  "
                  onClick={handleFetch}
                >
                  <span className=" ">
                    <MdCancel />{" "}
                  </span>
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default BookingFilter;
