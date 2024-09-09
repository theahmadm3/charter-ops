import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Form as BootstrapForm,
  FloatingLabel,
  Row,
  Col,
} from "react-bootstrap";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { updateAircraftAsync } from "../../../../../slices/aircraft/aircraftSlice";

const validationSchema = Yup.object({
  owned_by: Yup.string().required("Aircraft ownership is required"),
  model: Yup.string()
    .required("Aircraft model is required")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "The model field must only contain letters and numbers."
    ),
  manufacturer: Yup.string().matches(
    /^[a-zA-Z0-9]+$/,
    "The manufacturer field must only contain letters and numbers."
  ),
  total_seat_capacity: Yup.number()
    .required("Total seat capacity is required")
    .positive("Must be a positive number"),
  class_configuration: Yup.object({
    economy: Yup.number().required("Economy class configuration is required"),
    extra_legroom: Yup.number().required(
      "Extra legroom configuration is required"
    ),
    business: Yup.number().required("Business class configuration is required"),
    first_class: Yup.number().required("First class configuration is required"),
  }),
  luggage_capacity: Yup.number()
    .required("Luggage capacity is required")
    .positive("Must be a positive number"),
  max_flight_range: Yup.number()
    .required("Maximum flight range is required")
    .positive("Must be a positive number"),
  fuel_capacity: Yup.number()
    .required("Fuel capacity is required")
    .positive("Must be a positive number"),
  engine_type: Yup.string().matches(
    /^[a-zA-Z0-9]+$/,
    "The engine type field must only contain letters and numbers."
  ),
  inflight_services: Yup.array().min(
    1,
    "At least one inflight service must be selected"
  ),
  crew_capacity: Yup.number()
    .required("Crew capacity is required")
    .positive("Must be a positive number"),
  cruise_speed: Yup.number().positive("Must be a positive number"),
  remarks: Yup.string(),
});

