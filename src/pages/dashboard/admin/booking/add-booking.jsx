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
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllClientAsync } from "../../../../slices/client/clientSlice";
import { getAllAircraftsAsync } from "../../../../slices/aircraft/aircraftSlice";
import { getAllServicesAsync } from "../../../../slices/config/configSlice";
import { FaTrash } from "react-icons/fa";

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

  return (
    <AdminLayout>
      <Container fluid>
        <Row>
          <Col md={6}>
            <h5>Create new booking</h5>

            <Formik
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
