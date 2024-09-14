import { Formik, Field, Form, ErrorMessage } from "formik";
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
import { useEffect } from "react";
import { getAllUsersAsync } from "../../../../../../slices/user/userSlice";
import Select from "react-select";

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

function BookingStepFive() {
  const handleSubmit = () => {};
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state?.users);

  const bookingInfo = useSelector((state) => state?.booking);

  const handleBack = () => {
    const current = bookingInfo?.currentStep;
    dispatch(setCurrentStep(current - 1));
  };

  useEffect(() => {
    try {
      dispatch(getAllUsersAsync({ user_type: "crew" }));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);
  return (
    <>
      <Formik
        initialValues={{
          crew_id: "",
          crew_note:"",
          passenger_note:""
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          errors,
          touched,
          handleChange,
          values,
          handleSubmit,
          setFieldValue,
        }) => (
          <Form>
            <Row>
              <Col md={6}>
                <BootstrapForm.Group>
                  <label>
                    <div>
                      Crew <span className="text-danger">*</span>{" "}
                    </div>
                  </label>
                  <Select
                    isMulti
                    options={userInfo?.getAllUsersResponse?.data?.map(
                      (option) => ({
                        value: option?.id,
                        label: `${option.first_name} ${option.last_name}`,
                      })
                    )}
                    className=" form-control"
                    classNamePrefix="crew_id"
                    onChange={(selectedOptions) =>
                      setFieldValue("crew_id", selectedOptions)
                    }
                  />

                  <ErrorMessage
                    name="crew_id"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>
              </Col>

             


            </Row>
            <Row className="my-3">
            <Col md={6}>
                <BootstrapForm.Group className="">
                  <label>Crew note</label>

                  <BootstrapForm.Control
                    value={
                      bookingInfo?.addBookingStepOneResponse?.data
                        ?.crew_note
                    }
                    as="textarea"
                    placeholder="Crew note"
                    name="crew_note"
                    onChange={handleChange}
                    className="py-3"
                    isInvalid={
                      touched.crew_note && !!errors.crew_note
                    }
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.crew_note}
                  </BootstrapForm.Control.Feedback>
                </BootstrapForm.Group>
              </Col>
            <Col md={6}>
                <BootstrapForm.Group className="">
                  <label>Passenger note</label>

                  <BootstrapForm.Control
                    value={
                      bookingInfo?.addBookingStepOneResponse?.data
                        ?.passenger_note
                    }
                    as="textarea"
                    placeholder="Passenger notes"
                    name="passenger_note"
                    onChange={handleChange}
                    className="py-3"
                    isInvalid={
                      touched.passenger_note && !!errors.passenger_note
                    }
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.passenger_note}
                  </BootstrapForm.Control.Feedback>
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
export default BookingStepFive;