function EditAircraft(props) {
  const dispatch = useDispatch();
  const [remainingSeats, setRemainingSeats] = useState(0);

  useEffect(() => {
    if (props.data && props.data.length > 0) {
      const totalSeats = props.data[0]?.total_seat_capacity || 0;
      const usedSeats =
        (props.data[0]?.class_configuration?.economy || 0) +
        (props.data[0]?.class_configuration?.extra_legroom || 0) +
        (props.data[0]?.class_configuration?.business || 0) +
        (props.data[0]?.class_configuration?.first_class || 0);
      setRemainingSeats(totalSeats - usedSeats);
    }
  }, [props.data]);

  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Aircraft
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            owned_by: props.data?.[0]?.owned_by || "",
            total_seat_capacity: props.data?.[0]?.total_seat_capacity || "",
            inflight_services: props.data?.[0]?.inflight_services || [],
            crew_capacity: props.data?.[0]?.crew_capacity || "",
            location: props.data?.[0]?.location || "",
            aircraft_type: props.data?.[0]?.aircraft_type || "",
            image: props.data?.[0]?.image || "",
            reg_no: props.data?.[0]?.reg_no || "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            try {
              const response = await dispatch(
                updateAircraftAsync({
                  id: props.data?.[0]?.id,
                  values: values,
                })
              );
              if (response?.payload?.success) {
                props.onHide();
              }
            } catch (error) {
              console.error("Error occurred:", error);
            }
          }}
        >
          {({
            errors,
            touched,
            handleSubmit,
            handleChange,
            values,
            setFieldValue,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <BootstrapForm.Group className="mb-3">
                    <FloatingLabel
                      controlId="floatingOwnedBy"
                      label={
                        <div>
                          Aircraft Owned By{" "}
                          <span className="text-danger">*</span>
                        </div>
                      }
                    >
                      <BootstrapForm.Control
                        as="select"
                        name="owned_by"
                        value={values.owned_by}
                        onChange={handleChange}
                        isInvalid={touched.owned_by && !!errors.owned_by}
                      >
                        <option value="">Choose one</option>
                        <option value="company owned">Company Owned</option>
                        <option value="Partnership">Partnership</option>
                        <option value="Management only">Management Only</option>
                      </BootstrapForm.Control>
                      <BootstrapForm.Control.Feedback type="invalid">
                        {errors.owned_by}
                      </BootstrapForm.Control.Feedback>
                    </FloatingLabel>
                  </BootstrapForm.Group>
                </Col>
                <Col md={6}>
                  <BootstrapForm.Group className="mb-3">
                    <FloatingLabel
                      controlId="floatingModel"
                      label={
                        <div>
                          Aircraft Type <span className="text-danger"> *</span>
                        </div>
                      }
                    >
                      <BootstrapForm.Control
                        type="text"
                        placeholder="Aircraft type"
                        name="aircraft_type"
                        value={values.aircraft_type}
                        onChange={handleChange}
                        isInvalid={
                          touched.aircraft_type && !!errors.aircraft_type
                        }
                      />
                      <BootstrapForm.Control.Feedback type="invalid">
                        {errors.aircraft_type}
                      </BootstrapForm.Control.Feedback>
                    </FloatingLabel>
                  </BootstrapForm.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <BootstrapForm.Group className="mb-3">
                    <FloatingLabel
                      controlId="floatingManufacturer"
                      label="Registration No."
                    >
                      <BootstrapForm.Control
                        type="text"
                        placeholder="reg_no"
                        name="reg_no"
                        value={values.reg_no}
                        onChange={handleChange}
                        isInvalid={touched.reg_no && !!errors.reg_no}
                      />
                      <BootstrapForm.Control.Feedback type="invalid">
                        {errors.reg_no}
                      </BootstrapForm.Control.Feedback>
                    </FloatingLabel>
                  </BootstrapForm.Group>
                </Col>
                <Col md={6}>
                  <BootstrapForm.Group className="mb-3">
                    <FloatingLabel
                      controlId="floatingTotalSeatCapacity"
                      label={
                        <div>
                          Total Seat Capacity{" "}
                          <span className="text-danger">*</span>
                        </div>
                      }
                    >
                      <BootstrapForm.Control
                        type="number"
                        placeholder="Total Seat Capacity"
                        name="total_seat_capacity"
                        value={values.total_seat_capacity}
                        onChange={handleChange}
                        isInvalid={
                          touched.total_seat_capacity &&
                          !!errors.total_seat_capacity
                        }
                      />
                      <BootstrapForm.Control.Feedback type="invalid">
                        {errors.total_seat_capacity}
                      </BootstrapForm.Control.Feedback>
                    </FloatingLabel>
                  </BootstrapForm.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <BootstrapForm.Group className="mb-3">
                    <FloatingLabel
                      controlId="floatingMaxFlightRange"
                      label={
                        <div>
                          Location <span className="text-danger">*</span>
                        </div>
                      }
                    >
                      <BootstrapForm.Control
                        type="text"
                        placeholder="Location"
                        name="location"
                        value={values.location}
                        onChange={handleChange}
                        isInvalid={touched.location && !!errors.location}
                      />
                      <BootstrapForm.Control.Feedback type="invalid">
                        {errors.location}
                      </BootstrapForm.Control.Feedback>
                    </FloatingLabel>
                  </BootstrapForm.Group>
                </Col>
                <Col md={6}>
                  <BootstrapForm.Group className="mb-3">
                    <FloatingLabel
                      controlId="floatingCrewCapacity"
                      label={
                        <div>
                          Crew Capacity <span className="text-danger">*</span>
                        </div>
                      }
                    >
                      <BootstrapForm.Control
                        type="number"
                        placeholder="Crew Capacity"
                        name="crew_capacity"
                        value={values.crew_capacity}
                        onChange={handleChange}
                        isInvalid={
                          touched.crew_capacity && !!errors.crew_capacity
                        }
                      />
                      <BootstrapForm.Control.Feedback type="invalid">
                        {errors.crew_capacity}
                      </BootstrapForm.Control.Feedback>
                    </FloatingLabel>
                  </BootstrapForm.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <BootstrapForm.Group className="mb-3">
                    <label>
                      Inflight Services <span className="text-danger"> *</span>
                    </label>
                    <div>
                      {["Meals", "Wi-fi"].map((service) => (
                        <BootstrapForm.Check
                          key={service}
                          inline
                          type="checkbox"
                          id={`inflight_services.${service}`}
                          label={service}
                          name="inflight_services"
                          onChange={(e) => {
                            const newValue = e.target.checked
                              ? [...values.inflight_services, service]
                              : values.inflight_services.filter(
                                  (item) => item !== service
                                );
                            setFieldValue("inflight_services", newValue);
                          }}
                          isInvalid={
                            touched.inflight_services &&
                            !!errors.inflight_services
                          }
                          checked={values.inflight_services.includes(service)}
                        />
                      ))}
                      <BootstrapForm.Control.Feedback type="invalid">
                        {errors.inflight_services}
                      </BootstrapForm.Control.Feedback>
                    </div>
                  </BootstrapForm.Group>
                </Col>
                <Col md={6}>
                  <BootstrapForm.Group className="mb-3">
                    <FloatingLabel
                      controlId="floatingIdFileUpload"
                      label={
                        <div>
                          Image Upload <span className="text-danger">*</span>
                        </div>
                      }
                    >
                      <BootstrapForm.Control
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        name="image"
                        onChange={(e) => handleFileChange(e, setFieldValue)}
                        isInvalid={touched.image && !!errors.image}
                      />
                      <BootstrapForm.Control.Feedback type="invalid">
                        {errors.image}
                      </BootstrapForm.Control.Feedback>
                    </FloatingLabel>
                  </BootstrapForm.Group>
                </Col>
              </Row>

              <Button type="submit">Save</Button>
              <Button variant="danger" className="ms-4" onClick={props.onHide}>
                Close
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

export default EditAircraft;
