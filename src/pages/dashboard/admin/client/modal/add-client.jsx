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
import { addClientAsync } from "../../../../../slices/client/clientSlice";
import { countries } from "../../../../../util/data";

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  dob: Yup.date().required("Date of Birth is required").nullable(),
  id_type: Yup.string().required("Type of ID is required"),
  phone: Yup.string()
    .matches(
      /^\+?[0-9]{11,15}$/,
      "Invalid phone number, must be between 11 to 15 digits and can optionally start with a +"
    )
    .required("Phone number is required"),
  title: Yup.string(),
  document_id: Yup.string().required("ID File Upload is required"),
  nationality: Yup.string().required("Nationality is required"),
});

const handleFileChange = async (event, setFieldValue) => {
  const file = event.currentTarget.files[0];
  if (file) {
    const base64 = await convertFileToBase64(file);
    setFieldValue("document_id", base64);
  }
};

const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = (error) => reject(error);
  });
};

function AddClient(props) {
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
          Add New Client
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            first_name: "",
            last_name: "",
            email: "",
            dob: null,
            document_id: "",
            id_type: "",
            phone: "",
            nationality: "",
            title: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            dispatch(addClientAsync(values))
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
          {({ errors, touched, handleSubmit, setFieldValue, handleChange }) => (
            <Form onSubmit={handleSubmit}>
              <BootstrapForm.Group className="mb-3">
                <FloatingLabel controlId="floatingTitle" label="Title">
                  <BootstrapForm.Control
                    as="select"
                    name="title"
                    onChange={handleChange}
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
              <BootstrapForm.Group className="mb-3">
                <FloatingLabel controlId="floatingFirstName" label="First Name">
                  <BootstrapForm.Control
                    type="text"
                    placeholder="First Name"
                    name="first_name"
                    onChange={handleChange}
                    isInvalid={touched.first_name && !!errors.first_name}
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.first_name}
                  </BootstrapForm.Control.Feedback>
                </FloatingLabel>
              </BootstrapForm.Group>

              <BootstrapForm.Group className="mb-3">
                <FloatingLabel controlId="floatingLastName" label="Last Name">
                  <BootstrapForm.Control
                    type="text"
                    placeholder="Last Name"
                    name="last_name"
                    onChange={handleChange}
                    isInvalid={touched.last_name && !!errors.last_name}
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.last_name}
                  </BootstrapForm.Control.Feedback>
                </FloatingLabel>
              </BootstrapForm.Group>

              <BootstrapForm.Group className="mb-3">
                <FloatingLabel controlId="floatingEmail" label="Email">
                  <BootstrapForm.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                    isInvalid={touched.email && !!errors.email}
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.email}
                  </BootstrapForm.Control.Feedback>
                </FloatingLabel>
              </BootstrapForm.Group>

              <BootstrapForm.Group className="mb-3">
                <FloatingLabel controlId="floatingDob" label="Date of Birth">
                  <BootstrapForm.Control
                    type="date"
                    name="dob"
                    onChange={handleChange}
                    isInvalid={touched.dob && !!errors.dob}
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.dob}
                  </BootstrapForm.Control.Feedback>
                </FloatingLabel>
              </BootstrapForm.Group>

              <BootstrapForm.Group className="mb-3">
                <FloatingLabel
                  controlId="floatingIdFileUpload"
                  label="ID File Upload"
                >
                  <BootstrapForm.Control
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    name="document_id"
                    onChange={(e) => handleFileChange(e, setFieldValue)}
                    isInvalid={touched.document_id && !!errors.document_id}
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.document_id}
                  </BootstrapForm.Control.Feedback>
                </FloatingLabel>
              </BootstrapForm.Group>

              <BootstrapForm.Group className="mb-3">
                <FloatingLabel controlId="floatingTypeOfId" label="Type of ID">
                  <BootstrapForm.Control
                    as="select"
                    name="id_type"
                    onChange={handleChange}
                    isInvalid={touched.id_type && !!errors.id_type}
                  >
                    <option value="">Select Type of ID</option>
                    <option value="passport">Passport</option>
                    <option value="driving licence">Driver's License</option>
                    <option value="national id">National ID</option>
                  </BootstrapForm.Control>
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.id_type}
                  </BootstrapForm.Control.Feedback>
                </FloatingLabel>
              </BootstrapForm.Group>

              <BootstrapForm.Group className="mb-3">
                <FloatingLabel controlId="floatingTypeOfId" label="Nationality">
                  <BootstrapForm.Control
                    as="select"
                    name="nationality"
                    onChange={handleChange}
                    isInvalid={touched.nationality && !!errors.nationality}
                  >
                    <option value="">Select Nationality</option>
                    {countries.map((country, index) => (
                      <option value={country} key={index}>
                        {" "}
                        {country}{" "}
                      </option>
                    ))}
                  </BootstrapForm.Control>
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.nationality}
                  </BootstrapForm.Control.Feedback>
                </FloatingLabel>
              </BootstrapForm.Group>

              <BootstrapForm.Group className="mb-3">
                <FloatingLabel
                  controlId="floatingPhoneNumber"
                  label="Phone Number"
                >
                  <BootstrapForm.Control
                    type="tel"
                    placeholder="Phone Number"
                    name="phone"
                    onChange={handleChange}
                    isInvalid={touched.phone && !!errors.phone}
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.phone}
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

export default AddClient;
