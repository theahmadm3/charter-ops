// Improved UI with visual polish and spacing consistency
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { getAllBookingAsync } from "../../slices/booking/bookingSlice";
import { Button, Col, FloatingLabel, Form, Row, Card } from "react-bootstrap";
import { MdCancel } from "react-icons/md";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import moment from "moment";
import { FaSearch } from "react-icons/fa";

const BookingFilter = () => {
  const dispatch = useDispatch();
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [bookingsDateRange, setBookingsDateRange] = useState([null, null]);
  const [bookingsStartDate, bookingsEndDate] = bookingsDateRange;

  const handleDateChange = (update) => setDateRange(update);
  const handleBookingsDateRange = (update) => setBookingsDateRange(update);

  const handleFetch = async () => {
    await dispatch(getAllBookingAsync({}));
  };

  return (
    <Card className="tw-shadow-md tw-p-4 tw-border-0 tw-rounded-xl tw-bg-gray-100">
      <h5 className="tw-mb-4">Filter Bookings</h5>
      <Formik
        initialValues={{
          service_name: "",
          trip_type: "",
          aircraft_reg_no: "",
          status: "",
        }}
        validationSchema={Yup.object().shape({})}
        onSubmit={(values) => {
          const payload = {
            ...values,
            flight_date: startDate
              ? moment(startDate).format("YYYY-MM-DD")
              : "",
            return_date: endDate ? moment(endDate).format("YYYY-MM-DD") : "",
            start_date: bookingsStartDate
              ? moment(bookingsStartDate).format("YYYY-MM-DD")
              : "",
            end_date: bookingsEndDate
              ? moment(bookingsEndDate).format("YYYY-MM-DD")
              : "",
          };
          dispatch(getAllBookingAsync(payload))
            .then((response) => {
              if (response.payload.success) {
                // handle success
              }
            })
            .catch((error) => console.error("Error occurred:", error));
        }}
        validateOnChange
        validateOnBlur
        validateOnSubmit
      >
        {({ handleSubmit, values, handleChange }) => (
          <Form onSubmit={handleSubmit}>
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-4 tw-gap-4">
              <div className="md:tw-col-span-1 tw-overflow-hidden">
                <FloatingLabel label="Aircraft Reg No">
                  <Form.Control
                    type="text"
                    name="aircraft_reg_no"
                    value={values.aircraft_reg_no}
                    onChange={handleChange}
                    placeholder="Aircraft Reg No"
                    className="tw-w-full"
                  />
                </FloatingLabel>
              </div>

              <div className="md:tw-col-span-1">
                <FloatingLabel label="Status">
                  <Form.Select
                    name="status"
                    value={values.status}
                    onChange={handleChange}
                    className="tw-w-full"
                  >
                    <option value="">Select Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approve</option>
                    <option value="rejected">Reject</option>
                    <option value="completed">Completed</option>
                    <option value="no_show">No Show</option>
                  </Form.Select>
                </FloatingLabel>
              </div>

              <div className="md:tw-col-span-1">
                <Form.Label className="tw-font-semibold">Flight Date Range</Form.Label>
                <DatePicker
                  className="tw-form-control tw-rounded-lg tw-w-full"
                  selectsRange
                  startDate={startDate}
                  endDate={endDate}
                  onChange={handleDateChange}
                  isClearable
                  placeholderText="Start - End"
                />
              </div>

              <div className="md:tw-col-span-1">
                <Form.Label className="tw-font-semibold">
                  Booking Date Range
                </Form.Label>
                <DatePicker
                  className="tw-form-control tw-rounded-lg tw-w-full"
                  selectsRange
                  startDate={bookingsStartDate}
                  endDate={bookingsEndDate}
                  onChange={handleBookingsDateRange}
                  isClearable
                  placeholderText="Start - End"
                />
              </div>

              <div className="tw-col-span-full tw-text-right">
                <button
                  type="submit"
                  className="tw-inline-flex tw-items-center tw-px-2 tw-py-1 tw-rounded-full tw-gap-x-2 tw-text-white tw-bg-blue-600 hover:tw-bg-blue-700 tw-mx-3"
                >
                  <FaSearch className="tw-me-2" /> Search
                </button>
                <button
                  onClick={handleFetch}
                  className="tw-inline-flex tw-items-center tw-px-2 tw-py-1 tw-rounded-full tw-gap-x-2 tw-text-red-600 tw-bg-white tw-border tw-border-red-600 hover:tw-bg-red-600 hover:tw-text-white"
                >
                  <MdCancel /> Reset
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default BookingFilter;


{/* <Col md={2}>
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
                      </Col> */}