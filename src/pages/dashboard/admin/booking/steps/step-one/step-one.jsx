import { Formik, Form, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import { getAllClientAsync } from "../../../../../../slices/client/clientSlice";
import { getAllAircraftsAsync } from "../../../../../../slices/aircraft/aircraftSlice";
import {
  getAllPartnershipsAsync,
  getAllServicesAsync,
} from "../../../../../../slices/config/configSlice";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  airports,
  internationalAirports,
  localAirports,
  worldAirports,
} from "../../../../../../util/data";
import DateTimePicker from "react-datetime-picker";
import {
  FloatingLabel,
  Form as BootstrapForm,
  Button,
  Row,
  Col,
} from "react-bootstrap";

import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import {
  addBookingStepOneAsync,
  setCurrentStep,
} from "../../../../../../slices/booking/bookingSlice";
import { FaPlus, FaTrash } from "react-icons/fa";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

import Select from "react-select";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  // trip_type: Yup.string().required("Trip type is required"),
  // from_location: Yup.string().required("Departure airport is required"),
  // to_location: Yup.string().required("Destination airport is required"),
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

function BookingStepOne() {
  const [bookings, setBookings] = useState([]);
  const dispatch = useDispatch();

  const [to_airport, onChangeTo] = useState("");
  const [from_airport, onChangeFrom] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [legs, setLegs] = useState([
    { from: "", to: "", departure_date_time: "", arrival_date_time: "" },
  ]);

  const handleAddLeg = () => {
    setLegs([
      ...legs,
      { id: Date.now(), from: "", to: "", departure_date: "", return_date: "" },
    ]);
  };

  const handleRemoveLeg = (id) => {
    setLegs(legs.filter((leg) => leg.id !== id));
  };

  const handleLegChange = (id, e) => {
    const { name, value } = e.target;
    setLegs(
      legs.map((leg) => (leg.id === id ? { ...leg, [name]: value } : leg))
    );
  };
  const clientInfo = useSelector((state) => state?.client);

  const bookingInfo = useSelector((state) => state?.booking);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };
  const handleNext = () => {
    const current = bookingInfo?.currentStep;
    dispatch(setCurrentStep(current + 1));
  };

  const handleRemove = (index) => {
    setBookings((prevBookings) => prevBookings.filter((_, i) => i !== index));
  };
  const step = useSelector((state) => state.booking?.currentStep);

  const handleFormClear = (resetForm) => {
    resetForm();
  };
  useEffect(() => {
    try {
      dispatch(getAllClientAsync());
      dispatch(getAllPartnershipsAsync());
      // dispatch(getAllServicesAsync());
      dispatch(setCurrentStep(0));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const { from_location, to_location } = values;

          // Check each field individually and show a toast if any field is missing
          if (!to_airport) {
            toast.error("Please fill out the Flight Date");
            return;
          }

          if (!from_airport) {
            toast.error("Please fill out the Return Date");
            return;
          }

          if (!from_location) {
            toast.error("Please fill out the Departure Airport");
            return;
          }

          if (!to_location) {
            toast.error("Please fill out the Destination Airport");
            return;
          }

          const payload = {
            ...values,
            flight_date: to_airport,
            return_date: from_airport,
            from_location: from_location.label,
            to_location: to_location.label,
            client_id: Number(values.client_id),
            multi_leg: isChecked,
            ...(isChecked && legs && { legs }),
          };

          dispatch(addBookingStepOneAsync(payload))
            .then((response) => {
              if (response?.payload?.success) {
                const current = bookingInfo?.currentStep;
                dispatch(setCurrentStep(current + 1));
              } else {
                toast.error("Error please try again");
              }
            })
            .catch((error) => {
              console.error("Error occurred:", error);
              toast.error(
                "An unexpected error occurred. Please try again later."
              );
            });
        }}
      >
        {({
          values,
          setFieldValue,
          handleChange,
          handleBlur,
          handleSubmit,
          errors,
          touched,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Row className="mt-5">
              <Col md={6}>
                <BootstrapForm.Group>
                  <label>Select Departure Airport</label>
                  <Select
                    value={values.from_location}
                    options={worldAirports?.map((option) => ({
                      value: option.iata,
                      label: `${option.name} (${option.iata})`,
                    }))}
                    className=" form-control"
                    classNamePrefix="from_location"
                    onChange={(selectedOptions) =>
                      setFieldValue("from_location", selectedOptions)
                    }
                  />

                  <ErrorMessage
                    name="from_location"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>
              </Col>

              <Col md={6}>
                <BootstrapForm.Group>
                  <label>Select Destination Airport</label>

                  <Select
                    value={values.to_location}
                    options={worldAirports?.map((option) => ({
                      value: option.iata,
                      label: `${option.name} (${option.iata})`,
                    }))}
                    className=" form-control"
                    classNamePrefix="to_location"
                    onChange={(selectedOptions) =>
                      setFieldValue("to_location", selectedOptions)
                    }
                  />

                  <ErrorMessage
                    name="to_location"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>
              </Col>
            </Row>

            <Row className="my-4">
              <Col md={6}>
                <BootstrapForm.Group>
                  <p>Departure Date and Time</p>
                  <DateTimePicker
                    onChange={onChangeTo}
                    value={to_airport}
                    minDate={new Date()}
                  />
                  <ErrorMessage
                    name="flight_date"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>
              </Col>

              <Col md={6}>
                <BootstrapForm.Group>
                  <p>Return Date and Time</p>
                  <DateTimePicker
                    onChange={onChangeFrom}
                    value={from_airport}
                    minDate={to_airport || new Date()}
                  />
                  <ErrorMessage
                    name="return_date"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <BootstrapForm.Group>
                  <label>
                    <div>
                      Client <span className="text-danger">*</span>{" "}
                    </div>
                  </label>

                  <BootstrapForm.Control
                    as="select"
                    className="py-3"
                    name="client_id"
                    value={values.client_id}
                    onChange={handleChange}
                  >
                    <option value="">Select Client</option>

                    {clientInfo?.getAllClientsResponse?.data?.map((client) => (
                      <option value={client.id} key={client.id}>
                        {client.first_name + " " + client.last_name}
                      </option>
                    ))}
                  </BootstrapForm.Control>
                  <ErrorMessage
                    name="client_id"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>
              </Col>

              <Col md={6}>
                <BootstrapForm.Group className="">
                  <label>Passenger number</label>

                  <BootstrapForm.Control
                    type="number"
                    placeholder="Passenger Number"
                    name="passenger_count"
                    onChange={handleChange}
                    className="py-3"
                    isInvalid={
                      touched.passenger_count && !!errors.passenger_count
                    }
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.passenger_count}
                  </BootstrapForm.Control.Feedback>
                </BootstrapForm.Group>
              </Col>
            </Row>

            <div className="my-5 bg-body-tertiary p-3">
              <Row>
                <Col md={12}>
                  <BootstrapForm.Group>
                    <BootstrapForm.Check
                      type="checkbox"
                      label="Multi-Leg Route"
                      name="multi_leg"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />
                  </BootstrapForm.Group>
                </Col>
              </Row>

              {isChecked && (
                <div>
                  <h5 className="my-3">Legs</h5>
                  {legs.map((leg, index) => (
                    <div key={leg.id} className="mb-4">
                      <Row>
                        <Col md={6}>
                          <BootstrapForm.Group>
                            <FloatingLabel
                              controlId={`floatingFrom-${leg.id}`}
                              label="From"
                              className="my-2"
                            >
                              <BootstrapForm.Control
                                as="select"
                                name="from"
                                value={leg.from}
                                onChange={(e) => handleLegChange(leg.id, e)}
                              >
                                <option value="">Select airport</option>
                                {values.trip_type === "local" &&
                                  localAirports.map((airport) => (
                                    <option
                                      value={airport.name}
                                      key={airport.name}
                                    >
                                      {airport.name}
                                    </option>
                                  ))}
                                {values.trip_type === "international" &&
                                  internationalAirports.map((airport) => (
                                    <option
                                      value={airport.name}
                                      key={airport.id}
                                    >
                                      {airport.name}
                                    </option>
                                  ))}
                              </BootstrapForm.Control>
                            </FloatingLabel>
                            <ErrorMessage
                              name={`legs[${index}].from`}
                              component="div"
                              className="text-danger"
                            />
                          </BootstrapForm.Group>
                        </Col>

                        <Col md={6}>
                          <BootstrapForm.Group>
                            <FloatingLabel
                              controlId={`floatingTo-${leg.id}`}
                              label="To"
                              className="my-2"
                            >
                              <BootstrapForm.Control
                                as="select"
                                name="to"
                                value={leg.to}
                                onChange={(e) => handleLegChange(leg.id, e)}
                              >
                                <option value="">Select airport</option>
                                {values.trip_type === "local" &&
                                  localAirports
                                    .filter(
                                      (airport) => airport.name !== leg.from
                                    )
                                    .map((airport) => (
                                      <option
                                        value={airport.name}
                                        key={airport.name}
                                      >
                                        {airport.name}
                                      </option>
                                    ))}
                                {values.trip_type === "international" &&
                                  internationalAirports
                                    .filter(
                                      (airport) => airport.name !== leg.from
                                    )
                                    .map((airport) => (
                                      <option
                                        value={airport.name}
                                        key={airport.name}
                                      >
                                        {airport.name}
                                      </option>
                                    ))}
                              </BootstrapForm.Control>
                            </FloatingLabel>
                            <ErrorMessage
                              name={`legs[${index}].to`}
                              component="div"
                              className="text-danger"
                            />
                          </BootstrapForm.Group>
                        </Col>

                        <Col md={6}>
                          <BootstrapForm.Group>
                            <p>Departure Date and Time</p>
                            <DateTimePicker
                              onChange={(date) =>
                                handleLegChange(leg.id, {
                                  target: {
                                    name: "departure_date_time",
                                    value: date,
                                  },
                                })
                              }
                              value={leg.departure_date_time}
                            />
                            <ErrorMessage
                              name={`legs[${index}].departure_date_time`}
                              component="div"
                              className="text-danger"
                            />
                          </BootstrapForm.Group>
                        </Col>

                        <Col md={6}>
                          <BootstrapForm.Group>
                            <p>Return Date and Time</p>
                            <DateTimePicker
                              onChange={(date) =>
                                handleLegChange(leg.id, {
                                  target: {
                                    name: "arrival_date_time",
                                    value: date,
                                  },
                                })
                              }
                              value={leg.arrival_date_time}
                            />
                            <ErrorMessage
                              name={`legs[${index}].arrival_date_time`}
                              component="div"
                              className="text-danger"
                            />
                          </BootstrapForm.Group>
                        </Col>
                      </Row>

                      <Button
                        variant="danger"
                        className="my-3"
                        size="sm"
                        onClick={() => handleRemoveLeg(leg.id)}
                      >
                        <FaTrash /> Remove
                      </Button>
                    </div>
                  ))}

                  <Button
                    variant="primary"
                    className="mt-4"
                    size="sm"
                    onClick={handleAddLeg}
                  >
                    <FaPlus /> Add Another Leg
                  </Button>
                </div>
              )}
            </div>

            <div className="d-flex justify-content-end mt-3">
              {/* <Button
                variant="white"
                className="border  border-main-color text-start"
                onClick={handleBack}
              >
                Back
              </Button> */}

              {/* <Button
                variant="white"
                className="border  border-main-color text-end"
                onClick={() => handleNext()}
              >
                Next
              </Button> */}
              <Button type="submit">Proceed </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
export default BookingStepOne;
