import {
  Button,
  Col,
  Modal,
  Row,
  FloatingLabel,
  Form as BootstrapForm,
} from "react-bootstrap";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import {
  airports,
  internationalAirports,
  localAirports,
} from "../../../../../util/data";
import { AddBookingStep01 } from "../../../../../services/booking/bookingService";
import BookingStepOne from "../steps/step-one/step-one";
import BookingStepTwo from "../steps/step-two/step-two";
import BookingStepThree from "../steps/step-three/step-three";
import BookingStepFour from "../steps/step-four/step-four";

const validationSchema = Yup.object().shape({
  trip_type: Yup.string().required("Trip type is required"),
  from_location: Yup.string().required("Departure airport is required"),
  to_location: Yup.string().required("Destination airport is required"),
  // .notOneOf([Yup.ref("from")], "Origin and destination cannot be the same"),
  // flight_date: Yup.date().required("Departure date and time are required"),
  // .min(new Date(), "Departure date cannot be in the past"),
  // return_datetime: Yup.date().min(
  //   Yup.ref("flight_date"),
  //   "Return date cannot be before departure date"
  // ),
  client_id: Yup.string().required("Client is required"),
  multi_leg_route: Yup.boolean(),
  legs: Yup.array().when("multi_leg_route", {
    is: true,
    then: Yup.array().of(
      Yup.object().shape({
        from: Yup.string().required("From airport is required"),
        to: Yup.string().required("To airport is required"),
        departure_date: Yup.date().required(
          "Departure date and time are required"
        ),
        arrival_date: Yup.date()
          .required("Arrival date and time are required")
          .min(
            Yup.ref("departure_date"),
            "Arrival date cannot be before departure date"
          ),
      })
    ),
  }),
});

const initialValues = {
  trip_type: "",
  from_location: "",
  to_location: "",
  flight_date: "",
  return_date: "",
  client_id: "",
  multi_leg: null,
  passenger_count: "",
};
const ManageBookingModal = (props) => {
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
            Manage Booking
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="bg-color-1 text-white p-3 mb-4">
            <span>Booking Information</span>
          </div>
          <BookingStepOne />

          <div className="bg-color-1 text-white p-3 mb-4">
            <span>Flight Information</span>
          </div>
          <BookingStepTwo />
          <div className="bg-color-1 text-white p-3 mb-4">
            <span>Additional Service</span>
          </div>
          <BookingStepThree />
          <div className="bg-color-1 text-white p-3 mb-4">
            <span> Passenger Information </span>
          </div>
          <BookingStepFour />
        </Modal.Body>
        <Modal.Footer>
          {/* <Button onClick={props.onHide}>Close</Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ManageBookingModal;
