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
            <div className="tw-flex tw-flex-col md:tw-flex-row md:tw-items-center">

              <div className="tw-mb-2 tw-border tw-w-fit tw-px-2 tw-rounded-lg tw-mr-4">
                <p className="tw-m-0 tw-p-0">Filter by date</p>
                <DatePicker
                  className="tw-mb-2 tw-form-control tw-w-full"
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={handleDateChange}
                  isClearable={true}
                  placeholderText="Start date - End date"
                />
              </div>


              <div className="tw-flex tw-gap-3">
                <Button
                  type="submit"
                  variant="success"
                  className="tw-my-2 tw-me-3 tw-py-3 tw-border-0"
                >
                  <span>
                    <FaSearch />{" "}
                  </span>
                </Button>

                <Button
                  variant="danger"
                  className="tw-my-2 tw-me-3 tw-py-3 tw-border-0"
                  onClick={handleFetch}
                >
                  <span>
                    <MdCancel />
                  </span>
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ReportingFilter;
