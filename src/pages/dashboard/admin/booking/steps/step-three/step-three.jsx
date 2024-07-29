import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import {
  Button,
  Col,
  Row,
  Form as BootstrapForm,
  FloatingLabel,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentStep } from "../../../../../../slices/booking/bookingSlice";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  dateOfBirth: Yup.date()
    .required("Date of Birth is required")
    .max(new Date(), "Date of Birth cannot be in the future"),
  gender: Yup.string().required("Gender is required"),
  nationality: Yup.string().required("Nationality is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  specialRequests: Yup.string(),
});

const genderOptions = [
  { id: "male", name: "Male" },
  { id: "female", name: "Female" },
  { id: "other", name: "Other" },
];

const nationalityOptions = [
  { id: "us", name: "United States" },
  { id: "uk", name: "United Kingdom" },
  { id: "ca", name: "Canada" },
  // Add more options as needed
];

function BookingStepThree() {
  const handleSubmit = () => {};
  const dispatch = useDispatch();

  const bookingInfo = useSelector((state) => state?.booking);
  const handleNext = () => {
    const current = bookingInfo?.currentStep;
    dispatch(setCurrentStep(current + 1));
  };

  const handleBack = () => {
    const current = bookingInfo?.currentStep;
    dispatch(setCurrentStep(current - 1));
  };
  return (
    <>
      <Formik
        initialValues={{
          name: "",
          dateOfBirth: "",
          gender: "",
          nationality: "",
          email: "",
          phoneNumber: "",
          specialRequests: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, handleChange, values, handleSubmit }) => (
          <Form>
            <Row>
              <Col md={6}>
                <BootstrapForm.Group className="mb-3">
                  <FloatingLabel controlId="floatingName" label="Name">
                    <BootstrapForm.Control
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      isInvalid={touched.name && !!errors.name}
                    />
                    <BootstrapForm.Control.Feedback type="invalid">
                      {errors.name}
                    </BootstrapForm.Control.Feedback>
                  </FloatingLabel>
                </BootstrapForm.Group>
              </Col>
              <Col md={6}>
                <BootstrapForm.Group className="mb-3">
                  <FloatingLabel
                    controlId="floatingDateOfBirth"
                    label="Date of Birth"
                  >
                    <BootstrapForm.Control
                      type="date"
                      name="dateOfBirth"
                      value={values.dateOfBirth}
                      onChange={handleChange}
                      isInvalid={touched.dateOfBirth && !!errors.dateOfBirth}
                    />
                    <BootstrapForm.Control.Feedback type="invalid">
                      {errors.dateOfBirth}
                    </BootstrapForm.Control.Feedback>
                  </FloatingLabel>
                </BootstrapForm.Group>
              </Col>
              <Col md={6}>
                <BootstrapForm.Group className="mb-3">
                  <FloatingLabel controlId="floatingGender" label="Gender">
                    <BootstrapForm.Control
                      as="select"
                      name="gender"
                      value={values.gender}
                      onChange={handleChange}
                      isInvalid={touched.gender && !!errors.gender}
                    >
                      <option value="">Select Gender</option>
                      {genderOptions.map((option) => (
                        <option value={option.id} key={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </BootstrapForm.Control>
                    <BootstrapForm.Control.Feedback type="invalid">
                      {errors.gender}
                    </BootstrapForm.Control.Feedback>
                  </FloatingLabel>
                </BootstrapForm.Group>
              </Col>
              <Col md={6}>
                <BootstrapForm.Group className="mb-3">
                  <FloatingLabel
                    controlId="floatingNationality"
                    label="Nationality"
                  >
                    <BootstrapForm.Control
                      as="select"
                      name="nationality"
                      value={values.nationality}
                      onChange={handleChange}
                      isInvalid={touched.nationality && !!errors.nationality}
                    >
                      <option value="">Select Nationality</option>
                      {nationalityOptions.map((option) => (
                        <option value={option.id} key={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </BootstrapForm.Control>
                    <BootstrapForm.Control.Feedback type="invalid">
                      {errors.nationality}
                    </BootstrapForm.Control.Feedback>
                  </FloatingLabel>
                </BootstrapForm.Group>
              </Col>
              <Col md={6}>
                <BootstrapForm.Group className="mb-3">
                  <FloatingLabel controlId="floatingEmail" label="Email">
                    <BootstrapForm.Control
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      isInvalid={touched.email && !!errors.email}
                    />
                    <BootstrapForm.Control.Feedback type="invalid">
                      {errors.email}
                    </BootstrapForm.Control.Feedback>
                  </FloatingLabel>
                </BootstrapForm.Group>
              </Col>
              <Col md={6}>
                <BootstrapForm.Group className="mb-3">
                  <FloatingLabel
                    controlId="floatingPhoneNumber"
                    label="Phone Number"
                  >
                    <BootstrapForm.Control
                      type="text"
                      name="phoneNumber"
                      value={values.phoneNumber}
                      onChange={handleChange}
                      isInvalid={touched.phoneNumber && !!errors.phoneNumber}
                    />
                    <BootstrapForm.Control.Feedback type="invalid">
                      {errors.phoneNumber}
                    </BootstrapForm.Control.Feedback>
                  </FloatingLabel>
                </BootstrapForm.Group>
              </Col>
              <Col md={12}>
                <BootstrapForm.Group className="mb-3">
                  <FloatingLabel
                    controlId="floatingSpecialRequests"
                    label="Special Requests"
                  >
                    <BootstrapForm.Control
                      as="textarea"
                      name="specialRequests"
                      value={values.specialRequests}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                </BootstrapForm.Group>
              </Col>
            </Row>

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
                // onClick={handleNext}
              >
                Next
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
export default BookingStepThree;
