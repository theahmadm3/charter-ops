import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Col, Row, Form as BootstrapForm } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addBookingStepFiveAsync,
  setCurrentStep,
} from "../../../../../../slices/booking/bookingSlice";
import { useEffect } from "react";
import { getAllUsersAsync } from "../../../../../../slices/user/userSlice";
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  // crew_notes: Yup.string().required("Crew note is required"),
  // passenger_notes: Yup.string().required("Passenger note is required"),
});

function BookingStepFive() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state?.users);

  const bookingInfo = useSelector((state) => state?.booking);

  const handleBack = () => {
    const current = bookingInfo?.currentStep;
    dispatch(setCurrentStep(current - 1));
  };

  const handleSubmit = (values) => {
    const payload = {
      ...values,
      crew_members: (values.crew_members || [])
        .filter((crew) => crew.value)
        .map((crew) => ({
          crew_id: crew.value,
        })),
    };

    dispatch(
      addBookingStepFiveAsync({
        bookingId: bookingInfo?.addBookingStepOneResponse?.data?.id,
        values: payload,
      })
    )
      .then((response) => {
        if (response?.payload?.success) {
          navigate(-1);
        }
      })
      .catch((error) => {
        console.error("Error occurred:", error);
        toast.error("An unexpected error occurred.");
      });
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
          crew_notes: "",
          passenger_notes: "",
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
          dirty,
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
                    classNamePrefix="crew_members"
                    onChange={(selectedOptions) =>
                      setFieldValue("crew_members", selectedOptions)
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
                      bookingInfo?.addBookingStepFiveResponse?.data?.crew_notes
                    }
                    as="textarea"
                    placeholder="Crew note"
                    name="crew_notes"
                    onChange={handleChange}
                    className="py-3"
                    isInvalid={touched.crew_notes && !!errors.crew_notes}
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.crew_notes}
                  </BootstrapForm.Control.Feedback>
                </BootstrapForm.Group>
              </Col>
              <Col md={6}>
                <BootstrapForm.Group className="">
                  <label>Passenger note</label>

                  <BootstrapForm.Control
                    value={
                      bookingInfo?.addBookingStepFiveResponse?.data
                        ?.passenger_notes
                    }
                    as="textarea"
                    placeholder="Passenger notes"
                    name="passenger_notes"
                    onChange={handleChange}
                    className="py-3"
                    isInvalid={
                      touched.passenger_notes && !!errors.passenger_notes
                    }
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.passenger_notes}
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
              <Button
                as={Link}
                variant="white"
                className="border border-main-color text-end"
                to="/admin-booking"
              >
                Finish
              </Button>
              <Button type="submit" disabled={!dirty}>
                Save
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
export default BookingStepFive;
