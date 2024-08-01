import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Row,
  Col,
  FloatingLabel,
  Form as BootstrapForm,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentStep } from "../../../../../../slices/booking/bookingSlice";
import { addUserAsync } from "../../../../../../slices/user/userSlice"; // Assuming you have this action

const validationSchema = Yup.object({
  aircraft: Yup.string().required("Aircraft is required"),
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
    // Initialize aircraft options when airCraftInfo changes
    setAircraftOptions(airCraftInfo?.getAllAircraftResponse?.data || []);
  }, [airCraftInfo]);

  const handleSubmit = (values) => {
    // Adjust the payload if necessary
    dispatch(addUserAsync({ ...values, aircraft: selectedAircraft }))
      .then((response) => {
        if (response?.payload?.success) {
          // Handle success (e.g., show a message or redirect)
        } else {
          console.log("Error please try again");
        }
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });
  };

  if (selectedAircraft) return null;

  const {
    id,
    name,
    model,
    manufacturer,
    engine_type,
    pax_capacity,
    total_seat_capacity,
    luggage_capacity,
    max_flight_range,
    fuel_capacity,
    cruise_speed,
    crew_capacity,
    inflight_services,
    class_configuration,
    remarks,
    created_at,
  } = selectedAircraft;

  const details = [
    { key: "ID" },
    { key: "Name" },
    { key: "Model" },
    { key: "Manufacturer" },
    { key: "Engine Type" },
    { key: "Pax Capacity" },
    { key: "Total Seat Capacity" },
    { key: "Luggage Capacity" },
    { key: "Max Flight Range" },
    { key: "Fuel Capacity" },
    { key: "Cruise Speed" },
    { key: "Crew Capacity" },

    { key: "Remarks", value: remarks },
  ];

  return (
    <Formik
      initialValues={{
        aircraft: "",
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
                    name="aircraft"
                    // onChange={(event) => {
                    //   handleChange(event);
                    //   handleSelectedAircraft(event);
                    // }}
                    value={values.aircraft}
                    isInvalid={touched.aircraft && !!errors.aircraft}
                  >
                    <option value="">Choose Available Aircraft</option>
                    {aircraftOptions.map((type) => (
                      <option value={type.id} key={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </BootstrapForm.Control>
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.aircraft}
                  </BootstrapForm.Control.Feedback>
                </FloatingLabel>
              </BootstrapForm.Group>
            </Col>
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
              Next
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default BookingStepTwo;
