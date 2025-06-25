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
        bookingId: props?.data[0]?.id,
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

  const [selectedAircraftId, setSelectedAircraftId] = useState(
    props?.data[0]?.aircraft?.id || null
  );
  const handleCardClick = (id) => {
    setSelectedAircraftId(id);
  };
  useEffect(() => {
    if (props?.data) {
      setSelectedAircraftId(props.data[0]?.aircraft?.id);
    }
  }, [props?.data]);
  return (
    <Formik
      initialValues={{
        aircraft_id: props?.data[0]?.aircraft?.id,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, handleSubmit, values, handleChange }) => (
        <Form onSubmit={handleSubmit}>
          <div className="my-5">
            <h5>Selected Aircraft</h5>
            <Card
              className={`aircraft-card ${
                selectedAircraftId === props?.data[0]?.aircraft?.id
                  ? "selected"
                  : ""
              }`}
              onClick={() => handleCardClick(props?.data[0]?.aircraft?.id)}
            >
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <h3>{props?.data[0]?.aircraft?.aircraft_type}</h3>
                  </Col>
                  <Col md={6}>
                    <h3>{props?.data[0]?.aircraft?.reg_no}</h3>
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <Card.Text>
                      <strong>ID:</strong> {props?.data[0]?.aircraft?.id}
                    </Card.Text>
                    <Card.Text>
                      <strong>Aircraft Type:</strong>{" "}
                      {props?.data[0]?.aircraft?.aircraft_type}
                    </Card.Text>
                  </Col>
                  <Col md={6}>
                    <Card.Text>
                      <strong>Crew Capacity:</strong>{" "}
                      {props?.data[0]?.aircraft?.crew_capacity}
                    </Card.Text>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </div>
          <Row>
            <h5>Other Available Aircraft</h5>
            {Array.isArray(bookingInfo?.getAvailableAircraftResponse) ? (
              bookingInfo.getAvailableAircraftResponse.map((aircraft) => (
                <Col md={6} key={aircraft?.id} className="mb-4">
                  <Card
                    className={`aircraft-card ${
                      selectedAircraftId === aircraft?.id ? "selected" : ""
                    }`}
                    onClick={() => handleCardClick(aircraft?.id)}
                  >
                    <Card.Body>
                      <Row>
                        <Col md={6}>
                          <h3>{aircraft?.aircraft_type}</h3>
                        </Col>
                        <Col md={6}>
                          <h3>{aircraft?.reg_no}</h3>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={4}>
                          <Card.Text>
                            <strong>ID:</strong> {aircraft?.id}
                          </Card.Text>
                          <Card.Text>
                            <strong>Aircraft Type:</strong>{" "}
                            {aircraft?.aircraft_type}
                          </Card.Text>
                        </Col>
                        <Col md={6}>
                          <Card.Text>
                            <strong>Crew Capacity:</strong>{" "}
                            {aircraft?.crew_capacity}
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

          <div className=" my-3">
            <Button type="submit">Update Flight Information</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default EditBookingStepTwo;
