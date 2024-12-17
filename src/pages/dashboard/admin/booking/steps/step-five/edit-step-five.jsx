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
import {
  addBookingStepFiveAsync,
  setCurrentStep,
} from "../../../../../../slices/booking/bookingSlice";
import { useEffect, useState } from "react";
import { getAllUsersAsync } from "../../../../../../slices/user/userSlice";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function EditBookingStepFive(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state?.users);
  const [defaultCrewMembers, setDefaultCrewMembers] = useState([]);

  const bookingInfo = useSelector((state) => state?.booking);

  const handleBack = () => {
    const current = bookingInfo?.currentStep;
    dispatch(setCurrentStep(current - 1));
  };

  // Initial values for the form
  const initialValues = {
    crew_notes: props?.data[0]?.trip_sheet?.crew_notes || "",
    passenger_notes: props?.data[0]?.trip_sheet?.passenger_notes || "",
    crew_members: [],
  };

  // Validation schema
  const validationSchema = Yup.object().shape({
    crew_members: Yup.array().required("At least one crew member is required"),
    crew_notes: Yup.string().required("Crew note is required"),
    passenger_notes: Yup.string().required("Passenger note is required"),
  });

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
        bookingId: props?.data[0]?.id,
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

  useEffect(() => {
    // Update the state when crew members data changes
    if (props?.data[0]?.trip_sheet?.crew_members) {
      const mappedCrewMembers = props.data[0].trip_sheet.crew_members.map(
        (member) => ({
          value: member?.id,
          label: `${member?.first_name} ${member?.last_name}`,
        })
      );
      setDefaultCrewMembers(mappedCrewMembers);
    }
  }, [props?.data[0]?.trip_sheet?.crew_members]);

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values, setFieldValue, handleChange }) => (
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
                        value: option.id,
                        label: `${option.first_name} ${option.last_name}`,
                      })
                    )}
                    className="form-control"
                    classNamePrefix="crew_members"
                    onChange={(selectedOptions) => {
                      setFieldValue("crew_members", selectedOptions);
                      setDefaultCrewMembers(selectedOptions);
                    }}
                    value={defaultCrewMembers}
                  />
                  <ErrorMessage
                    name="crew_members"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>
              </Col>
            </Row>
            <Row className="my-3">
              <Col md={6}>
                <BootstrapForm.Group>
                  <label>Crew note</label>
                  <BootstrapForm.Control
                    as="textarea"
                    value={values.crew_notes} // Use Formik's values
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
                <BootstrapForm.Group>
                  <label>Passenger note</label>
                  <BootstrapForm.Control
                    as="textarea"
                    value={values.passenger_notes} // Use Formik's values
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

            <div className="mt-3">
              <Button type="submit">Update Trip Sheet</Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
export default EditBookingStepFive;
