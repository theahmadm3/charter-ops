import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Button,
  Col,
  Row,
  Form as BootstrapForm,
  FloatingLabel,
  Container,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addBookingStepFourAsync,
  setCurrentStep,
} from "../../../../../../slices/booking/bookingSlice";
import { useEffect } from "react";
import { getAdditionalServiceByIdAsync } from "../../../../../../slices/config/configSlice";
import Select from "react-select";

const validationSchema = Yup.object({
  special_requests: Yup.string().notRequired("Special requests are required"),

  premium_membership: Yup.boolean(),
});

function BookingStepThree() {
  const bookingInfo = useSelector((state) => state?.booking);
  const handleSubmit = (values) => {
    //  filtered payload that excludes empty/null/undefined values
    const filteredPayload = Object.keys(values).reduce((acc, key) => {
      const value = values[key];
      if (value !== null && value !== undefined && value !== "") {
        acc[key] = value;
      }
      return acc;
    }, {});

    // Process additional services
    filteredPayload.additional_services = Array.isArray(values.services)
      ? values.services.map((service) => ({
          service_id: service.value,
        }))
      : [];

    // Dispatch the async action with the filtered payload
    dispatch(
      addBookingStepFourAsync({
        bookingId: bookingInfo?.addBookingStepOneResponse?.data?.id,
        values: filteredPayload,
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

  const configInfo = useSelector((state) => state?.config);
  console.log(
    "additional service",
    configInfo?.getAdditionalServiceByIdResponse
  );
  const dispatch = useDispatch();

  const handleNext = () => {
    const current = bookingInfo?.currentStep;
    dispatch(setCurrentStep(current + 1));
  };

  const handleBack = () => {
    const current = bookingInfo?.currentStep;
    dispatch(setCurrentStep(current - 1));
  };

  useEffect(() => {
    try {
      dispatch(
        getAdditionalServiceByIdAsync({
          service_id: bookingInfo.selectedServiceId,
        })
      );
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  return (
    <Container>
      <Formik
        initialValues={{
          special_requests: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleBlur, setFieldValue }) => (
          <Form>
            <Row>
              <Col md={12}>
                <BootstrapForm.Group>
                  <label>
                    <div>Additional Services </div>
                  </label>
                  <Select
                    isMulti
                    options={
                      Array.isArray(
                        configInfo?.getAdditionalServiceByIdResponse?.data
                      )
                        ? configInfo.getAdditionalServiceByIdResponse?.data?.map(
                            (option) => ({
                              value: option?.id,
                              label: `${option?.service_name}, ${option?.charge_rate}`,
                            })
                          )
                        : []
                    }
                    className=" form-control"
                    classNamePrefix="services"
                    onChange={(selectedOptions) =>
                      setFieldValue("services", selectedOptions)
                    }
                  />

                  <ErrorMessage
                    name="service_id"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>
              </Col>

              <Col md={12}>
                <BootstrapForm.Group className="mb-3 mt-5">
                  <BootstrapForm.Label>
                    Special Requests (Optional){" "}
                  </BootstrapForm.Label>

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
                </BootstrapForm.Group>
              </Col>

              {/* <Col md={12}>
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
              </Col> */}
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
                Proceed
              </Button>
              <Button type="submit">Save & Proceed</Button>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
export default BookingStepThree;
