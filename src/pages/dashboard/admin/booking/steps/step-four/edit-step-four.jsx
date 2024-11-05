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
import { nationalityOptions } from "../../../../../../util/data";
import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ImNotification } from "react-icons/im";
import { toast } from "react-toastify";
import { id } from "date-fns/locale";

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

// Gender options
const genderOptions = [
  { id: "male", name: "Male" },
  { id: "female", name: "Female" },
  { id: "other", name: "Other" },
];

function EditBookingStepFour(props) {
  const [isChecked, setIsChecked] = useState(
    props?.data[0]?.passengers ? true : false
  );
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
        date_of_birth: "",
        gender: "",
        nationality: "",
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
      id: values.id,
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      phone: values.phone,
    };

    const payload = {
      passengers: [
        formattedValues,
        ...values.passengers.map((passenger) => ({
          id: passenger.id,
          first_name: passenger.first_name,
          last_name: passenger.last_name,
          email: passenger.email,
          phone: passenger.phone,
        })),
      ],
    };

    console.log("passengers", payload);
    console.log("passenger id", props?.data[0]?.passengers);

    // dispatch(
    //   addBookingStepThreeAsync({
    //     bookingId: props?.data[0]?.id,
    //     values: payload,
    //   })
    // )
    //   .then((response) => {
    //     if (response?.payload?.success) {
    //       const current = bookingInfo?.currentStep;
    //       dispatch(setCurrentStep(current + 1));
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error occurred:", error);
    //     toast.error("An unexpected error occurred.");
    //   });
  };

  return (
    <Formik
      initialValues={{
        passengers: props?.data[0]?.passengers.map((passenger) => ({
          id: passenger.id,
          first_name: passenger.first_name || "",
          last_name: passenger.last_name || "",
          email: passenger.email || "",
          phone: passenger.phone || "",
          passengers: props?.data[0]?.passengers || [],
        })),
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
                    name="passengers[0].first_name"
                    value={values.passengers[0]?.first_name}
                    onChange={handleChange}
                    isInvalid={
                      touched.passengers?.[0]?.first_name &&
                      !!errors.passengers?.[0]?.first_name
                    }
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.passengers?.[0]?.first_name}
                  </BootstrapForm.Control.Feedback>
                </FloatingLabel>
              </BootstrapForm.Group>
            </Col>

            <Col md={6}>
              <BootstrapForm.Group className="mb-3">
                <FloatingLabel controlId="floatingLastName" label="Last Name">
                  <BootstrapForm.Control
                    type="text"
                    name="passengers[0].last_name"
                    value={values.passengers[0]?.last_name}
                    onChange={handleChange}
                    isInvalid={
                      touched.passengers?.[0]?.last_name &&
                      !!errors.passengers?.[0]?.last_name
                    }
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.passengers?.[0]?.last_name}
                  </BootstrapForm.Control.Feedback>
                </FloatingLabel>
              </BootstrapForm.Group>
            </Col>

            <Col md={6}>
              <BootstrapForm.Group className="mb-3">
                <FloatingLabel controlId="floatingEmail" label="Email">
                  <BootstrapForm.Control
                    type="email"
                    name="passengers[0].email"
                    value={values.passengers[0]?.email}
                    onChange={handleChange}
                    isInvalid={
                      touched.passengers?.[0]?.email &&
                      !!errors.passengers?.[0]?.email
                    }
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.passengers?.[0]?.email}
                  </BootstrapForm.Control.Feedback>
                </FloatingLabel>
              </BootstrapForm.Group>
            </Col>

            <Col md={6}>
              <BootstrapForm.Group className="mb-3">
                <FloatingLabel controlId="floatingPhone" label="Phone Number">
                  <BootstrapForm.Control
                    type="text"
                    name="passengers[0].phone"
                    value={values.passengers[0]?.phone}
                    onChange={handleChange}
                    isInvalid={
                      touched.passengers?.[0]?.phone &&
                      !!errors.passengers?.[0]?.phone
                    }
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.passengers?.[0]?.phone}
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
                    <div
                      key={passenger?.id}
                      className="passenger-form mt-3 border p-3"
                    >
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

          <div className=" mt-3">
            <Button type="submit" disabled={!dirty}>
              Update Passenger Information
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default EditBookingStepFour;
