import { Formik, Form, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import { getAllClientAsync } from "../../../../../../slices/client/clientSlice";
import {
  getAllAirportsAsync,
  getAllPartnershipsAsync,
  getAllServicesAsync,
  searchAirportsAsync,
} from "../../../../../../slices/config/configSlice";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  airports,
  internationalAirports,
  localAirports,
  times,
  worldAirports,
} from "../../../../../../util/data";
import DateTimePicker from "react-datetime-picker";
import {
  FloatingLabel,
  Form as BootstrapForm,
  Button,
  Row,
  Col,
  Card,
} from "react-bootstrap";

import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import {
  addBookingStepOneAsync,
  setCurrentStep,
  setSelectedServiceId,
} from "../../../../../../slices/booking/bookingSlice";
import { FaPlus, FaTrash } from "react-icons/fa";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import Select from "react-select";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const validationSchema = Yup.object().shape({
  // trip_type: Yup.string().required("Trip type is required"),
  // from_location: Yup.string().required("Departure airport is required"),
  // to_location: Yup.string().required("Destination airport is required"),
  // .notOneOf([Yup.ref("from")], "Origin and destination cannot be the same"),
  // flight_date: Yup.date().required("Departure date and time are required"),
  // .min(new Date(), "Departure date cannot be in the past"),
  // return_datetime: Yup.date().min(
  //   Yup.ref("flight_date"),
  //   "Return date cannot be before departure date"
  // ),
  client_id: Yup.string().required("Client is required"),
  multi_leg_route: Yup.boolean(),
  legs: Yup.array().when("multi_leg_route", {
    is: true,
    then: Yup.array().of(
      Yup.object().shape({
        from: Yup.string().required("From airport is required"),
        to: Yup.string().required("To airport is required"),
        departure_date: Yup.date().required(
          "Departure date and time are required"
        ),
        arrival_date: Yup.date()
          .required("Arrival date and time are required")
          .min(
            Yup.ref("departure_date"),
            "Arrival date cannot be before departure date"
          ),
      })
    ),
  }),
});

