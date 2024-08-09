import { Formik, Field, Form } from "formik";
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
  addBookingStepThreeAsync,
  setCurrentStep,
} from "../../../../../../slices/booking/bookingSlice";
import { nationalityOptions } from "../../../../../../util/data";
import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

const validationSchema = Yup.object({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  date_of_birth: Yup.date()
    .required("Date of Birth is required")
    .max(new Date(), "Date of Birth cannot be in the future"),
  gender: Yup.string().required("Gender is required"),
  nationality: Yup.string().required("Nationality is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  special_requests: Yup.string(),
});

const genderOptions = [
  { id: "male", name: "Male" },
  { id: "female", name: "Female" },
  { id: "other", name: "Other" },
];

function BookingStepThree() {
  const [isChecked, setIsChecked] = useState(false);
  const [passengers, setPassengers] = useState([
    {
      first_name: "",
      last_name: "",
      date_of_birth: "",
      gender: "",
      nationality: "",
      email: "",
      phone: "",
      special_requests: "",
    },
  ]);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleAddPassenger = () => {
    setPassengers([
      ...passengers,
      {
        first_name: "",
        last_name: "",
        date_of_birth: "",
        gender: "",
        nationality: "",
        email: "",
        phone: "",
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
    // Adjust the payload if necessary
    dispatch(
      addBookingStepThreeAsync({
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

  const bookingInfo = useSelector((state) => state?.booking);

  const handleBack = () => {
    const current = bookingInfo?.currentStep;
    dispatch(setCurrentStep(current - 1));
  };
  return (
    <>
      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          date_of_birth: "",
          gender: "",
          nationality: "",
          email: "",
          phone: "",
          special_requests: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, handleChange, values, handleSubmit }) => (
          <Form>
            <Row>
              <Col md={6}>
                <BootstrapForm.Group className="mb-3">
                  <FloatingLabel controlId="floatingName" label="First Name">
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
                  <FloatingLabel controlId="floatingName" label="Last Name">
                    <BootstrapForm.Control
                      type="text"
                      name="last_name"
                      value={values.last_name}
                      onChange={handleChange}
                      isInvalid={touched.last_name && !!errors.last_name}
                    />
                    <BootstrapForm.Control.Feedback type="invalid">
                      {errors.name}
                    </BootstrapForm.Control.Feedback>
                  </FloatingLabel>
                </BootstrapForm.Group>
              </Col>
              <Col md={6}>
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
                      isInvalid={
                        touched.date_of_birth && !!errors.date_of_birth
                      }
                    />
                    <BootstrapForm.Control.Feedback type="invalid">
                      {errors.date_of_birth}
                    </BootstrapForm.Control.Feedback>
                  </FloatingLabel>
                </BootstrapForm.Group>
              </Col>
              <Col md={6}>
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
              </Col>
              <Col md={6}>
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
                  <FloatingLabel
                    controlId="floatingPhoneNumber"
                    label="Phone Number"
                  >
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
                    />
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
              <div>
                <h5 className="my-3">Passengers</h5>
                {passengers.map((passenger, index) => (
                  <div key={passenger.id} className="mb-4">
                    <Row>
                      <Col md={6}>
                        <BootstrapForm.Group className="mb-3">
                          <FloatingLabel
                            controlId="floatingName"
                            label="First Name"
                          >
                            <BootstrapForm.Control
                              type="text"
                              name="first_name"
                              value={passenger.from}
                              onChange={(e) =>
                                handlePassengerChange(passenger.id, e)
                              }
                              // isInvalid={
                              //   touched.first_name && !!errors.first_name
                              // }
                            />
                            {/* <BootstrapForm.Control.Feedback type="invalid">
                              {errors.first_name}
                            </BootstrapForm.Control.Feedback> */}
                          </FloatingLabel>
                        </BootstrapForm.Group>
                      </Col>

                      {/* <Col md={6}>
                        <BootstrapForm.Group className="mb-3">
                          <FloatingLabel
                            controlId="floatingName"
                            label="Last Name"
                          >
                            <BootstrapForm.Control
                              type="text"
                              name="last_name"
                              value={values.last_name}
                              onChange={handleChange}
                              isInvalid={
                                touched.last_name && !!errors.last_name
                              }
                            />
                            <BootstrapForm.Control.Feedback type="invalid">
                              {errors.name}
                            </BootstrapForm.Control.Feedback>
                          </FloatingLabel>
                        </BootstrapForm.Group>
                      </Col>
                      <Col md={6}>
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
                              isInvalid={
                                touched.date_of_birth && !!errors.date_of_birth
                              }
                            />
                            <BootstrapForm.Control.Feedback type="invalid">
                              {errors.date_of_birth}
                            </BootstrapForm.Control.Feedback>
                          </FloatingLabel>
                        </BootstrapForm.Group>
                      </Col>
                      <Col md={6}>
                        <BootstrapForm.Group className="mb-3">
                          <FloatingLabel
                            controlId="floatingGender"
                            label="Gender"
                          >
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
                      </Col>
                      <Col md={6}>
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
                              isInvalid={
                                touched.nationality && !!errors.nationality
                              }
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
                      </Col>
                      <Col md={6}>
                        <BootstrapForm.Group className="mb-3">
                          <FloatingLabel
                            controlId="floatingEmail"
                            label="Email"
                          >
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
                          <FloatingLabel
                            controlId="floatingPhoneNumber"
                            label="Phone Number"
                          >
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
                            />
                          </FloatingLabel>
                        </BootstrapForm.Group>
                      </Col> */}
                    </Row>

                    <Button
                      variant="danger"
                      className="my-3"
                      size="sm"
                      onClick={() => handleRemovePassenger(passenger.id)}
                    >
                      <FaTrash /> Remove
                    </Button>
                  </div>
                ))}

                <Button
                  variant="primary"
                  className="mt-4"
                  size="sm"
                  onClick={handleAddPassenger}
                >
                  <FaPlus /> Add Another Passenger
                </Button>
              </div>
            )}

            <div className="d-flex justify-content-end mt-3">
              <Button
                variant="white"
                className="border border-main-color text-start"
                onClick={handleBack}
              >
                Back
              </Button>

              <Button type="submit">Proceed</Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
export default BookingStepThree;
