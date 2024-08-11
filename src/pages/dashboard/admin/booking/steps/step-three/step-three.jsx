import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Button,
  Col,
  Row,
  Form as BootstrapForm,
  FloatingLabel,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addBookingStepFourAsync,
  setCurrentStep,
} from "../../../../../../slices/booking/bookingSlice";

const validationSchema = Yup.object({
  special_requests: Yup.string().required("Special requests are required"),
  in_flight_catering: Yup.string().required("In-flight catering is required"),
  extra_baggage: Yup.number()
    .typeError("Extra baggage must be a number")
    .required("Extra baggage is required")
    .positive("Extra baggage must be a positive number"),
  premium_membership: Yup.boolean(),
});

function BookingStepThree() {
  const bookingInfo = useSelector((state) => state?.booking);

  const handleSubmit = (values) => {
    dispatch(
      addBookingStepFourAsync({
        bookingId: bookingInfo?.addBookingStepOneResponse?.data?.id,
        values,
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
  const dispatch = useDispatch();

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
          special_requests: "",
          in_flight_catering: "",
          extra_baggage: "",
          premium_membership: false,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleBlur }) => (
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
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      name="special_requests"
                      component="div"
                      className="text-danger"
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
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      name="in_flight_catering"
                      component="div"
                      className="text-danger"
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
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      name="extra_baggage"
                      component="div"
                      className="text-danger"
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
                    checked={values.premium_membership}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="premium_membership"
                    component="div"
                    className="text-danger"
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
    </>
  );
}
export default BookingStepThree;
