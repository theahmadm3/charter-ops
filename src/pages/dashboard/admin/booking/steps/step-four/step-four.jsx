import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import {
  Button,
  Col,
  Row,
  Form as BootstrapForm,
  FloatingLabel,
  Alert,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addBookingStepThreeAsync,
  setCurrentStep,
} from "../../../../../../slices/booking/bookingSlice";
import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ImNotification } from "react-icons/im";
import { toast } from "react-toastify";

// Validation schema
const validationSchema = Yup.object({
  // first_name: Yup.string().required("First name is required"),
  // last_name: Yup.string().required("Last name is required"),
  // date_of_birth: Yup.date()
  //   .required("Date of Birth is required")
  //   .max(new Date(), "Date of Birth cannot be in the future"),
  // gender: Yup.string().required("Gender is required"),
  // nationality: Yup.string().required("Nationality is required"),
  // email: Yup.string()
  //   .email("Invalid email address")
  //   .required("Email is required"),
  // phone: Yup.string().required("Phone number is required"),
  // special_requests: Yup.string(),
  // num_adults: Yup.number()
  //   .min(1, "At least one adult is required")
  //   .required("Number of adults is required"),
  // num_children: Yup.number().min(0).required("Number of children is required"),
  // num_infants: Yup.number().min(0).required("Number of infants is required"),
});