function EditBookingStepOne(props) {
  const [bookings, setBookings] = useState([]);
  const dispatch = useDispatch();
  const [to_airport, onChangeTo] = useState(
    props?.data[0]?.flight_date
      ? new Date(props?.data[0]?.flight_date)
      : new Date()
  );

  const clientInfo = useSelector((state) => state?.client);
  const configInfo = useSelector((state) => state?.config);
  const bookingInfo = useSelector((state) => state?.booking);

  const [from_airport, onChangeFrom] = useState(
    props?.data[0]?.return_date
      ? new Date(props?.data[0]?.return_date)
      : new Date()
  );
  const [isChecked, setIsChecked] = useState(
    props.data[0]?.legs ? true : false
  );
  // const [legs, setLegs] = useState([
  //   {
  //     id: uuidv4(),
  //     from: props?.data[0]?.from_location
  //       ? {
  //           value: props?.data[0]?.from_location,
  //           label: props?.data[0]?.from_location,
  //         }
  //       : "",
  //     to: "",
  //     departure_date: "",
  //     departure_time: "",
  //     return_date: "",
  //     arrival_time: "",
  //   },
  // ]);

  const [legs, setLegs] = useState([...props.data[0]?.legs]);

  const handleAddLeg = () => {
    setLegs((prevLegs) => {
      const lastLegToValue = prevLegs.length > 0 ? prevLegs.slice(-1)[0] : {};

      console.log("prevLegs.slice(-1)[0]", prevLegs.slice(-1)[0]);
      return [
        ...prevLegs,
        {
          from: lastLegToValue?.to, // Default to previous 'to' value
          to: "", // Default to empty value
          departure_date: null,
          departure_time: "",
          // arrival_time: null,
          arrival_time: "",
        },
      ];
    });
  };

  const handleRemoveLeg = (id) => {
    setLegs((prevLegs) => prevLegs.filter((leg) => leg.id !== id));
  };

  const handleLegChange = (legId, event) => {
    const { name, value } = event.target;
    setLegs((prevLegs) =>
      prevLegs.map((leg) =>
        leg.id === legId ? { ...leg, [name]: value } : leg
      )
    );
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const [savedValues, setSavedValues] = useState(props?.data[0]);

  const handleNext = () => {
    const current = bookingInfo?.currentStep;
    dispatch(setCurrentStep(current + 1));
  };

  const handleRemove = (index) => {
    setBookings((prevBookings) => prevBookings.filter((_, i) => i !== index));
  };
  const step = useSelector((state) => state.booking?.currentStep);

  const handleSearchAirport = (value) => {
    if (value.trim() !== "") {
      dispatch(searchAirportsAsync({ query: value }));
    }
  };

  const [toLocationDefaultValue, setToLocationDefaultValue] = useState(null);
  const [toServiceDefaultValue, setToServiceDefaultValue] = useState(null);
  const [fromLocationDefaultValue, setFromLocationDefaultValue] =
    useState(null);

  useEffect(() => {
    if (props.data[0]?.from_location) {
      setFromLocationDefaultValue({
        value: props.data[0]?.from_location,
        label: props.data[0]?.from_location,
      });
    }
  }, [props.data[0]?.from_location]);

  // useEffect for setting initial value for to_location
  useEffect(() => {
    if (props.data[0]?.to_location) {
      setToLocationDefaultValue({
        value: props.data[0]?.to_location,
        label: props.data[0]?.to_location,
      });
    }
  }, [props.data[0]?.to_location]);

  useEffect(() => {
    if (props.data[0]?.service) {
      setToServiceDefaultValue({
        value: props.data[0]?.service?.id,
        label: props.data[0]?.service?.service_name,
      });
    }
  }, [props.data[0]?.service]);

  useEffect(() => {
    try {
      dispatch(getAllClientAsync());
      dispatch(getAllPartnershipsAsync());
      dispatch(getAllAirportsAsync());
      dispatch(setCurrentStep(0));
      dispatch(getAllServicesAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);
  const convertTo12HourFormat = (time) => {
    if (!time) return ""; // Handle empty or undefined time
    const [hours, minutes] = time.split(":");
    const isPM = hours >= 12;
    const adjustedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
    const ampm = isPM ? "PM" : "AM";
    return `${String(adjustedHours).padStart(2, "0")}:${minutes} ${ampm}`;
  };
  const [selectedFlightTime, setSelectedFlightTime] = useState(
    convertTo12HourFormat(props.data[0]?.flight_time) || ""
  );

  const [selectedReturnTime, setSelectedReturnTime] = useState(
    convertTo12HourFormat(props.data[0]?.return_time) || ""
  );

  return (
    <>
      <Formik
        initialValues={{
          from_location: props.data[0].from_location,
          to_location: props.data[0].to_location,
          flight_date: props.data[0].flight_date,
          return_date: props.data[0].return_date,
          client_id: props.data[0]?.client?.id,
          multi_leg: null,
          service_id: props.data[0]?.service?.id,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          const { from_location, to_location, service_id } = values;

          dispatch(setSelectedServiceId(service_id?.value));

          if (!from_location) {
            toast.error("Please fill out the Departure Airport");
            setSubmitting(false);
            return;
          }

          if (!to_location) {
            toast.error("Please fill out the Destination Airport");
            setSubmitting(false);
            return;
          }

          const payload = {
            ...values,
            booking_id: props.data[0].id,
            service_id: service_id?.value, // Extract service_id value
            client_id: Number(values.client_id), // Convert client_id to a number
            multi_leg: isChecked,
            legs: isChecked && legs,
          };

          dispatch(addBookingStepOneAsync(payload))
            .then((response) => {
              if (response?.payload?.success) {
                // const current = bookingInfo?.currentStep;
                // dispatch(setCurrentStep(current + 1));
              } else {
                toast.error("Error please try again");
              }
            })
            .catch((error) => {
              console.error("Error occurred:", error);
              toast.error(
                "An unexpected error occurred. Please try again later."
              );
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ values, setFieldValue, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Row className="mt-5">
              <Col md={6}>
                <BootstrapForm.Group>
                  <label>Select Departure Airport</label>
                  <Select
                    value={fromLocationDefaultValue}
                    options={
                      Array.isArray(configInfo?.getAllAirportsResponse)
                        ? configInfo.getAllAirportsResponse.map((option) => ({
                          value: option?.name,
                          label: option?.location,
                        }))
                        : []
                    }
                    className="form-control"
                    classNamePrefix="from_location"
                    onInputChange={(value) => handleSearchAirport(value)}
                    onChange={(selectedOption) => {
                      // Set new value for Formik field and state
                      setFieldValue("from_location", selectedOption.value);
                      setFromLocationDefaultValue(selectedOption);
                      setSavedValues((prev) => ({
                        ...prev,
                        from_location: selectedOption.value,
                      }));
                    }}
                  />
                  <ErrorMessage
                    name="from_location"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>
              </Col>

              <Col md={6}>
                <BootstrapForm.Group>
                  <label>Select Destination Airport</label>
                  <Select
                    value={toLocationDefaultValue}
                    options={
                      Array.isArray(configInfo?.getAllAirportsResponse)
                        ? configInfo.getAllAirportsResponse.map((option) => ({
                          value: option?.name,
                          label: option?.location,
                        }))
                        : []
                    }
                    className="form-control"
                    classNamePrefix="to_location"
                    onInputChange={(value) => handleSearchAirport(value)}
                    onChange={(selectedOption) => {
                      setFieldValue("to_location", selectedOption.value);
                      setToLocationDefaultValue(selectedOption);
                      setAirTo(selectedOption.value);
                      setSavedValues((prev) => ({
                        ...prev,
                        to_location: selectedOption.value,
                      }));
                    }}
                  />
                  <ErrorMessage
                    name="to_location"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>
              </Col>
            </Row>

            <Row className="my-4">
              <Col md={6}>
                <Row>
                  <Col>
                    <BootstrapForm.Group>
                      <BootstrapForm.Label>Departure Date</BootstrapForm.Label>
                      <BootstrapForm.Control
                        type="date"
                        placeholder="Select departure date"
                        name="flight_date"
                        value={values.flight_date}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={(e) => {
                          handleChange(e);
                          setSavedValues((prev) => ({
                            ...prev,
                            flight_date: e.target.value,
                          }));
                        }}
                        className="py-3"
                      />
                      <ErrorMessage
                        name="flight_date"
                        component="div"
                        className="text-danger"
                      />
                    </BootstrapForm.Group>
                  </Col>
                  <Col>
                    <BootstrapForm.Group>
                      <BootstrapForm.Label>Departure Time</BootstrapForm.Label>
                      <BootstrapForm.Control
                        as="select"
                        className="py-3 custom-scroll-dropdown"
                        name="flight_time"
                        value={selectedFlightTime}
                        style={{ maxHeight: "200px", overflowY: "auto" }}
                        onChange={(e) => {
                          const newValue = e.target.value;
                          setSelectedFlightTime(newValue); // Update local state
                          setFieldValue("flight_time", newValue); // Update form state
                          setSavedValues((prev) => ({
                            ...prev,
                            flight_time: newValue,
                          })); // Update saved values
                        }}
                        aria-label="Select flight time"
                        required
                      >
                        <option value="">Select Flight Time</option>
                        {times.map((time, index) => {
                          const convertedTime = convertTo12HourFormat(time);
                          return (
                            <option value={convertedTime} key={index}>
                              {convertedTime}
                            </option>
                          );
                        })}
                      </BootstrapForm.Control>

                      <ErrorMessage
                        name="flight_time"
                        component="div"
                        className="text-danger"
                      />
                    </BootstrapForm.Group>
                  </Col>
                </Row>
              </Col>

              <Col md={6}>
                <Row>
                  <Col>
                    <BootstrapForm.Group>
                      <BootstrapForm.Label>Return Date</BootstrapForm.Label>
                      <BootstrapForm.Control
                        type="date"
                        placeholder="Select return date"
                        name="return_date"
                        value={values.return_date || props.data[0]?.return_date}
                        min={
                          values.flight_date ||
                          new Date().toISOString().split("T")[0]
                        }
                        onChange={(e) => {
                          handleChange(e);
                          setSavedValues((prev) => ({
                            ...prev,
                            return_date: e.target.value,
                          }));
                        }}
                        className="py-3"
                      />
                      <ErrorMessage
                        name="return_date"
                        component="div"
                        className="text-danger"
                      />
                    </BootstrapForm.Group>
                  </Col>
                  <Col>
                    <BootstrapForm.Group>
                      <BootstrapForm.Label>Return Time</BootstrapForm.Label>
                      <BootstrapForm.Control
                        as="select"
                        className="py-3"
                        name="return_time"
                        value={selectedReturnTime}
                        onChange={(e) => {
                          const newValue = e.target.value;
                          setSelectedReturnTime(newValue); // Update local state
                          setFieldValue("return_time", newValue); // Update form state
                          setSavedValues((prev) => ({
                            ...prev,
                            return_time: newValue,
                          })); // Update saved values
                        }}
                      >
                        <option value="">Select Return Time</option>
                        {times.map((time, index) => {
                          const convertedTime = convertTo12HourFormat(time); // Convert each time for display
                          return (
                            <option value={convertedTime} key={index}>
                              {convertedTime}
                            </option>
                          );
                        })}
                      </BootstrapForm.Control>
                      <ErrorMessage
                        name="return_time"
                        component="div"
                        className="text-danger"
                      />
                    </BootstrapForm.Group>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <BootstrapForm.Group>
                  <BootstrapForm.Label>
                    Client <span className="text-danger">*</span>
                  </BootstrapForm.Label>

                  <BootstrapForm.Control
                    as="select"
                    className="py-3"
                    name="client_id"
                    value={values.client || props.data[0]?.client?.id}
                    onChange={(e) => {
                      setFieldValue("client_id", e.target.value);
                      setSavedValues((prev) => ({
                        ...prev,
                        client_id: e.target.value,
                      }));
                    }}
                  >
                    <option value="">Select Client</option>
                    {Array.isArray(clientInfo?.getAllClientsResponse?.data)
                      ? clientInfo?.getAllClientsResponse?.data?.map(
                        (client, index) => (
                          <option value={client.id} key={index}>
                            {client.first_name + " " + client.last_name}
                          </option>
                        )
                      )
                      : null}
                  </BootstrapForm.Control>

                  <ErrorMessage
                    name="client_id"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>
              </Col>

              <Col md={6}>
                <BootstrapForm.Group>
                  <label>Select Service</label>
                  <Select
                    value={toServiceDefaultValue}
                    options={
                      Array.isArray(configInfo?.getAllServicesResponse?.data)
                        ? configInfo?.getAllServicesResponse?.data?.map(
                          (option) => ({
                            value: option?.id,
                            label: option?.service_name,
                          })
                        )
                        : []
                    }
                    className="form-control"
                    classNamePrefix="service_id"
                    onChange={(selectedOption) => {
                      setFieldValue("service_id", selectedOption);
                      setToServiceDefaultValue(selectedOption);
                      setSavedValues((prev) => ({
                        ...prev,
                        service_id: selectedOption,
                      }));
                    }}
                  />

                  <ErrorMessage
                    name="service_id"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>
              </Col>
            </Row>

            <div className="my-5 bg-body-tertiary p-3">
              <Row>
                <Col md={12}>
                  <BootstrapForm.Group>
                    <BootstrapForm.Check
                      type="checkbox"
                      label="Multi-Leg Route"
                      name="multi_leg"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />
                  </BootstrapForm.Group>
                </Col>
              </Row>

              {legs && (
                <div>
                  <h5 className="my-3">Legs</h5>
                  {legs.map((leg, index) => (
                    <Card key={leg.id} className="mb-4 border shadow-sm">
                      <Card.Header className="bg-primary text-white">
                        Leg {index + 1}
                      </Card.Header>
                      <Card.Body>
                        <Row>
                          <Col md={6}>
                            <BootstrapForm.Group>
                              <label>
                                Select Departure Airport{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <Select
                                defaultValue={{
                                  value: leg.from,
                                  label: leg.from,
                                }}
                                options={
                                  Array.isArray(
                                    configInfo?.getAllAirportsResponse
                                  )
                                    ? configInfo.getAllAirportsResponse.map(
                                      (option) => ({
                                        value: option?.name,
                                        label: option?.location,
                                      })
                                    )
                                    : []
                                }
                                placeholder="Select an Airport"
                                isClearable
                                isSearchable
                                className="form-control"
                                classNamePrefix="from"
                                onInputChange={(value) =>
                                  handleSearchAirport(value)
                                }
                                onChange={(selectedOption) => {
                                  const selectedValue = selectedOption?.value;
                                  setLegs((prevLegs) =>
                                    prevLegs.map((legItem, legIndex) =>
                                      legIndex === index
                                        ? {
                                          ...legItem,
                                          from: selectedOption
                                            ? selectedValue
                                            : legItem.from,
                                        }
                                        : legItem
                                    )
                                  );
                                }}
                              />
                              <ErrorMessage
                                name={`legs[${index}].from`}
                                component="div"
                                className="text-danger"
                              />
                            </BootstrapForm.Group>
                          </Col>

                          <Col md={6}>
                            <BootstrapForm.Group>
                              <label>
                                Select Destination Airport{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <Select
                                value={{
                                  value: leg.to,
                                  label: leg.to,
                                }}
                                options={
                                  Array.isArray(
                                    configInfo?.getAllAirportsResponse
                                  )
                                    ? configInfo.getAllAirportsResponse.map(
                                      (option) => ({
                                        value: option?.name,
                                        label: option?.location,
                                      })
                                    )
                                    : []
                                }
                                placeholder="Select an Airport"
                                isClearable
                                isSearchable
                                className="form-control"
                                classNamePrefix="to_location"
                                onInputChange={(value) =>
                                  handleSearchAirport(value)
                                }
                                onChange={(selectedOption) => {
                                  const selectedValue = selectedOption?.value;
                                  setLegs((prevLegs) =>
                                    prevLegs.map((legItem, legIndex) =>
                                      legIndex === index
                                        ? {
                                          ...legItem,
                                          to: selectedOption
                                            ? selectedValue
                                            : legItem.to,
                                        }
                                        : legItem
                                    )
                                  );
                                }}
                                aria-label="Select Destination Airport"
                              />
                              <ErrorMessage
                                name={`legs[${index}].to`}
                                component="div"
                                className="text-danger"
                              />
                            </BootstrapForm.Group>
                          </Col>
                        </Row>

                        <Row className="my-3">
                          <Col md={6}>
                            <Row>
                              <Col md={6}>
                                <BootstrapForm.Group>
                                  <BootstrapForm.Label>
                                    Departure Date{" "}
                                    <span className="text-danger">*</span>
                                  </BootstrapForm.Label>
                                  <BootstrapForm.Control
                                    type="date"
                                    name={`legs[${index}].departure_date_time`}
                                    value={
                                      leg.departure_date &&
                                        !isNaN(new Date(leg.departure_date))
                                        ? new Date(leg.departure_date)
                                          .toISOString()
                                          .split("T")[0]
                                        : ""
                                    }
                                    onChange={(e) =>
                                      handleLegChange(leg.id, {
                                        target: {
                                          name: "departure_date",
                                          value: e.target.value,
                                        },
                                      })
                                    }
                                    placeholder="Select departure date"
                                    className="py-3"
                                  />
                                  <ErrorMessage
                                    name={`legs[${index}].departure_date`}
                                    component="div"
                                    className="text-danger"
                                  />
                                </BootstrapForm.Group>
                              </Col>

                              <Col md={6}>
                                <BootstrapForm.Group>
                                  <BootstrapForm.Label>
                                    Departure Time{" "}
                                    <span className="text-danger">*</span>
                                  </BootstrapForm.Label>
                                  <BootstrapForm.Control
                                    as="select"
                                    name={`legs[${index}].departure_time`}
                                    value={leg.departure_time || ""}
                                    onChange={(e) =>
                                      handleLegChange(leg.id, {
                                        target: {
                                          name: "departure_time",
                                          value: e.target.value,
                                        },
                                      })
                                    }
                                    className="py-3"
                                  >
                                    <option value="">
                                      Select Departure Time
                                    </option>
                                    {times.map((time, idx) => (
                                      <option value={time} key={idx}>
                                        {time}
                                      </option>
                                    ))}
                                  </BootstrapForm.Control>
                                  <ErrorMessage
                                    name={`legs[${index}].departure_time`}
                                    component="div"
                                    className="text-danger"
                                  />
                                </BootstrapForm.Group>
                              </Col>
                            </Row>
                          </Col>

                          <Col md={6}>
                            <Row>
                              <Col md={6}>
                                <BootstrapForm.Group>
                                  <BootstrapForm.Label>
                                    Arrival Date{" "}
                                    <span className="text-danger">*</span>
                                  </BootstrapForm.Label>
                                  <BootstrapForm.Control
                                    type="date"
                                    name={`legs[${index}].arrival_date_time`}
                                    value={
                                      leg.arrival_date &&
                                        !isNaN(new Date(leg.arrival_date))
                                        ? new Date(leg.arrival_date)
                                          .toISOString()
                                          .split("T")[0]
                                        : ""
                                    }
                                    min={
                                      leg.departure_date &&
                                        !isNaN(new Date(leg.departure_date))
                                        ? new Date(leg.departure_date)
                                          .toISOString()
                                          .split("T")[0]
                                        : new Date().toISOString().split("T")[0]
                                    }
                                    onChange={(e) =>
                                      handleLegChange(leg.id, {
                                        target: {
                                          name: "arrival_date",
                                          value: e.target.value,
                                        },
                                      })
                                    }
                                    placeholder="Select arrival date"
                                    className="py-3"
                                  />
                                  <ErrorMessage
                                    name={`legs[${index}].arrival_date`}
                                    component="div"
                                    className="text-danger"
                                  />
                                </BootstrapForm.Group>
                              </Col>

                              <Col md={6}>
                                <BootstrapForm.Group>
                                  <BootstrapForm.Label>
                                    Arrival Time{" "}
                                    <span className="text-danger">*</span>
                                  </BootstrapForm.Label>
                                  <BootstrapForm.Control
                                    as="select"
                                    name={`legs[${index}].arrival_time`}
                                    value={leg.arrival_time || ""}
                                    onChange={(e) =>
                                      handleLegChange(leg.id, {
                                        target: {
                                          name: "arrival_time",
                                          value: e.target.value,
                                        },
                                      })
                                    }
                                    className="py-3"
                                  >
                                    <option value="">
                                      Select Arrival Time
                                    </option>
                                    {times.map((time, idx) => (
                                      <option value={time} key={idx}>
                                        {time}
                                      </option>
                                    ))}
                                  </BootstrapForm.Control>
                                  <ErrorMessage
                                    name={`legs[${index}].arrival_time`}
                                    component="div"
                                    className="text-danger"
                                  />
                                </BootstrapForm.Group>
                              </Col>
                            </Row>
                          </Col>
                        </Row>

                        <Button
                          variant="danger"
                          className="my-3"
                          size="sm"
                          onClick={() => handleRemoveLeg(leg.id)}
                        >
                          <FaTrash /> Remove
                        </Button>
                      </Card.Body>
                    </Card>
                  ))}

                  <Button
                    variant="primary"
                    className="mt-4"
                    size="sm"
                    onClick={handleAddLeg}
                  >
                    <FaPlus /> Add Another Leg
                  </Button>
                </div>
              )}
            </div>

            <div className="d-flex my-3">
              <Button type="submit">Update Booking Information </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
export default EditBookingStepOne;
