import { Formik, Field, Form, ErrorMessage } from "formik";
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
        phone: "",
        special_requests: "",
      },
    ]);
  };

  const handleFileChange = async (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    if (file) {
      const base64 = await convertFileToBase64(file);
      setFieldValue("id_card", base64);
    }
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });
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
    const formattedValues = {
      first_name: values.first_name || "",
      last_name: values.last_name || "",
      email: values.email || "",
      phone: values.phone || "",
    };

    const payload = {
      passengers: isChecked
        ? [...passengers, formattedValues]
        : [formattedValues],
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
        id_card: "",
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
              {" "}
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

            {/* <Col md={6}>
              <BootstrapForm.Group className="mb-3">
                <FloatingLabel
                  controlId="floatingDateOfBirth"
                  label="Date of Birth"
                >
                  <BootstrapForm.Control
                    type="date"
                    name="date_of_birth"
                    value={values.date_of_birth}
                    onChange={handleChange}
                    isInvalid={touched.date_of_birth && !!errors.date_of_birth}
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.date_of_birth}
                  </BootstrapForm.Control.Feedback>
                </FloatingLabel>
              </BootstrapForm.Group>
            </Col> */}

            {/* <Col md={6}>
              <BootstrapForm.Group className="mb-3">
                <FloatingLabel controlId="floatingGender" label="Gender">
                  <BootstrapForm.Control
                    as="select"
                    name="gender"
                    value={values.gender}
                    onChange={handleChange}
                    isInvalid={touched.gender && !!errors.gender}
                  >
                    <option value="">Select Gender</option>
                    {genderOptions.map((option) => (
                      <option value={option.id} key={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </BootstrapForm.Control>
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.gender}
                  </BootstrapForm.Control.Feedback>
                </FloatingLabel>
              </BootstrapForm.Group>
            </Col> */}

            {/* <Col md={6}>
              <BootstrapForm.Group className="mb-3">
                <FloatingLabel
                  controlId="floatingNationality"
                  label="Nationality"
                >
                  <BootstrapForm.Control
                    as="select"
                    name="nationality"
                    value={values.nationality}
                    onChange={handleChange}
                    isInvalid={touched.nationality && !!errors.nationality}
                  >
                    <option value="">Select Nationality</option>
                    {nationalityOptions.map((option) => (
                      <option value={option.name} key={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </BootstrapForm.Control>
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.nationality}
                  </BootstrapForm.Control.Feedback>
                </FloatingLabel>
              </BootstrapForm.Group>
            </Col> */}

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

            {/* <Col md={6}>
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
                    isInvalid={
                      touched.special_requests && !!errors.special_requests
                    }
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.special_requests}
                  </BootstrapForm.Control.Feedback>
                </FloatingLabel>
              </BootstrapForm.Group>
            </Col> */}
          </Row>

          <Row>
            {/* <Col md={2}>
              <BootstrapForm.Group className="mb-3">
                <FloatingLabel
                  controlId="floatingNumAdults"
                  label="Number of Adults"
                >
                  <BootstrapForm.Control
                    type="number"
                    name="num_adults"
                    value={values.num_adults}
                    onChange={handleChange}
                    isInvalid={touched.num_adults && !!errors.num_adults}
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.num_adults}
                  </BootstrapForm.Control.Feedback>
                </FloatingLabel>
              </BootstrapForm.Group>
            </Col>

            <Col md={2}>
              <BootstrapForm.Group className="mb-3">
                <FloatingLabel
                  controlId="floatingNumChildren"
                  label="Number of Children"
                >
                  <BootstrapForm.Control
                    type="number"
                    name="num_children"
                    value={values.num_children}
                    onChange={handleChange}
                    isInvalid={touched.num_children && !!errors.num_children}
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.num_children}
                  </BootstrapForm.Control.Feedback>
                </FloatingLabel>
              </BootstrapForm.Group>
            </Col>

            <Col md={2}>
              <BootstrapForm.Group className="mb-3">
                <FloatingLabel
                  controlId="floatingNumInfants"
                  label="Number of Infants"
                >
                  <BootstrapForm.Control
                    type="number"
                    name="num_infants"
                    value={values.num_infants}
                    onChange={handleChange}
                    isInvalid={touched.num_infants && !!errors.num_infants}
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.num_infants}
                  </BootstrapForm.Control.Feedback>
                </FloatingLabel>
              </BootstrapForm.Group>
            </Col> */}

            {/* <Col md={6}>
              <BootstrapForm.Group className="mb-3">
                <FloatingLabel
                  controlId="floatingNumInfants"
                  label="Upload ID Card"
                >
                  <BootstrapForm.Control
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    name="id_card"
                    onChange={(e) => handleFileChange(e, setFieldValue)}
                    isInvalid={touched.id_card && !!errors.id_card}
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.id_card}
                  </BootstrapForm.Control.Feedback>
                </FloatingLabel>
              </BootstrapForm.Group>
            </Col> */}
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
            <>
              {passengers.map((passenger) => (
                <div
                  key={passenger.id}
                  className="passenger-form mt-3 border p-3"
                >
                  <Row>
                    <Col md={6}>
                      <BootstrapForm.Group className="mb-3">
                        <FloatingLabel
                          controlId={`passengerFirstName-${passenger.id}`}
                          label="First Name"
                        >
                          <BootstrapForm.Control
                            type="text"
                            name="first_name"
                            value={passenger.first_name}
                            onChange={(e) =>
                              handlePassengerChange(passenger.id, e)
                            }
                          />
                        </FloatingLabel>
                      </BootstrapForm.Group>
                    </Col>
                    <Col md={6}>
                      <BootstrapForm.Group className="mb-3">
                        <FloatingLabel
                          controlId={`passengerLastName-${passenger.id}`}
                          label="Last Name"
                        >
                          <BootstrapForm.Control
                            type="text"
                            name="last_name"
                            value={passenger.last_name}
                            onChange={(e) =>
                              handlePassengerChange(passenger.id, e)
                            }
                          />
                        </FloatingLabel>
                      </BootstrapForm.Group>
                    </Col>
                  </Row>
                  {/* <Row>
                    <Col md={6}>
                      <BootstrapForm.Group className="mb-3">
                        <FloatingLabel
                          controlId={`passengerDOB-${passenger.id}`}
                          label="Date of Birth"
                        >
                          <BootstrapForm.Control
                            type="date"
                            name="date_of_birth"
                            value={passenger.date_of_birth}
                            onChange={(e) =>
                              handlePassengerChange(passenger.id, e)
                            }
                          />
                        </FloatingLabel>
                      </BootstrapForm.Group>
                    </Col>
                    <Col md={6}>
                      <BootstrapForm.Group className="mb-3">
                        <FloatingLabel
                          controlId={`passengerGender-${passenger.id}`}
                          label="Gender"
                        >
                          <BootstrapForm.Control
                            as="select"
                            name="gender"
                            value={passenger.gender}
                            onChange={(e) =>
                              handlePassengerChange(passenger.id, e)
                            }
                          >
                            <option value="">Select Gender</option>
                            {genderOptions.map((option) => (
                              <option value={option.id} key={option.id}>
                                {option.name}
                              </option>
                            ))}
                          </BootstrapForm.Control>
                        </FloatingLabel>
                      </BootstrapForm.Group>
                    </Col>
                  </Row> */}
                  <Row>
                    {/* <Col md={6}>
                      <BootstrapForm.Group className="mb-3">
                        <FloatingLabel
                          controlId={`passengerNationality-${passenger.id}`}
                          label="Nationality"
                        >
                          <BootstrapForm.Control
                            as="select"
                            name="nationality"
                            value={passenger.nationality}
                            onChange={(e) =>
                              handlePassengerChange(passenger.id, e)
                            }
                          >
                            <option value="">Select Nationality</option>
                            {nationalityOptions.map((option) => (
                              <option value={option.name} key={option.id}>
                                {option.name}
                              </option>
                            ))}
                          </BootstrapForm.Control>
                        </FloatingLabel>
                      </BootstrapForm.Group>
                    </Col> */}
                    <Col md={6}>
                      <BootstrapForm.Group className="mb-3">
                        <FloatingLabel
                          controlId={`passengerEmail-${passenger.id}`}
                          label="Email"
                        >
                          <BootstrapForm.Control
                            type="email"
                            name="email"
                            value={passenger.email}
                            onChange={(e) =>
                              handlePassengerChange(passenger.id, e)
                            }
                          />
                        </FloatingLabel>
                      </BootstrapForm.Group>
                    </Col>
                    <Col md={6}>
                      <BootstrapForm.Group className="mb-3">
                        <FloatingLabel
                          controlId={`passengerPhone-${passenger.id}`}
                          label="Phone Number"
                        >
                          <BootstrapForm.Control
                            type="text"
                            name="phone"
                            value={passenger.phone}
                            onChange={(e) =>
                              handlePassengerChange(passenger.id, e)
                            }
                          />
                        </FloatingLabel>
                      </BootstrapForm.Group>
                    </Col>
                  </Row>

                  <Row>
                    {/* <Col md={6}>
                      <BootstrapForm.Group className="mb-3">
                        <FloatingLabel
                          controlId={`passengerSpecialRequests-${passenger.id}`}
                          label="Special Requests"
                        >
                          <BootstrapForm.Control
                            as="textarea"
                            name="special_requests"
                            value={passenger.special_requests}
                            onChange={(e) =>
                              handlePassengerChange(passenger.id, e)
                            }
                          />
                        </FloatingLabel>
                      </BootstrapForm.Group>
                    </Col> */}
                  </Row>

                  <Button
                    variant="danger"
                    onClick={() => handleRemovePassenger(passenger.id)}
                  >
                    <FaTrash />
                  </Button>
                </div>
              ))}

              <Button
                variant="success"
                onClick={handleAddPassenger}
                className="mt-3"
              >
                <FaPlus /> Add Passenger
              </Button>
            </>
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
              Next
            </Button>

            <Button type="submit" disabled={!dirty}>
              Save
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default BookingStepFour;
