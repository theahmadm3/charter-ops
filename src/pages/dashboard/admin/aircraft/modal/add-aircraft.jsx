import React from "react";
import {
  Modal,
  Button,
  Form as BootstrapForm,
  FloatingLabel,
} from "react-bootstrap";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addAircraftAsync } from "../../../../../slices/aircraft/aircraftSlice";

const validationSchema = Yup.object().shape({
  owned_by: Yup.string()
    .oneOf(
      ["company owned", "Partnership", "Management only"],
      "Invalid option"
    )
    .required("Aircraft owned by is required"),
  name: Yup.string()
    .matches(/^[a-zA-Z0-9 ]+$/, "Name must be alphanumeric")
    .required("Name is required"),
  pax_capacity: Yup.number()
    .typeError("PAX capacity must be a number")
    .required("PAX capacity is required"),
  manufacturer: Yup.string()
    .matches(/^[a-zA-Z0-9 ]*$/, "Manufacturer must be alphanumeric")
    .notRequired(),
  luggage_capacity: Yup.number()
    .typeError("Luggage capacity must be a number")
    .required("Luggage capacity is required"),
  cruise_speed: Yup.number()
    .typeError("Cruise speed must be a number")
    .notRequired(),
  remarks: Yup.string().notRequired(),
});

function AddAircraft(props) {
  const dispatch = useDispatch();

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add New Aircraft
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            owned_by: "",
            name: "",
            pax_capacity: 0,
            manufacturer: "",
            luggage_capacity: 0,
            cruise_speed: 0,
            remarks: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            dispatch(addAircraftAsync(values))
              .then((response) => {
                if (response?.payload?.success) {
                  props.onHide();
                }
              })
              .catch((error) => {
                console.error("Error occurred:", error);
              });
          }}
        >
          {({ errors, touched, handleSubmit, handleChange }) => (
            <Form onSubmit={handleSubmit}>
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

              <BootstrapForm.Group className="mb-3">
                <FloatingLabel controlId="floatingName" label="Name">
                  <BootstrapForm.Control
                    type="text"
                    placeholder="Name"
                    name="name"
                    onChange={handleChange}
                    isInvalid={touched.name && !!errors.name}
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.name}
                  </BootstrapForm.Control.Feedback>
                </FloatingLabel>
              </BootstrapForm.Group>

              <BootstrapForm.Group className="mb-3">
                <FloatingLabel
                  controlId="floatingPaxCapacity"
                  label="PAX Capacity"
                >
                  <BootstrapForm.Control
                    type="number"
                    placeholder="PAX Capacity"
                    name="pax_capacity"
                    onChange={handleChange}
                    isInvalid={touched.pax_capacity && !!errors.pax_capacity}
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.pax_capacity}
                  </BootstrapForm.Control.Feedback>
                </FloatingLabel>
              </BootstrapForm.Group>

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
                    isInvalid={touched.manufacturer && !!errors.manufacturer}
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.manufacturer}
                  </BootstrapForm.Control.Feedback>
                </FloatingLabel>
              </BootstrapForm.Group>

              <BootstrapForm.Group className="mb-3">
                <FloatingLabel
                  controlId="floatingLuggageCapacity"
                  label="Luggage Capacity"
                >
                  <BootstrapForm.Control
                    type="number"
                    placeholder="Luggage Capacity"
                    name="luggage_capacity"
                    onChange={handleChange}
                    isInvalid={
                      touched.luggage_capacity && !!errors.luggage_capacity
                    }
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.luggage_capacity}
                  </BootstrapForm.Control.Feedback>
                </FloatingLabel>
              </BootstrapForm.Group>

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
                    isInvalid={touched.cruise_speed && !!errors.cruise_speed}
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.cruise_speed}
                  </BootstrapForm.Control.Feedback>
                </FloatingLabel>
              </BootstrapForm.Group>

              <BootstrapForm.Group className="mb-3">
                <FloatingLabel controlId="floatingRemarks" label="Remarks">
                  <BootstrapForm.Control
                    as="textarea"
                    placeholder="Remarks"
                    name="remarks"
                    onChange={handleChange}
                    isInvalid={touched.remarks && !!errors.remarks}
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.remarks}
                  </BootstrapForm.Control.Feedback>
                </FloatingLabel>
              </BootstrapForm.Group>

              <Button type="submit">Save</Button>
              <Button variant="danger" className="ms-4" onClick={props.onHide}>
                Close
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}

export default AddAircraft;
