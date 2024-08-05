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
  internationalAirports,
  localAirports,
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
  num_adults: Yup.number()
    .min(1, "At least one adult is required")
    .required("Number of adults is required"),
  num_children: Yup.number().min(0).required("Number of children is required"),
  num_infants: Yup.number().min(0).required("Number of infants is required"),
  // aircraft_type_id: Yup.string().required("Aircraft type is required"),
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
  num_adults: 0,
  num_children: 0,
  num_infants: 0,
  // aircraft_type_id: 0,
  multi_leg: null,
};

function BookingStepOne() {
  const [bookings, setBookings] = useState([]);
  const dispatch = useDispatch();

  const [to_airport, onChangeTo] = useState(new Date());
  const [from_airport, onChangeFrom] = useState(new Date());
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
  const airCraftInfo = useSelector((state) => state?.aircraft);
  const serviceInfo = useSelector((state) => state?.config);
  const bookingInfo = useSelector((state) => state?.booking);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };
  const handleNext = () => {
    const current = bookingInfo?.currentStep;
    dispatch(setCurrentStep(current + 1));
  };

  const handleBack = () => {
    const current = bookingInfo?.currentStep;
    dispatch(setCurrentStep(current - 1));
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
      dispatch(getAllServicesAsync());
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
          const payload = {
            ...values,
            flight_date: to_airport,
            return_date: from_airport,
            num_adults: Number(values.num_adults),
            num_children: Number(values.num_children),
            num_infants: Number(values.num_infants),
            // aircraft_type_id: Number(values.aircraft_type_id),
            multi_leg: isChecked,
            ...(isChecked && legs && { legs }),
          };
          dispatch(addBookingStepOneAsync(payload))
            .then((response) => {
              console.log("response");
              if (response?.payload?.success) {
                // Handle success (e.g., show a message or redirect)
                const current = bookingInfo?.currentStep;
                dispatch(setCurrentStep(current + 1));
              } else {
                console.log("Error please try again");
              }
            })
            .catch((error) => {
              console.error("Error occurred:", error);
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
            <Row>
              <Col md={6}>
                <BootstrapForm.Group>
                  <FloatingLabel
                    controlId="floatingTripType"
                    label="Select Trip Type"
                    className="my-2"
                  >
                    <BootstrapForm.Control
                      as="select"
                      name="trip_type"
                      value={values.trip_type}
                      onChange={(e) => {
                        setFieldValue("trip_type", e.target.value);
                        if (e.target.value === "local") {
                          // setFieldValue("from", localAirports[0]);
                        }
                      }}
                    >
                      <option value="">Select trip type</option>

                      <option value="local">Local</option>
                      <option value="international">International</option>
                    </BootstrapForm.Control>
                  </FloatingLabel>
                </BootstrapForm.Group>
              </Col>
              {/* 
              <Col md={6}>
                <BootstrapForm.Group>
                  <FloatingLabel
                    controlId="floatingAircraftType"
                    label="Aircraft Type"
                    className="my-2"
                  >
                    <BootstrapForm.Control
                      as="select"
                      name="aircraft_type_id"
                      value={values.aircraft_type_id}
                      onChange={handleChange}
                    >
                      <option value="">Select aircraft type</option>

                      {serviceInfo?.getAllPartnershipTypesResponse?.data?.map(
                        (type) => (
                          <option value={type.id} key={type.id}>
                            {type.name}
                          </option>
                        )
                      )}
                    </BootstrapForm.Control>
                  </FloatingLabel>
                  <ErrorMessage
                    name="aircraft_type_id"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>
              </Col> */}
            </Row>
            <Row>
              <Col md={6}>
                <BootstrapForm.Group>
                  <FloatingLabel
                    controlId="floatingFrom"
                    label="From"
                    className="my-2"
                  >
                    <BootstrapForm.Control
                      as="select"
                      name="from_location"
                      value={values.from_location}
                      onChange={handleChange}
                      // disabled={values.trip_type === "international"}
                    >
                      <option value="">Select airport</option>

                      {values.trip_type === "local"
                        ? localAirports.map((airport) => (
                            <option value={airport.name} key={airport.name}>
                              {airport.name}
                            </option>
                          ))
                        : null}

                      {values.trip_type === "international"
                        ? internationalAirports.map((airport) => (
                            <option value={airport.name} key={airport.id}>
                              {airport.name}
                            </option>
                          ))
                        : null}
                    </BootstrapForm.Control>
                  </FloatingLabel>
                  <ErrorMessage
                    name="from"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>
              </Col>

              <Col md={6}>
                <BootstrapForm.Group>
                  <FloatingLabel
                    controlId="floatingTo"
                    label="To"
                    className="my-2"
                  >
                    <BootstrapForm.Control
                      as="select"
                      name="to_location"
                      value={values.to_location}
                      onChange={handleChange}
                      // disabled={values.trip_type === "international"}
                    >
                      <option value="">Select airport</option>

                      {values.trip_type === "local" &&
                        localAirports
                          .filter(
                            (airport) => airport.value !== values.from_location
                          )
                          .map((airport) => (
                            <option value={airport.value} key={airport.value}>
                              {airport.name}
                            </option>
                          ))}

                      {values.trip_type === "international" &&
                        internationalAirports
                          .filter(
                            (airport) => airport.value !== values.from_location
                          )
                          .map((airport) => (
                            <option value={airport.value} key={airport.value}>
                              {airport.name}
                            </option>
                          ))}
                    </BootstrapForm.Control>
                  </FloatingLabel>
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
              <Col md={4}>
                <BootstrapForm.Group>
                  <FloatingLabel
                    controlId="floatingAdults"
                    label="Number of Adults"
                    className="my-2"
                  >
                    <BootstrapForm.Control
                      as="select"
                      name="num_adults"
                      value={values.num_adults}
                      onChange={handleChange}
                    >
                      {[...Array(10).keys()].map((num) => (
                        <option value={num + 1} key={num}>
                          {num + 1}
                        </option>
                      ))}
                    </BootstrapForm.Control>
                  </FloatingLabel>
                  <ErrorMessage
                    name="num_adults"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>
              </Col>

              <Col md={4}>
                <BootstrapForm.Group>
                  <FloatingLabel
                    controlId="floatingChildren"
                    label="Number of Children"
                    className="my-2"
                  >
                    <BootstrapForm.Control
                      as="select"
                      name="num_children"
                      value={values.num_children}
                      onChange={handleChange}
                    >
                      {[...Array(6).keys()].map((num) => (
                        <option value={num} key={num}>
                          {num}
                        </option>
                      ))}
                    </BootstrapForm.Control>
                  </FloatingLabel>
                  <ErrorMessage
                    name="num_children"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>
              </Col>

              <Col md={4}>
                <BootstrapForm.Group>
                  <FloatingLabel
                    controlId="floatingInfants"
                    label="Number of Infants"
                    className="my-2"
                  >
                    <BootstrapForm.Control
                      as="select"
                      name="num_infants"
                      value={values.num_infants}
                      onChange={handleChange}
                    >
                      {[...Array(3).keys()].map((num) => (
                        <option value={num} key={num}>
                          {num}
                        </option>
                      ))}
                    </BootstrapForm.Control>
                  </FloatingLabel>
                  <ErrorMessage
                    name="num_infants"
                    component="div"
                    className="text-danger"
                  />
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

              <Button
                variant="white"
                className="border  border-main-color text-end"
                onClick={() => handleNext()}
              >
                Next
              </Button>
              <Button type="submit">Save </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
export default BookingStepOne;
