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
  // aircraft_id: Yup.string().required("Aircraft is required"),
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
    const payload = {
      ...values,
      aircraft_id: selectedAircraftId,
    };
    dispatch(
      addBookingStepTwoAsync({
        bookingId: bookingInfo?.addBookingStepOneResponse?.data?.id,
        values: payload,
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
          {/* <Row>
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
          </Row> */}
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
                      <Row>
                        <Col md={6}>
                          <h3>{aircraft.aircraft_type}</h3>
                        </Col>
                        <Col md={6}>
                          <h3>{aircraft.reg_no}</h3>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <Card.Text>
                            <strong>ID:</strong> {aircraft.id}
                          </Card.Text>
                          <Card.Text>
                            <strong>Aircraft Type:</strong>{" "}
                            {aircraft.aircraft_type}
                          </Card.Text>
                        </Col>

                        <Col md={4}>
                          <Card.Text>
                            <strong>Crew Capacity:</strong>{" "}
                            {aircraft.crew_capacity}
                          </Card.Text>

                          <Card.Text>
                            <strong>Seat Capacity:</strong>{" "}
                            {aircraft.total_seat_capacity}
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
            <Button
              variant="white"
              className="border border-main-color text-end"
              onClick={handleNext}
            >
              Proceed
            </Button>
            <Button type="submit">Save & proceed</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default BookingStepTwo;
