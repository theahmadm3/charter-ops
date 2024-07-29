import {
  Container,
  FloatingLabel,
  Form as BootstrapForm,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import AdminLayout from "../../../../component/layout/admin-layout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import Stepper from "../../../../component/stepper/stepper";

import { setCurrentStep } from "../../../../slices/booking/bookingSlice";
import BookingStepOne from "./steps/step-one/step-one";
import BookingStepTwo from "./steps/step-two/step-two";
import BookingStepThree from "./steps/step-three/step-three";

const AddBooking = () => {
  const dispatch = useDispatch();

  const step = useSelector((state) => state.booking?.currentStep);

  const steps = [
    { component: <BookingStepOne />, label: "Booking process" },
    { component: <BookingStepTwo />, label: "Flight Selection" },
    { component: <BookingStepThree />, label: "Passenger Information" },
    { component: "Step four", label: "Additional Services" },
    { component: "Step four", label: "Awaiting approval " },
  ];

  const handleStepClick = () => {
    // setCurrentStep(+1);
    // const isValid = validateStep(step);
    // if (isValid) {
    //   dispatch(setCurrentStep(stepIndex));
    // } else {
    //   toast.info("Please complete the current step before proceeding.");
    // }
  };

  useEffect(() => {
    try {
      dispatch(setCurrentStep(0));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);
  return (
    <AdminLayout>
      <Container fluid>
        <Row>
          <Col md={12}>
            <h5>Create new booking</h5>
            <Stepper
              steps={steps}
              activeStep={step}
              onClick={(step) => handleStepClick(step)}
            />
            {step === 0 && <BookingStepOne />}
            {step === 1 && <BookingStepTwo />}
            {step === 2 && <BookingStepThree />}
          </Col>
        </Row>
      </Container>
    </AdminLayout>
  );
};

export default AddBooking;
