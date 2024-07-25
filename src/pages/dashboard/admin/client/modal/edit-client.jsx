import React, { useState } from "react";
import {
  Modal,
  Button,
  Form as BootstrapForm,
  FloatingLabel,
  Image,
} from "react-bootstrap";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { updateClientAsync } from "../../../../../slices/client/clientSlice";

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  dob: Yup.date().required("Date of Birth is required").nullable(),
  id_type: Yup.string().required("Type of ID is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  title: Yup.string(),
  document_id: Yup.string().required("ID File Upload is required"),
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

function EditClient(props) {
  const dispatch = useDispatch();
  const [feedback, setFeedback] = useState("");
  const [showImage, setShowImage] = useState(false);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Client
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            first_name: props?.data?.[0]?.first_name || "",
            last_name: props?.data?.[0]?.last_name || "",
            email: props?.data?.[0]?.email || "",
            dob: props?.data?.[0]?.dob || "",
            document_id: props?.data?.[0]?.document_base64 || "",
            id_type: props?.data?.[0]?.id_type || "",
            phone: props?.data?.[0]?.phone || "",
            title: props?.data?.[0]?.title || "",
            nationality: props?.data?.[0]?.nationality || "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            dispatch(
              updateClientAsync({ id: props?.data?.[0]?.id, values: values })
            )
              .unwrap()
              .then((response) => {
                if (response?.success) {
                  props.onHide();
                }
              })
              .catch((error) => {
                console.error("Error occurred:", error);
                setFeedback(error);
              });
          }}
        >
          {({
            errors,
            touched,
            handleSubmit,
            setFieldValue,
            handleChange,
            values,
          }) => (
            <Form onSubmit={handleSubmit}>
              <BootstrapForm.Group className="mb-3">
                <FloatingLabel controlId="floatingFirstName" label="First Name">
                  <BootstrapForm.Control
                    type="text"
                    placeholder="First Name"
                    name="first_name"
                    value={values?.first_name}
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
                    value={values?.last_name}
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
                    value={values?.email}
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
                    value={values?.dob}
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
              {props?.data[0]?.document_base64 ? (
                <>
                  <Button
                    variant="light"
                    size="sm"
                    className="btn btn-primary mb-3 shadow"
                    onClick={() => setShowImage(!showImage)}
                  >
                    {showImage ? "Hide File" : "Show File"}
                  </Button>
                  {showImage && (
                    <Image
                      src={props?.data[0]?.document_base64}
                      className="img-fluid"
                    />
                  )}
                </>
              ) : null}

              <BootstrapForm.Group className="mb-3">
                <FloatingLabel controlId="floatingTypeOfId" label="Type of ID">
                  <BootstrapForm.Control
                    as="select"
                    name="id_type"
                    onChange={handleChange}
                    isInvalid={touched.id_type && !!errors.id_type}
                    value={values?.id_type}
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
                    value={values?.nationality}
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
                    value={values?.phone}
                    onChange={handleChange}
                    isInvalid={touched.phone && !!errors.phone}
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.phone}
                  </BootstrapForm.Control.Feedback>
                </FloatingLabel>
              </BootstrapForm.Group>

              <Button type="submit">Update</Button>
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

export default EditClient;
