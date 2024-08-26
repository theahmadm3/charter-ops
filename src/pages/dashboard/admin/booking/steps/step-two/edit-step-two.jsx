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

function EditBookingStepTwo(props) {
  const dispatch = useDispatch();
  const [aircraftOptions, setAircraftOptions] = useState([]);
  const [selectedAircraft, setSelectedAircraft] = useState("");
  const airCraftInfo = useSelector((state) => state?.aircraft);
  const bookingInfo = useSelector((state) => state?.booking);

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
          bookingId: props?.data[0]?.id,
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
      id: props?.data[0]?.id,

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
        aircraft_id: props?.data[0]?.id,
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
                      <h3>{aircraft.name}</h3>
                      <Row>
                        <Col md={4}>
                          <Card.Text>
                            <strong>ID:</strong> {aircraft.id}
                          </Card.Text>
                          <Card.Text>
                            <strong>Aircraft Type:</strong> {aircraft.model}
                          </Card.Text>
                        </Col>

                        <Col md={4}>
                          <Card.Text>
                            <strong>Crew Capacity:</strong>{" "}
                            {aircraft.crew_capacity}
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

          <div className="d-flex justify-content-end my-3">
            <Button type="submit">Update</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default EditBookingStepTwo;
