import { Formik, useFormikContext } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { getAllBookingAsync } from "../../slices/booking/bookingSlice";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { IoChevronForward } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import moment from "moment";

const BookingFilter = () => {
  const dispatch = useDispatch();
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const handleFetch = async () => {
    await dispatch(getAllBookingAsync({}));
  };

  const handleDateChange = (update) => {
    setDateRange(update);
  };

  return (
    <>
      <Formik
        initialValues={{
          service_name: "",
          trip_type: "",
          aircraft_reg_no: "",
          status: "",
        }}
        validationSchema={Yup.object().shape({
          // Add your validation rules here
        })}
        onSubmit={(values) => {
          const payload = {
            ...values,
            flight_date: startDate
              ? moment(startDate).format("YYYY-MM-DD")
              : "",
            return_date: endDate ? moment(endDate).format("YYYY-MM-DD") : "",
          };
          dispatch(getAllBookingAsync(payload))
            .then((response) => {
              if (response.payload.success) {
                // Handle success
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
              <Col md={2}>
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

              <Col md={2}>
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

              <Col md={2}>
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
                <Form.Group>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Flight Date"
                    className="my-2"
                  >
                    <DatePicker
                      className="form-control my-2"
                      selectsRange={true}
                      startDate={startDate}
                      endDate={endDate}
                      onChange={handleDateChange}
                      isClearable={true}
                    />
                  </FloatingLabel>
                </Form.Group>
              </Col>

              <Col md={2}>
                <Button
                  type="submit"
                  variant="success"
                  className="my-2 me-3 py-3 border-0"
                >
                  <span>
                    <IoChevronForward />
                  </span>
                </Button>

                <Button
                  variant="danger"
                  className="my-2 me-3 py-3 border-0"
                  onClick={handleFetch}
                >
                  <span>
                    <MdCancel />
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
