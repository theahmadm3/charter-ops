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
            model: props.data?.[0]?.model || "",
            manufacturer: props.data?.[0]?.manufacturer || "",
            total_seat_capacity: props.data?.[0]?.total_seat_capacity || "",
            class_configuration: {
              economy: props.data?.[0]?.class_configuration?.economy || 0,
              extra_legroom:
                props.data?.[0]?.class_configuration?.extra_legroom || 0,
              business: props.data?.[0]?.class_configuration?.business || 0,
              first_class:
                props.data?.[0]?.class_configuration?.first_class || 0,
            },
            luggage_capacity: props.data?.[0]?.luggage_capacity || "",
            max_flight_range: props.data?.[0]?.max_flight_range || "",
            fuel_capacity: props.data?.[0]?.fuel_capacity || "",
            engine_type: props.data?.[0]?.engine_type || "",
            inflight_services: props.data?.[0]?.inflight_services || [],
            crew_capacity: props.data?.[0]?.crew_capacity || "",
            cruise_speed: props.data?.[0]?.cruise_speed || "",
            remarks: props.data?.[0]?.remarks || "",
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
                      label="Aircraft Owned By"
                    >
                      <BootstrapForm.Control
                        as="select"
                        name="owned_by"
                        onChange={handleChange}
                        isInvalid={touched.owned_by && !!errors.owned_by}
                        value={values.owned_by}
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
                      label="Aircraft Model"
                    >
                      <BootstrapForm.Control
                        type="text"
                        placeholder="Aircraft Model"
                        name="model"
                        onChange={handleChange}
                        isInvalid={touched.model && !!errors.model}
                        value={values.model}
                      />
                      <BootstrapForm.Control.Feedback type="invalid">
                        {errors.model}
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
                      label="Manufacturer"
                    >
                      <BootstrapForm.Control
                        type="text"
                        placeholder="Manufacturer"
                        name="manufacturer"
                        onChange={handleChange}
                        isInvalid={
                          touched.manufacturer && !!errors.manufacturer
                        }
                        value={values.manufacturer}
                      />
                      <BootstrapForm.Control.Feedback type="invalid">
                        {errors.manufacturer}
                      </BootstrapForm.Control.Feedback>
                    </FloatingLabel>
                  </BootstrapForm.Group>
                </Col>
                <Col md={6}>
                  <BootstrapForm.Group className="mb-3">
                    <FloatingLabel
                      controlId="floatingTotalSeatCapacity"
                      label="Total Seat Capacity"
                    >
                      <BootstrapForm.Control
                        type="number"
                        placeholder="Total Seat Capacity"
                        name="total_seat_capacity"
                        onChange={(e) => {
                          handleChange(e);
                          const totalSeats = e.target.value;
                          const usedSeats =
                            (values.class_configuration.economy || 0) +
                            (values.class_configuration.extra_legroom || 0) +
                            (values.class_configuration.business || 0) +
                            (values.class_configuration.first_class || 0);
                          setRemainingSeats(totalSeats - usedSeats);
                        }}
                        isInvalid={
                          touched.total_seat_capacity &&
                          !!errors.total_seat_capacity
                        }
                        value={values.total_seat_capacity}
                      />
                      <BootstrapForm.Control.Feedback type="invalid">
                        {errors.total_seat_capacity}
                      </BootstrapForm.Control.Feedback>
                      <div>Remaining Seats: {remainingSeats}</div>
                    </FloatingLabel>
                  </BootstrapForm.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <FieldArray
                    name="class_configuration"
                    render={() => (
                      <BootstrapForm.Group className="mb-3">
                        <label>Class Configuration</label>
                        <div>
                          {[
                            { name: "economy", label: "Economy" },
                            { name: "extra_legroom", label: "Extra Legroom" },
                            { name: "business", label: "Business" },
                            { name: "first_class", label: "First Class" },
                          ].map(({ name, label }) => (
                            <div key={name} className="mb-2">
                              <BootstrapForm.Check
                                inline
                                type="checkbox"
                                id={`class_configuration.${name}`}
                                label={label}
                                name={`class_configuration.${name}`}
                                onChange={(e) => {
                                  const newValue = e.target.checked ? 1 : 0;
                                  setFieldValue(
                                    `class_configuration.${name}`,
                                    newValue
                                  );
                                  const totalSeats = values.total_seat_capacity;
                                  const usedSeats =
                                    (values.class_configuration.economy || 0) +
                                    (values.class_configuration.extra_legroom ||
                                      0) +
                                    (values.class_configuration.business || 0) +
                                    (values.class_configuration.first_class ||
                                      0);
                                  setRemainingSeats(totalSeats - usedSeats);
                                }}
                                checked={values.class_configuration[name] === 1}
                                isInvalid={
                                  touched.class_configuration?.[name] &&
                                  !!errors.class_configuration?.[name]
                                }
                              />
                              {/* {values.class_configuration[name] === 1 && (
                                <BootstrapForm.Control
                                  type="number"
                                  placeholder={`${label} seats`}
                                  name={`class_configuration.${name}`}
                                  onChange={(e) => {
                                    handleChange(e);
                                    const totalSeats =
                                      values.total_seat_capacity;
                                    const usedSeats =
                                      (values.class_configuration.economy ||
                                        0) +
                                      (values.class_configuration
                                        .extra_legroom || 0) +
                                      (values.class_configuration.business ||
                                        0) +
                                      (values.class_configuration.first_class ||
                                        0);
                                    setRemainingSeats(totalSeats - usedSeats);
                                  }}
                                  isInvalid={
                                    touched.class_configuration?.[name] &&
                                    !!errors.class_configuration?.[name]
                                  }
                                  value={values.class_configuration[name]}
                                />
                              )} */}
                              <BootstrapForm.Control.Feedback type="invalid">
                                {errors.class_configuration?.[name]}
                              </BootstrapForm.Control.Feedback>
                            </div>
                          ))}
                        </div>
                      </BootstrapForm.Group>
                    )}
                  />
                </Col>
                <Col md={6}>
                  <BootstrapForm.Group className="mb-3">
                    <FloatingLabel
                      controlId="floatingLuggageCapacity"
                      label="Luggage Capacity (kg)"
                    >
                      <BootstrapForm.Control
                        type="number"
                        placeholder="Luggage Capacity"
                        name="luggage_capacity"
                        onChange={handleChange}
                        isInvalid={
                          touched.luggage_capacity && !!errors.luggage_capacity
                        }
                        value={values.luggage_capacity}
                      />
                      <BootstrapForm.Control.Feedback type="invalid">
                        {errors.luggage_capacity}
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
                      label="Maximum Flight Range (Km or miles)"
                    >
                      <BootstrapForm.Control
                        type="number"
                        placeholder="Maximum Flight Range"
                        name="max_flight_range"
                        onChange={handleChange}
                        isInvalid={
                          touched.max_flight_range && !!errors.max_flight_range
                        }
                        value={values.max_flight_range}
                      />
                      <BootstrapForm.Control.Feedback type="invalid">
                        {errors.max_flight_range}
                      </BootstrapForm.Control.Feedback>
                    </FloatingLabel>
                  </BootstrapForm.Group>
                </Col>
                <Col md={6}>
                  <BootstrapForm.Group className="mb-3">
                    <FloatingLabel
                      controlId="floatingFuelCapacity"
                      label="Fuel Capacity (liters or gallons)"
                    >
                      <BootstrapForm.Control
                        type="number"
                        placeholder="Fuel Capacity"
                        name="fuel_capacity"
                        onChange={handleChange}
                        isInvalid={
                          touched.fuel_capacity && !!errors.fuel_capacity
                        }
                        value={values.fuel_capacity}
                      />
                      <BootstrapForm.Control.Feedback type="invalid">
                        {errors.fuel_capacity}
                      </BootstrapForm.Control.Feedback>
                    </FloatingLabel>
                  </BootstrapForm.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <BootstrapForm.Group className="mb-3">
                    <FloatingLabel
                      controlId="floatingEngineType"
                      label="Engine Type"
                    >
                      <BootstrapForm.Control
                        type="text"
                        placeholder="Engine Type"
                        name="engine_type"
                        onChange={handleChange}
                        isInvalid={touched.engine_type && !!errors.engine_type}
                        value={values.engine_type}
                      />
                      <BootstrapForm.Control.Feedback type="invalid">
                        {errors.engine_type}
                      </BootstrapForm.Control.Feedback>
                    </FloatingLabel>
                  </BootstrapForm.Group>
                </Col>
                <Col md={6}>
                  <BootstrapForm.Group className="mb-3">
                    <label>Inflight Services</label>
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
                            const newServices = [...values.inflight_services];
                            if (e.target.checked) {
                              newServices.push(service);
                            } else {
                              const index = newServices.indexOf(service);
                              if (index > -1) {
                                newServices.splice(index, 1);
                              }
                            }
                            setFieldValue("inflight_services", newServices);
                          }}
                          checked={values.inflight_services.includes(service)}
                          isInvalid={
                            touched.inflight_services &&
                            !!errors.inflight_services
                          }
                        />
                      ))}
                      <BootstrapForm.Control.Feedback type="invalid">
                        {errors.inflight_services}
                      </BootstrapForm.Control.Feedback>
                    </div>
                  </BootstrapForm.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <BootstrapForm.Group className="mb-3">
                    <FloatingLabel
                      controlId="floatingCrewCapacity"
                      label="Crew Capacity"
                    >
                      <BootstrapForm.Control
                        type="number"
                        placeholder="Crew Capacity"
                        name="crew_capacity"
                        onChange={handleChange}
                        isInvalid={
                          touched.crew_capacity && !!errors.crew_capacity
                        }
                        value={values.crew_capacity}
                      />
                      <BootstrapForm.Control.Feedback type="invalid">
                        {errors.crew_capacity}
                      </BootstrapForm.Control.Feedback>
                    </FloatingLabel>
                  </BootstrapForm.Group>
                </Col>
                <Col md={6}>
                  <BootstrapForm.Group className="mb-3">
                    <FloatingLabel
                      controlId="floatingCruiseSpeed"
                      label="Cruise Speed"
                    >
                      <BootstrapForm.Control
                        type="number"
                        placeholder="Cruise Speed"
                        name="cruise_speed"
                        onChange={handleChange}
                        isInvalid={
                          touched.cruise_speed && !!errors.cruise_speed
                        }
                        value={values.cruise_speed}
                      />
                      <BootstrapForm.Control.Feedback type="invalid">
                        {errors.cruise_speed}
                      </BootstrapForm.Control.Feedback>
                    </FloatingLabel>
                  </BootstrapForm.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <BootstrapForm.Group className="mb-3">
                    <FloatingLabel controlId="floatingRemarks" label="Remarks">
                      <BootstrapForm.Control
                        as="textarea"
                        placeholder="Remarks"
                        name="remarks"
                        onChange={handleChange}
                        isInvalid={touched.remarks && !!errors.remarks}
                        value={values.remarks}
                      />
                      <BootstrapForm.Control.Feedback type="invalid">
                        {errors.remarks}
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
