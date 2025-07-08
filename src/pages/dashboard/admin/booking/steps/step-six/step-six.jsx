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

function BookingStepSix() {
  const handleSubmit = () => { };
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
          requests_status: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, handleChange, values, handleSubmit, isSubmitting }) => (
          <Form>
            <Row>
              <Col md={6}>
                <BootstrapForm.Group>
                  <FloatingLabel
                    controlId="floatingTripType"
                    label="Payment Status"
                    className="my-2"
                  >
                    <BootstrapForm.Control
                      as="select"
                      name="trip_type"
                      value={values.trip_type}
                    >
                      <option value="">Select Payment status</option>

                      <option value="local">Pay Now</option>
                      <option value="international">Pay Later</option>
                    </BootstrapForm.Control>
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
              {/* <Button
                variant="white"
                className="border border-main-color text-end"
                onClick={handleNext}
              >
                Next
              </Button> */}
              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
export default BookingStepSix;
