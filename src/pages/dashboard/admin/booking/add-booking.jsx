import {
  Container,
  FloatingLabel,
  Form as BootstrapForm,
  Button,
  Row,
  Col,
  Card,
  Table,
} from "react-bootstrap";
import AdminLayout from "../../../../component/layout/admin-layout";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllClientAsync } from "../../../../slices/client/clientSlice";
import { getAllAircraftsAsync } from "../../../../slices/aircraft/aircraftSlice";
import { getAllServicesAsync } from "../../../../slices/config/configSlice";
import { FaTrash } from "react-icons/fa";
import Stepper from "../../../../component/stepper/stepper";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const validationSchema = Yup.object().shape({
  client: Yup.string().required("Client is required"),
  title: Yup.string(),
  pax: Yup.number()
    .required("PAX is required")
    .min(1, "PAX must be at least 1"),
  plane: Yup.string().required("Plane selection is required"),
  flight_date: Yup.date().required("Flight date is required"),
  flight_time: Yup.string().required("Flight time is required"),
  from_location: Yup.string().required("Departure airport is required"),
  to_location: Yup.string().required("Destination airport is required"),
  catering_vendor: Yup.string().required("Catering vendor is required"),
  remarks: Yup.string().required("Remarks are required"),
});

const AddBooking = () => {
  const dispatch = useDispatch();
  const [bookings, setBookings] = useState([]);
  const [step, setStep] = useState(0);
  const clientInfo = useSelector((state) => state?.client);
  const airCraftInfo = useSelector((state) => state?.aircraft);
  const serviceInfo = useSelector((state) => state?.config);
  const airports = [
    {
      value: "LOS",
      label: "Murtala Muhammed International Airport, Lagos (LOS)",
    },
    {
      value: "ABV",
      label: "Nnamdi Azikiwe International Airport, Abuja (ABV)",
    },
    {
      value: "PHC",
      label: "Port Harcourt International Airport, Port Harcourt (PHC)",
    },
    {
      value: "KAN",
      label: "Mallam Aminu Kano International Airport, Kano (KAN)",
    },
    { value: "ENU", label: "Akanu Ibiam International Airport, Enugu (ENU)" },
    {
      value: "CBQ",
      label: "Margaret Ekpo International Airport, Calabar (CBQ)",
    },
    {
      value: "SOK",
      label: "Sadiq Abubakar III International Airport, Sokoto (SOK)",
    },
    { value: "AKR", label: "Akure Airport, Akure (AKR)" },
    { value: "BNI", label: "Benin Airport, Benin City (BNI)" },
    { value: "IBA", label: "Ibadan Airport, Ibadan (IBA)" },
    {
      value: "JFK",
      label: "John F. Kennedy International Airport, New York (JFK)",
    },
    { value: "LHR", label: "Heathrow Airport, London (LHR)" },
    { value: "HND", label: "Tokyo Haneda Airport, Tokyo (HND)" },
    { value: "DXB", label: "Dubai International Airport, Dubai (DXB)" },
    { value: "CDG", label: "Charles de Gaulle Airport, Paris (CDG)" },
    { value: "SIN", label: "Singapore Changi Airport, Singapore (SIN)" },
    { value: "SYD", label: "Sydney Kingsford Smith Airport, Sydney (SYD)" },
    { value: "HKG", label: "Hong Kong International Airport, Hong Kong (HKG)" },
    {
      value: "LAX",
      label: "Los Angeles International Airport, Los Angeles (LAX)",
    },
    { value: "FRA", label: "Frankfurt Airport, Frankfurt (FRA)" },
  ];

  const handleEdit = (index) => {
    const bookingToEdit = bookings[index];
    // Prefill the form with the selected booking details
    // You can use Formik's `setValues` method to do this
  };

  const handleRemove = (index) => {
    setBookings((prevBookings) => prevBookings.filter((_, i) => i !== index));
  };

  useEffect(() => {
    try {
      dispatch(getAllClientAsync());
      dispatch(getAllAircraftsAsync());
      dispatch(getAllServicesAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const handleFormClear = (resetForm) => {
    resetForm();
  };

  const steps = [
    { component: "Step one", label: "Service Type" },
    { component: "Step two", label: "Appointment" },
    { component: "Step three", label: "Applicant Data" },
    { component: "Step four", label: "Payment" },
  ];

  const handleStepClick = (stepIndex) => {
    setStep(+1);
    // const isValid = validateStep(step);

    // if (isValid) {
    //   dispatch(setCurrentStep(stepIndex));
    // } else {
    //   toast.info("Please complete the current step before proceeding.");
    // }
  };

  const localAirports = ["Abuja", "Lagos", "Port Harcourt"];
  const internationalAirports = ["London", "Dubai", "Paris"];
  const destinations = ["Kano", "Kaduna", "Enugu"];
  const aircraftTypes = ["Jet 1", "Jet 2", "Jet 3"];

  const validationSchema = Yup.object().shape({
    trip_type: Yup.string().required("Trip type is required"),
    from: Yup.string().required("Departure airport is required"),
    to: Yup.string()
      .required("Destination airport is required")
      .notOneOf([Yup.ref("from")], "Origin and destination cannot be the same"),
    departure_date: Yup.date()
      .required("Departure date and time are required")
      .min(new Date(), "Departure date cannot be in the past"),
    return_date: Yup.date().min(
      Yup.ref("departure_date"),
      "Return date cannot be before departure date"
    ),
    passengers: Yup.object().shape({
      adults: Yup.number()
        .min(1, "At least one adult is required")
        .required("Number of adults is required"),
      children: Yup.number().min(0).required("Number of children is required"),
      infants: Yup.number().min(0).required("Number of infants is required"),
    }),
    aircraft_type: Yup.string().required("Aircraft type is required"),
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
    trip_type: "local",
    from: "",
    to: "",
    departure_date: new Date(),
    return_date: "",
    passengers: {
      adults: 1,
      children: 0,
      infants: 0,
    },
    aircraft_type: "",
    multi_leg_route: false,
    legs: [],
  };

  return (
    <AdminLayout>
      <Container fluid>
        <Row>
          <Col md={6}>
            <h5>Create new booking</h5>
            {/* <Stepper
              steps={steps}
              activeStep={step}
              onClick={(step) => handleStepClick(step)}
            />
            {step === 0 && "Form one"}
            {step === 1 && "Form two"}
            {step === 2 && "From three"}
            {step === 3 && "From four"} */}
            {/* <Formik
              initialValues={{
                client: "",
                title: "",
                pax: "",
                plane: "",
                flight_date: "",
                flight_time: "",
                from_location: "",
                to_location: "",
                catering_vendor: "",
                remarks: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { resetForm }) => {
                setBookings((prevBookings) => [...prevBookings, values]);
                resetForm();
              }}
            >
              {({
                errors,
                touched,
                handleSubmit,
                handleChange,
                values,
                resetForm,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <BootstrapForm.Group className="mb-3">
                        <FloatingLabel
                          controlId="floatingClient"
                          label="Select Client"
                        >
                          <BootstrapForm.Control
                            as="select"
                            name="client"
                            onChange={handleChange}
                            value={values.client}
                            isInvalid={touched.client && !!errors.client}
                          >
                            <option value="">Select Client</option>
                            {clientInfo?.getAllClientsResponse?.data?.map(
                              (client) => (
                                <option key={client.id} value={client.id}>
                                  {client.first_name + " " + client.last_name}
                                </option>
                              )
                            )}
                          </BootstrapForm.Control>
                          <BootstrapForm.Control.Feedback type="invalid">
                            {errors.client}
                          </BootstrapForm.Control.Feedback>
                        </FloatingLabel>
                      </BootstrapForm.Group>
                    </Col>
                    <Col md={6}>
                      <BootstrapForm.Group className="mb-3">
                        <FloatingLabel controlId="floatingTitle" label="Title">
                          <BootstrapForm.Control
                            as="select"
                            name="title"
                            onChange={handleChange}
                            value={values.title}
                            isInvalid={touched.title && !!errors.title}
                          >
                            <option value="">Select Title</option>
                            <option value="Dr">Dr</option>
                            <option value="Mrs">Mrs</option>
                            <option value="Mr">Mr</option>
                            <option value="Alhaji">Alhaji</option>
                            <option value="Hajiya">Hajiya</option>
                            <option value="Honorable">Honorable</option>
                            <option value="Senator">Senator</option>
                          </BootstrapForm.Control>
                          <BootstrapForm.Control.Feedback type="invalid">
                            {errors.title}
                          </BootstrapForm.Control.Feedback>
                        </FloatingLabel>
                      </BootstrapForm.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <BootstrapForm.Group className="mb-3">
                        <FloatingLabel controlId="floatingPAX" label="PAX">
                          <BootstrapForm.Control
                            type="number"
                            placeholder="PAX"
                            name="pax"
                            onChange={handleChange}
                            value={values.pax}
                            isInvalid={touched.pax && !!errors.pax}
                          />
                          <BootstrapForm.Control.Feedback type="invalid">
                            {errors.pax}
                          </BootstrapForm.Control.Feedback>
                        </FloatingLabel>
                      </BootstrapForm.Group>
                    </Col>
                    <Col md={6}>
                      <BootstrapForm.Group className="mb-3">
                        <FloatingLabel
                          controlId="floatingPlane"
                          label="Select Plane"
                        >
                          <BootstrapForm.Control
                            as="select"
                            name="plane"
                            onChange={handleChange}
                            value={values.plane}
                            isInvalid={touched.plane && !!errors.plane}
                          >
                            <option value="">Select Plane</option>
                            {airCraftInfo?.getAllAircraftResponse?.data?.map(
                              (aircraft) => (
                                <option key={aircraft.id} value={aircraft.id}>
                                  {aircraft.name}
                                </option>
                              )
                            )}
                          </BootstrapForm.Control>
                          <BootstrapForm.Control.Feedback type="invalid">
                            {errors.plane}
                          </BootstrapForm.Control.Feedback>
                        </FloatingLabel>
                      </BootstrapForm.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <BootstrapForm.Group className="mb-3">
                        <FloatingLabel
                          controlId="floatingFlightDate"
                          label="Select Flight Date"
                        >
                          <BootstrapForm.Control
                            type="date"
                            name="flight_date"
                            onChange={handleChange}
                            value={values.flight_date}
                            isInvalid={
                              touched.flight_date && !!errors.flight_date
                            }
                          />
                          <BootstrapForm.Control.Feedback type="invalid">
                            {errors.flight_date}
                          </BootstrapForm.Control.Feedback>
                        </FloatingLabel>
                      </BootstrapForm.Group>
                    </Col>
                    <Col md={6}>
                      <BootstrapForm.Group className="mb-3">
                        <FloatingLabel
                          controlId="floatingFlightTime"
                          label="Select Flight Time"
                        >
                          <BootstrapForm.Control
                            type="time"
                            name="flight_time"
                            onChange={handleChange}
                            value={values.flight_time}
                            isInvalid={
                              touched.flight_time && !!errors.flight_time
                            }
                          />
                          <BootstrapForm.Control.Feedback type="invalid">
                            {errors.flight_time}
                          </BootstrapForm.Control.Feedback>
                        </FloatingLabel>
                      </BootstrapForm.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <BootstrapForm.Group className="mb-3">
                        <FloatingLabel
                          controlId="floatingFromLocation"
                          label="Departure Airport"
                        >
                          <BootstrapForm.Control
                            as="select"
                            name="from_location"
                            onChange={handleChange}
                            value={values.from_location}
                            isInvalid={
                              touched.from_location && !!errors.from_location
                            }
                          >
                            <option value="">Select Departure Airport</option>
                            {airports.map((airport) => (
                              <option key={airport.value} value={airport.value}>
                                {airport.label}
                              </option>
                            ))}
                          </BootstrapForm.Control>
                          <BootstrapForm.Control.Feedback type="invalid">
                            {errors.from_location}
                          </BootstrapForm.Control.Feedback>
                        </FloatingLabel>
                      </BootstrapForm.Group>
                    </Col>
                    <Col md={6}>
                      <BootstrapForm.Group className="mb-3">
                        <FloatingLabel
                          controlId="floatingToLocation"
                          label="Destination Airport"
                        >
                          <BootstrapForm.Control
                            as="select"
                            name="to_location"
                            onChange={handleChange}
                            value={values.to_location}
                            isInvalid={
                              touched.to_location && !!errors.to_location
                            }
                          >
                            <option value="">Select Destination Airport</option>
                            {airports.map((airport) => (
                              <option key={airport.value} value={airport.value}>
                                {airport.label}
                              </option>
                            ))}
                          </BootstrapForm.Control>
                          <BootstrapForm.Control.Feedback type="invalid">
                            {errors.to_location}
                          </BootstrapForm.Control.Feedback>
                        </FloatingLabel>
                      </BootstrapForm.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <BootstrapForm.Group className="mb-3">
                        <FloatingLabel
                          controlId="floatingCateringVendor"
                          label="Select Catering Vendor"
                        >
                          <BootstrapForm.Control
                            as="select"
                            name="catering_vendor"
                            onChange={handleChange}
                            value={values.catering_vendor}
                            isInvalid={
                              touched.catering_vendor &&
                              !!errors.catering_vendor
                            }
                          >
                            <option value="">Select Catering Vendor</option>
                            {serviceInfo?.getAllServicesResponse?.data?.map(
                              (service) => (
                                <option key={service.id} value={service.id}>
                                  {service.service_name}
                                </option>
                              )
                            )}
                          </BootstrapForm.Control>
                          <BootstrapForm.Control.Feedback type="invalid">
                            {errors.catering_vendor}
                          </BootstrapForm.Control.Feedback>
                        </FloatingLabel>
                      </BootstrapForm.Group>
                    </Col>
                    <Col md={6}>
                      <BootstrapForm.Group className="mb-3">
                        <FloatingLabel
                          controlId="floatingRemarks"
                          label="Remarks"
                        >
                          <BootstrapForm.Control
                            as="textarea"
                            placeholder="Leave a comment here"
                            name="remarks"
                            onChange={handleChange}
                            value={values.remarks}
                            isInvalid={touched.remarks && !!errors.remarks}
                          />
                          <BootstrapForm.Control.Feedback type="invalid">
                            {errors.remarks}
                          </BootstrapForm.Control.Feedback>
                        </FloatingLabel>
                      </BootstrapForm.Group>
                    </Col>
                  </Row>

                  <Row className="mt-2">
                    <Col>
                      <Button variant="primary" type="submit">
                        Submit
                      </Button>
                      <Button
                        type="button"
                        variant="danger"
                        className="mx-3"
                        onClick={() => handleFormClear(resetForm)}
                      >
                        Clear
                      </Button>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik> */}

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                console.log(values);
                // Handle form submission
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
                    <Col md={12}>
                      <BootstrapForm.Group>
                        <FloatingLabel
                          controlId="floatingTripType"
                          label="Select Trip Type"
                          className="my-2"
                        >
                          <Form.Control
                            as="select"
                            name="trip_type"
                            value={values.trip_type}
                            onChange={(e) => {
                              setFieldValue("trip_type", e.target.value);
                              if (e.target.value === "local") {
                                setFieldValue("from", localAirports[0]);
                              }
                            }}
                          >
                            <option value="local">Local</option>
                            <option value="international">International</option>
                          </Form.Control>
                        </FloatingLabel>
                      </BootstrapForm.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <BootstrapForm.Group>
                        <FloatingLabel
                          controlId="floatingFrom"
                          label="From"
                          className="my-2"
                        >
                          <Form.Control
                            as="select"
                            name="from"
                            value={values.from}
                            onChange={handleChange}
                            disabled={values.trip_type === "international"}
                          >
                            {values.trip_type === "local"
                              ? localAirports.map((airport) => (
                                  <option value={airport} key={airport}>
                                    {airport}
                                  </option>
                                ))
                              : internationalAirports.map((airport) => (
                                  <option value={airport} key={airport}>
                                    {airport}
                                  </option>
                                ))}
                          </Form.Control>
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
                          {/* <Autocomplete
                            items={destinations}
                            getItemValue={(item) => item}
                            renderItem={(item, isHighlighted) => (
                              <div
                                key={item}
                                style={{
                                  background: isHighlighted
                                    ? "lightgray"
                                    : "white",
                                }}
                              >
                                {item}
                              </div>
                            )}
                            value={values.to}
                            onChange={(e) =>
                              setFieldValue("to", e.target.value)
                            }
                            onSelect={(value) => setFieldValue("to", value)}
                          /> */}
                        </FloatingLabel>
                        <ErrorMessage
                          name="to"
                          component="div"
                          className="text-danger"
                        />
                      </BootstrapForm.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <BootstrapForm.Group>
                        <FloatingLabel
                          controlId="floatingDepartureDate"
                          label="Departure Date and Time"
                          className="my-2"
                        >
                          <DatePicker
                            selected={values.departure_date}
                            onChange={(date) =>
                              setFieldValue("departure_date", date)
                            }
                            showTimeSelect
                            dateFormat="Pp"
                            minDate={new Date()}
                          />
                        </FloatingLabel>
                        <ErrorMessage
                          name="departure_date"
                          component="div"
                          className="text-danger"
                        />
                      </BootstrapForm.Group>
                    </Col>

                    <Col md={6}>
                      <BootstrapForm.Group>
                        <FloatingLabel
                          controlId="floatingReturnDate"
                          label="Return Date and Time"
                          className="my-2"
                        >
                          <DatePicker
                            selected={values.return_date}
                            onChange={(date) =>
                              setFieldValue("return_date", date)
                            }
                            showTimeSelect
                            dateFormat="Pp"
                            minDate={values.departure_date}
                          />
                        </FloatingLabel>
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
                          <Form.Control
                            as="select"
                            name="passengers.adults"
                            value={values.passengers.adults}
                            onChange={handleChange}
                          >
                            {[...Array(10).keys()].map((num) => (
                              <option value={num + 1} key={num}>
                                {num + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </FloatingLabel>
                        <ErrorMessage
                          name="passengers.adults"
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
                          <Form.Control
                            as="select"
                            name="passengers.children"
                            value={values.passengers.children}
                            onChange={handleChange}
                          >
                            {[...Array(6).keys()].map((num) => (
                              <option value={num} key={num}>
                                {num}
                              </option>
                            ))}
                          </Form.Control>
                        </FloatingLabel>
                        <ErrorMessage
                          name="passengers.children"
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
                          <Form.Control
                            as="select"
                            name="passengers.infants"
                            value={values.passengers.infants}
                            onChange={handleChange}
                          >
                            {[...Array(3).keys()].map((num) => (
                              <option value={num} key={num}>
                                {num}
                              </option>
                            ))}
                          </Form.Control>
                        </FloatingLabel>
                        <ErrorMessage
                          name="passengers.infants"
                          component="div"
                          className="text-danger"
                        />
                      </BootstrapForm.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={12}>
                      <BootstrapForm.Group>
                        <FloatingLabel
                          controlId="floatingAircraftType"
                          label="Aircraft Type"
                          className="my-2"
                        >
                          <Form.Control
                            as="select"
                            name="aircraft_type"
                            value={values.aircraft_type}
                            onChange={handleChange}
                          >
                            {aircraftTypes.map((type) => (
                              <option value={type} key={type}>
                                {type}
                              </option>
                            ))}
                          </Form.Control>
                        </FloatingLabel>
                        <ErrorMessage
                          name="aircraft_type"
                          component="div"
                          className="text-danger"
                        />
                      </BootstrapForm.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={12}>
                      <BootstrapForm.Group>
                        <Form.Check
                          type="checkbox"
                          label="Multi-Leg Route"
                          name="multi_leg_route"
                          checked={values.multi_leg_route}
                          onChange={() =>
                            setFieldValue(
                              "multi_leg_route",
                              !values.multi_leg_route
                            )
                          }
                        />
                      </BootstrapForm.Group>
                    </Col>
                  </Row>

                  {values.multi_leg_route && (
                    <div>
                      {values.legs.map((leg, index) => (
                        <div key={index}>
                          <h5>Leg {index + 1}</h5>
                          <Row>
                            <Col md={6}>
                              <BootstrapForm.Group>
                                <FloatingLabel
                                  controlId={`floatingLegFrom${index}`}
                                  label="From"
                                  className="my-2"
                                >
                                  <Form.Control
                                    as="select"
                                    name={`legs.${index}.from`}
                                    value={leg.from}
                                    onChange={handleChange}
                                  >
                                    {localAirports
                                      .concat(internationalAirports)
                                      .map((airport) => (
                                        <option value={airport} key={airport}>
                                          {airport}
                                        </option>
                                      ))}
                                  </Form.Control>
                                </FloatingLabel>
                                <ErrorMessage
                                  name={`legs.${index}.from`}
                                  component="div"
                                  className="text-danger"
                                />
                              </BootstrapForm.Group>
                            </Col>

                            <Col md={6}>
                              <BootstrapForm.Group>
                                <FloatingLabel
                                  controlId={`floatingLegTo${index}`}
                                  label="To"
                                  className="my-2"
                                >
                                  <Autocomplete
                                    items={destinations}
                                    getItemValue={(item) => item}
                                    renderItem={(item, isHighlighted) => (
                                      <div
                                        key={item}
                                        style={{
                                          background: isHighlighted
                                            ? "lightgray"
                                            : "white",
                                        }}
                                      >
                                        {item}
                                      </div>
                                    )}
                                    value={leg.to}
                                    onChange={(e) =>
                                      setFieldValue(
                                        `legs.${index}.to`,
                                        e.target.value
                                      )
                                    }
                                    onSelect={(value) =>
                                      setFieldValue(`legs.${index}.to`, value)
                                    }
                                  />
                                </FloatingLabel>
                                <ErrorMessage
                                  name={`legs.${index}.to`}
                                  component="div"
                                  className="text-danger"
                                />
                              </BootstrapForm.Group>
                            </Col>
                          </Row>

                          <Row>
                            <Col md={6}>
                              <BootstrapForm.Group>
                                <FloatingLabel
                                  controlId={`floatingLegDepartureDate${index}`}
                                  label="Departure Date and Time"
                                  className="my-2"
                                >
                                  <DatePicker
                                    selected={leg.departure_date}
                                    onChange={(date) =>
                                      setFieldValue(
                                        `legs.${index}.departure_date`,
                                        date
                                      )
                                    }
                                    showTimeSelect
                                    dateFormat="Pp"
                                    minDate={new Date()}
                                  />
                                </FloatingLabel>
                                <ErrorMessage
                                  name={`legs.${index}.departure_date`}
                                  component="div"
                                  className="text-danger"
                                />
                              </BootstrapForm.Group>
                            </Col>

                            <Col md={6}>
                              <BootstrapForm.Group>
                                <FloatingLabel
                                  controlId={`floatingLegArrivalDate${index}`}
                                  label="Arrival Date and Time"
                                  className="my-2"
                                >
                                  <DatePicker
                                    selected={leg.arrival_date}
                                    onChange={(date) =>
                                      setFieldValue(
                                        `legs.${index}.arrival_date`,
                                        date
                                      )
                                    }
                                    showTimeSelect
                                    dateFormat="Pp"
                                    minDate={leg.departure_date}
                                  />
                                </FloatingLabel>
                                <ErrorMessage
                                  name={`legs.${index}.arrival_date`}
                                  component="div"
                                  className="text-danger"
                                />
                              </BootstrapForm.Group>
                            </Col>
                          </Row>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="d-flex justify-content-end mt-3">
                    <Button type="submit">Save</Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Col>

          <Col md={6}>
            <h5>Recent Bookings</h5>
            <Card className="border-info">
              <Card.Body>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Client</th>
                      <th>Plane</th>
                      <th>Flight Date</th>
                      <th>Flight Time</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Vendor</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="text-center">
                          No recent bookings
                        </td>
                      </tr>
                    ) : (
                      bookings.map((booking, index) => (
                        <tr key={index}>
                          <td>{booking.client}</td>
                          <td>{booking.plane}</td>
                          <td>{booking.flight_date}</td>
                          <td>{booking.flight_time}</td>
                          <td>{booking.from_location}</td>
                          <td>{booking.to_location}</td>
                          <td>{booking.catering_vendor}</td>
                          <td>
                            {/* <Button
                              variant="warning"
                              size="sm"
                              onClick={() => handleEdit(index)}
                            >
                              <FaEdit />
                            </Button>{" "} */}
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleRemove(index)}
                            >
                              <FaTrash />
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </AdminLayout>
  );
};

export default AddBooking;
