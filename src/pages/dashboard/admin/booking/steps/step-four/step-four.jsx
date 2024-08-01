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

function BookingStepFour() {
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
          date_of_birth: "",
          gender: "",
          nationality: "",
          email: "",
          phone_number: "",
          special_requests: "",
          in_flight_catering: "",
          special_requests_service: "",
          extra_baggage: "",
          premium_membership: false,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, handleChange, values, handleSubmit }) => (
          <Form>
            <Row>
              <Col md={6}>
                <BootstrapForm.Group className="mb-3">
                  <FloatingLabel
                    controlId="floatingSpecialRequests"
                    label="Special Requests"
                  >
                    <BootstrapForm.Control
                      as="textarea"
                      name="special_requests"
                      value={values.special_requests}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                </BootstrapForm.Group>
              </Col>
              <Col md={6}>
                <BootstrapForm.Group className="mb-3">
                  <FloatingLabel
                    controlId="floatingInFlightCatering"
                    label="In-Flight Catering"
                  >
                    <BootstrapForm.Control
                      as="textarea"
                      name="in_flight_catering"
                      value={values.in_flight_catering}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                </BootstrapForm.Group>
              </Col>
              <Col md={6}>
                <BootstrapForm.Group className="mb-3">
                  <FloatingLabel
                    controlId="floatingExtraBaggage"
                    label="Extra Baggage"
                  >
                    <BootstrapForm.Control
                      type="number"
                      name="extra_baggage"
                      value={values.extra_baggage}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                </BootstrapForm.Group>
              </Col>
              <Col md={12}>
                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Check
                    type="checkbox"
                    id="premiumMembership"
                    name="premium_membership"
                    label="Premium Membership"
                    // checked={values.premium_membership}
                    onChange={handleChange}
                  />
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
              {/* <Button
                variant="white"
                className="border border-main-color text-end"
                onClick={handleNext}
              >
                Next
              </Button> */}
              <Button type="submit">Save</Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
export default BookingStepFour;
