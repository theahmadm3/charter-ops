import { Formik, useFormikContext } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { getAllBookingAsync } from "../../slices/booking/bookingSlice";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { IoChevronForward, IoSearchCircleSharp } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import moment from "moment";
import { FaSearch } from "react-icons/fa";
import { getAllReportingAsync } from "../../slices/reporting/reportingSlice";

const ReportingFilter = () => {
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
        onSubmit={() => {
          const payload = {
            start_date: startDate ? moment(startDate).format("YYYY-MM-DD") : "",
            end_date: endDate ? moment(endDate).format("YYYY-MM-DD") : "",
          };
          dispatch(getAllReportingAsync(payload))
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
              <Col md={4}>
                <Form.Group>
                  <p className="m-0 p-0">Flight date</p>
                  <DatePicker
                    className="mb-2 form-control w-100"
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={handleDateChange}
                    isClearable={true}
                  />
                </Form.Group>
              </Col>

              <Col>
                <Button
                  type="submit"
                  variant="success"
                  className="my-2 me-3 py-3 border-0"
                >
                  <span>
                    <FaSearch />{" "}
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

export default ReportingFilter;
