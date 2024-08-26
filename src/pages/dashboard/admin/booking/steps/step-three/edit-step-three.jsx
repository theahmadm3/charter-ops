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
  special_requests: Yup.string().notRequired("Special requests are required"),

  premium_membership: Yup.boolean(),
});

function EditBookingStepThree(props) {
  const bookingInfo = useSelector((state) => state?.booking);

  const handleSubmit = (values) => {
    dispatch(
      addBookingStepFourAsync({
        bookingId: props?.data[0]?.id,
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

  return (
    <>
      <Formik
        initialValues={{
          special_requests: props?.data[0]?.special_requests,

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
                    label="Special Requests (Optional)"
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
              <Button type="submit">Update</Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
export default EditBookingStepThree;