function BookingStepFour() {
  const [isChecked, setIsChecked] = useState(false);
  const [passengers, setPassengers] = useState([
    {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
    },
  ]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bookingInfo = useSelector((state) => state?.booking);

  const handleCheckboxChange = (e) => setIsChecked(e.target.checked);

  const handleAddPassenger = () => {
    setPassengers([
      ...passengers,
      {
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        // phone: "",
        special_requests: "",
      },
    ]);
  };

  const handleRemovePassenger = (id) => {
    setPassengers(passengers.filter((passenger) => passenger.id !== id));
  };

  const handlePassengerChange = (id, e) => {
    const { name, value } = e.target;
    setPassengers(
      passengers.map((passenger) =>
        passenger.id === id ? { ...passenger, [name]: value } : passenger
      )
    );
  };

  const handleSubmit = (values) => {
    const isValidPassenger = (passenger) =>
      passenger.first_name &&
      passenger.last_name &&
      passenger.email &&
      passenger.phone;

    const formattedValues = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      phone: values.phone,
    };

    const payload = {
      passengers: [
        formattedValues,
        ...values.passengers
          .filter(isValidPassenger) // Filter out empty or invalid objects
          .map((passenger) => ({
            first_name: passenger.first_name,
            last_name: passenger.last_name,
            email: passenger.email,
            phone: passenger.phone,
          })),
      ],
    };

    dispatch(
      addBookingStepThreeAsync({
        bookingId: bookingInfo?.addBookingStepOneResponse?.data?.id,
        values: payload,
      })
    )
      .then((response) => {
        if (response?.payload?.success) {
          const current = bookingInfo?.currentStep;
          dispatch(setCurrentStep(current + 1));
        }
      })
      .catch((error) => {
        console.error("Error occurred:", error);
        toast.error("An unexpected error occurred.");
      });
  };

  const handleBack = () =>
    dispatch(setCurrentStep(bookingInfo?.currentStep - 1));

  const handleNext = () => {
    const current = bookingInfo?.currentStep;
    dispatch(setCurrentStep(current + 1));
  };
  return (
    <Formik
      initialValues={{
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        passengers: [{ first_name: "", last_name: "", email: "", phone: "" }],
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
        <Form onSubmit={handleSubmit}>
          <Alert variant="warning">
            <p className="mb-0">
              <ImNotification className="me-4" />
              This form is optional
            </p>
          </Alert>

          <Row>
            <Col md={6}>
              <BootstrapForm.Group className="mb-3">
                <FloatingLabel controlId="floatingFirstName" label="First Name">
                  <BootstrapForm.Control
                    type="text"
                    name="first_name"
                    value={values.first_name}
                    onChange={handleChange}
                    isInvalid={touched.first_name && !!errors.first_name}
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.first_name}
                  </BootstrapForm.Control.Feedback>
                </FloatingLabel>
              </BootstrapForm.Group>
            </Col>

            <Col md={6}>
              <BootstrapForm.Group className="mb-3">
                <FloatingLabel controlId="floatingLastName" label="Last Name">
                  <BootstrapForm.Control
                    type="text"
                    name="last_name"
                    value={values.last_name}
                    onChange={handleChange}
                    isInvalid={touched.last_name && !!errors.last_name}
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.last_name}
                  </BootstrapForm.Control.Feedback>
                </FloatingLabel>
              </BootstrapForm.Group>
            </Col>

            <Col md={6}>
              <BootstrapForm.Group className="mb-3">
                <FloatingLabel controlId="floatingEmail" label="Email">
                  <BootstrapForm.Control
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={touched.email && !!errors.email}
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.email}
                  </BootstrapForm.Control.Feedback>
                </FloatingLabel>
              </BootstrapForm.Group>
            </Col>

            <Col md={6}>
              <BootstrapForm.Group className="mb-3">
                <FloatingLabel controlId="floatingPhone" label="Phone Number">
                  <BootstrapForm.Control
                    type="text"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    isInvalid={touched.phone && !!errors.phone}
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.phone}
                  </BootstrapForm.Control.Feedback>
                </FloatingLabel>
              </BootstrapForm.Group>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <BootstrapForm.Group>
                <BootstrapForm.Check
                  type="checkbox"
                  label="Multi Passengers"
                  name="multi_leg"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
              </BootstrapForm.Group>
            </Col>
          </Row>

          {isChecked && (
            <FieldArray
              name="passengers"
              render={(arrayHelpers) => (
                <>
                  {values.passengers.map((passenger, index) => (
                    <div key={index} className="passenger-form mt-3 border p-3">
                      <Row>
                        <Col md={6}>
                          <BootstrapForm.Group className="mb-3">
                            <FloatingLabel
                              controlId={`passengerFirstName-${index}`}
                              label="First Name"
                            >
                              <BootstrapForm.Control
                                type="text"
                                name={`passengers[${index}].first_name`}
                                value={passenger.first_name}
                                onChange={handleChange}
                              />
                            </FloatingLabel>
                          </BootstrapForm.Group>
                        </Col>
                        <Col md={6}>
                          <BootstrapForm.Group className="mb-3">
                            <FloatingLabel
                              controlId={`passengerLastName-${index}`}
                              label="Last Name"
                            >
                              <BootstrapForm.Control
                                type="text"
                                name={`passengers[${index}].last_name`}
                                value={passenger.last_name}
                                onChange={handleChange}
                              />
                            </FloatingLabel>
                          </BootstrapForm.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={6}>
                          <BootstrapForm.Group className="mb-3">
                            <FloatingLabel
                              controlId={`passengerEmail-${index}`}
                              label="Email"
                            >
                              <BootstrapForm.Control
                                type="email"
                                name={`passengers[${index}].email`}
                                value={passenger.email}
                                onChange={handleChange}
                              />
                            </FloatingLabel>
                          </BootstrapForm.Group>
                        </Col>
                        <Col md={6}>
                          <BootstrapForm.Group className="mb-3">
                            <FloatingLabel
                              controlId={`passengerPhone-${index}`}
                              label="Phone Number"
                            >
                              <BootstrapForm.Control
                                type="text"
                                name={`passengers[${index}].phone`}
                                value={passenger.phone}
                                onChange={handleChange}
                              />
                            </FloatingLabel>
                          </BootstrapForm.Group>
                        </Col>
                      </Row>

                      <Button
                        variant="danger"
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  ))}

                  <Button
                    variant="success"
                    onClick={() =>
                      arrayHelpers.push({
                        first_name: "",
                        last_name: "",
                        email: "",
                        phone: "",
                      })
                    }
                    className="mt-3"
                  >
                    <FaPlus /> Add Passenger
                  </Button>
                </>
              )}
            />
          )}

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

            <Button type="submit" disabled={!dirty}>
              Save & Proceed
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default BookingStepFour;
