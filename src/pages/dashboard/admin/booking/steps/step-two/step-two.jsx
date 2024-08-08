import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Row,
  Col,
  FloatingLabel,
  Form as BootstrapForm,
  Button,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addBookingStepTwoAsync,
  getAvailableAircraftAsync,
  setCurrentStep,
} from "../../../../../../slices/booking/bookingSlice";

const validationSchema = Yup.object({
  aircraft_id: Yup.string().required("Aircraft is required"),
});

function BookingStepTwo() {
  const dispatch = useDispatch();
  const [aircraftOptions, setAircraftOptions] = useState([]);
  const [selectedAircraft, setSelectedAircraft] = useState("");
  const airCraftInfo = useSelector((state) => state?.aircraft);
  const bookingInfo = useSelector((state) => state?.booking);

  const handleNext = () => {
    const current = bookingInfo?.currentStep;
    dispatch(setCurrentStep(current + 1));
  };

  const bookingData = bookingInfo?.getAvailableAircraftResponse?.data;
  const handleBack = () => {
    const current = bookingInfo?.currentStep;
    dispatch(setCurrentStep(current - 1));
  };

  const handleSelectedAircraft = (event) => {
    const aircraftId = event.target.value;
    const selected = aircraftOptions.find((a) => a.id === Number(aircraftId));
    setSelectedAircraft(selected);
    console.log("Selected Aircraft:", aircraftId);
  };

  useEffect(() => {
    try {
      dispatch(
        getAvailableAircraftAsync({
          bookingId: bookingInfo?.addBookingStepOneResponse?.data.id,
        })
      );
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    // Initialize aircraft options when airCraftInfo changes
    setAircraftOptions(airCraftInfo?.getAllAircraftResponse?.data || []);
  }, [airCraftInfo]);

  const handleSubmit = (values) => {
    // Adjust the payload if necessary
    dispatch(
      addBookingStepTwoAsync({
        bookingId: bookingInfo?.addBookingStepOneResponse?.data?.id,
        values,
      })
    )
      .then((response) => {
        if (response?.payload?.success) {
          const current = bookingInfo?.currentStep;
          dispatch(setCurrentStep(current + 1));
        } else {
          console.log("Error please try again");
        }
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });
  };

  if (selectedAircraft) return null;

  // const {
  //   id,
  //   name,
  //   model,
  //   manufacturer,
  //   engine_type,
  //   pax_capacity,
  //   total_seat_capacity,
  //   luggage_capacity,
  //   max_flight_range,
  //   fuel_capacity,
  //   cruise_speed,
  //   crew_capacity,
  //   inflight_services,
  //   class_configuration,
  //   remarks,
  //   created_at,
  // } = selectedAircraft;

  // const details = [
  //   { key: "ID" },
  //   { key: "Name" },
  //   { key: "Model" },
  //   { key: "Manufacturer" },
  //   { key: "Engine Type" },
  //   { key: "Pax Capacity" },
  //   { key: "Total Seat Capacity" },
  //   { key: "Luggage Capacity" },
  //   { key: "Max Flight Range" },
  //   { key: "Fuel Capacity" },
  //   { key: "Cruise Speed" },
  //   { key: "Crew Capacity" },

  //   { key: "Remarks", value: remarks },
  // ];

  // console.log("available", bookingInfo?.getAvailableAircraftResponse);

  const [selectedAircraftId, setSelectedAircraftId] = useState(null);

  const handleCardClick = (id) => {
    setSelectedAircraftId(id);
  };

  return (
    <Formik
      initialValues={{
        aircraft_id: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, handleSubmit, values, handleChange }) => (
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <BootstrapForm.Group className="mb-3">
                <FloatingLabel
                  controlId="floatingAircraft"
                  label="Available Aircrafts"
                >
                  <BootstrapForm.Control
                    as="select"
                    name="aircraft_id"
                    // onChange={(event) => {
                    //   handleChange(event);
                    //   handleSelectedAircraft(event);
                    // }}
                    onChange={handleChange}
                    value={values.aircraft_id}
                    isInvalid={touched.aircraft_id && !!errors.aircraft_id}
                  >
                    <option value="">Choose Available Aircraft</option>
                    {Array.isArray(
                      bookingInfo?.getAvailableAircraftResponse
                    ) ? (
                      bookingInfo.getAvailableAircraftResponse.map((type) => (
                        <option value={type.id} key={type.id}>
                          {type.name}
                        </option>
                      ))
                    ) : (
                      <option disabled>No aircraft available</option>
                    )}
                  </BootstrapForm.Control>
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.aircraft_id}
                  </BootstrapForm.Control.Feedback>
                </FloatingLabel>
              </BootstrapForm.Group>
            </Col>
          </Row>
          <Row>
            {Array.isArray(bookingInfo?.getAvailableAircraftResponse) ? (
              bookingInfo.getAvailableAircraftResponse.map((aircraft) => (
                <Col md={6} key={aircraft.id} className="mb-4">
                  <Card
                    className={`aircraft-card ${
                      selectedAircraftId === aircraft.id ? "selected" : ""
                    }`}
                    onClick={() => handleCardClick(aircraft.id)}
                  >
                    <Card.Body>
                      <h3>{aircraft.name}</h3>
                      <Row>
                        <Col md={4}>
                          <Card.Text>
                            <strong>ID:</strong> {aircraft.id}
                          </Card.Text>
                          <Card.Text>
                            <strong>Model:</strong> {aircraft.model}
                          </Card.Text>
                        </Col>
                        <Col md={4}>
                          <Card.Text>
                            <strong>Luggage Capacity:</strong>{" "}
                            {aircraft.luggage_capacity}
                          </Card.Text>
                          <Card.Text>
                            <strong>Cruise Speed:</strong>{" "}
                            {aircraft.cruise_speed}
                          </Card.Text>
                        </Col>

                        <Col md={4}>
                          <Card.Text>
                            <strong>Crew Capacity:</strong>{" "}
                            {aircraft.crew_capacity}
                          </Card.Text>
                          <Card.Text>
                            <strong>Engine Type</strong> {aircraft.engine_type}
                          </Card.Text>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <p>Class Configuration</p>
                        </Col>
                        <Col md={4}>
                          <Card.Text>
                            <strong>Business:</strong>{" "}
                            {aircraft.class_configuration?.business}
                          </Card.Text>
                        </Col>
                        <Col md={4}>
                          <Card.Text>
                            <strong>Economy:</strong>{" "}
                            {aircraft.class_configuration?.economy}
                          </Card.Text>
                        </Col>
                        <Col md={4}>
                          <Card.Text>
                            <strong>First Class:</strong>{" "}
                            {aircraft.class_configuration?.first_class}
                          </Card.Text>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p>No aircraft available.</p>
            )}
          </Row>

          {/* {values.aircraft && (
            <Row>
              {details.map((detail) => (
                <Col key={detail.key} md={6} className="mb-3">
                  <BootstrapForm.Group>
                    <BootstrapForm.Check
                      type="checkbox"
                      label={
                        <span>
                          <strong>{detail.key}:</strong>
                        </span>
                      }
                      checked={Boolean(detail.key)}
                      disabled
                    />
                  </BootstrapForm.Group>
                </Col>
              ))}
            </Row>
          )} */}

          <div className="d-flex justify-content-end mt-3">
            <Button
              variant="white"
              className="border border-main-color text-start"
              onClick={handleBack}
            >
              Back
            </Button>
            {/* <Button
              variant="white"
              className="border border-main-color text-end"
              onClick={handleNext}
            >
              Next
            </Button> */}
            <Button type="submit">Proceed</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default BookingStepTwo;
