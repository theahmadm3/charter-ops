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
import Select from "react-select";
import { getAdditionalServiceByIdAsync } from "../../../../../../slices/config/configSlice";
import { useEffect } from "react";

const validationSchema = Yup.object({
  special_requests: Yup.string().notRequired("Special requests are required"),

  premium_membership: Yup.boolean(),
});

function EditBookingStepThree(props) {
  const bookingInfo = useSelector((state) => state?.booking);
  const configInfo = useSelector((state) => state?.config);
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

  useEffect(() => {
    try {
      dispatch(
        getAdditionalServiceByIdAsync({
          service_id: props.data[0]?.service?.id,
        })
      );
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

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
              <Col md={12}>
                <BootstrapForm.Group>
                  <label>
                    <div>Additional Services </div>
                  </label>
                  <Select
                    isMulti
                    options={
                      Array.isArray(
                        configInfo?.getAdditionalServiceByIdResponse
                      )
                        ? configInfo.getAdditionalServiceByIdResponse.map(
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

            <div className="my-3">
              <Button type="submit">Update Additional Service</Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
export default EditBookingStepThree;
