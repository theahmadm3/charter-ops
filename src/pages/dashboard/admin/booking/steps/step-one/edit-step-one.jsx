import { Formik, Form, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import { getAllClientAsync } from "../../../../../../slices/client/clientSlice";
import { getAllPartnershipsAsync } from "../../../../../../slices/config/configSlice";
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
} from "react-bootstrap";

import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import {
  addBookingStepOneAsync,
  setCurrentStep,
} from "../../../../../../slices/booking/bookingSlice";
import { FaPlus, FaTrash } from "react-icons/fa";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import Select from "react-select";
import { toast } from "react-toastify";

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
  const [from_airport, onChangeFrom] = useState(
    props?.data[0]?.return_date
      ? new Date(props?.data[0]?.return_date)
      : new Date()
  );
  const [isChecked, setIsChecked] = useState(false);
  const [legs, setLegs] = useState([
    { from: "", to: "", departure_date_time: "", arrival_date_time: "" },
  ]);

  const handleAddLeg = () => {
    setLegs([
      ...legs,
      { id: Date.now(), from: "", to: "", departure_date: "", return_date: "" },
    ]);
  };

  const handleRemoveLeg = (id) => {
    setLegs(legs.filter((leg) => leg.id !== id));
  };

  const handleLegChange = (id, e) => {
    const { name, value } = e.target;
    setLegs(
      legs.map((leg) => (leg.id === id ? { ...leg, [name]: value } : leg))
    );
  };
  const clientInfo = useSelector((state) => state?.client);
  const configInfo = useSelector((state) => state?.config);
  const bookingInfo = useSelector((state) => state?.booking);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };
  const handleNext = () => {
    const current = bookingInfo?.currentStep;
    dispatch(setCurrentStep(current + 1));
  };

  const handleRemove = (index) => {
    setBookings((prevBookings) => prevBookings.filter((_, i) => i !== index));
  };
  const step = useSelector((state) => state.booking?.currentStep);

  const [toLocationDefaultValue, setToLocationDefaultValue] = useState(null);
  const [fromLocationDefaultValue, setFromLocationDefaultValue] =
    useState(null);

  // useEffect for setting initial value for from_location
  useEffect(() => {
    if (bookingInfo?.addBookingStepOneResponse?.data?.from_location) {
      setFromLocationDefaultValue({
        value: bookingInfo.addBookingStepOneResponse.data.from_location,
        label: bookingInfo.addBookingStepOneResponse.data.from_location,
      });
    }
  }, [bookingInfo?.addBookingStepOneResponse?.data?.from_location]);

  // useEffect for setting initial value for to_location
  useEffect(() => {
    if (bookingInfo?.addBookingStepOneResponse?.data?.to_location) {
      setToLocationDefaultValue({
        value: bookingInfo.addBookingStepOneResponse.data.to_location,
        label: bookingInfo.addBookingStepOneResponse.data.to_location,
      });
    }
  }, [bookingInfo?.addBookingStepOneResponse?.data?.to_location]);

  const handleFormClear = (resetForm) => {
    resetForm();
  };
  useEffect(() => {
    try {
      dispatch(getAllClientAsync());
      dispatch(getAllPartnershipsAsync());
      // dispatch(getAllServicesAsync());
      dispatch(setCurrentStep(0));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const airFrom = props?.data[0]?.from_location
    ? {
        value: props.data[0].from_location,
        label: props.data[0].from_location,
      }
    : null;

  const airTo = props?.data[0]?.to_location
    ? {
        value: props.data[0].to_location,
        label: props.data[0].to_location,
      }
    : null;
  return (
    <>
      <Formik
        initialValues={{
          from_location:
            bookingInfo?.addBookingStepOneResponse?.data?.from_location,
          to_location:
            bookingInfo?.addBookingStepOneResponse?.data?.to_location,
          flight_date:
            bookingInfo?.addBookingStepOneResponse?.data?.flight_date,
          return_date:
            bookingInfo?.addBookingStepOneResponse?.data?.return_date,
          client_id: bookingInfo?.addBookingStepOneResponse?.data?.client_id,
          multi_leg: null,

          service_id: bookingInfo?.addBookingStepOneResponse?.data?.service_id,
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
            service_id: service_id?.value,

            client_id: Number(values.client_id),
            multi_leg: isChecked,
            ...(isChecked &&
              legs && {
                legs: legs.map(({ id, from, to, ...rest }) => ({
                  ...rest,
                  from: from ? from.value : null,
                  to: to ? to.value : null,
                })),
              }),
          };

          dispatch(addBookingStepOneAsync(payload))
            .then((response) => {
              if (response?.payload?.success) {
                const current = bookingInfo?.currentStep;
                dispatch(setCurrentStep(current + 1));
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
                            label: option?.name,
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
                            label: option?.name,
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
                        value={values.flight_time || ""}
                        style={{ maxHeight: "200px", overflowY: "auto" }}
                        onChange={(e) => {
                          setFieldValue("flight_time", e.target.value);
                          setSavedValues((prev) => ({
                            ...prev,
                            flight_time: e.target.value,
                          }));
                        }}
                      >
                        <option value="">Select Flight Time</option>
                        {times.map((time, index) => (
                          <option value={time} key={index}>
                            {time}
                          </option>
                        ))}
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
                        value={
                          values.return_date ||
                          bookingInfo?.addBookingStepOneResponse?.data
                            ?.return_date
                        }
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
                        value={values.return_time || ""}
                        onChange={(e) => {
                          setFieldValue("return_time", e.target.value);
                          setSavedValues((prev) => ({
                            ...prev,
                            return_time: e.target.value,
                          }));
                        }}
                      >
                        <option value="">Select Return Time</option>
                        {times.map((time, index) => (
                          <option value={time} key={index}>
                            {time}
                          </option>
                        ))}
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
                    value={
                      values.client_id ||
                      bookingInfo?.addBookingStepOneResponse?.data?.client_id
                    }
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
                    defaultValue={
                      bookingInfo?.addBookingStepOneResponse?.data
                        ?.service_id ||
                      savedValues.service_id ||
                      bookingInfo?.addBookingStepOneResponse?.data?.service?.id
                    }
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
                    onChange={(selectedOptions) => {
                      setFieldValue("service_id", selectedOptions);

                      setSavedValues((prev) => ({
                        ...prev,
                        service_id: selectedOptions,
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

              {isChecked && (
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
                              {/* <Select
                                defaultValue={
                                  index > 0
                                    ? legs[index - 1].to
                                    : value.to_location?.label
                                } // Use previous leg's destination as default value for next leg's departure
                                options={
                                  Array.isArray(
                                    configInfo?.getAllAirportsResponse
                                  )
                                    ? configInfo.getAllAirportsResponse.map(
                                        (option) => ({
                                          value: option?.name,
                                          label: option?.name,
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
                                onChange={(selectedOptions) =>
                                  handleLegChange(leg.id, {
                                    target: {
                                      name: "from",
                                      value: selectedOptions,
                                    },
                                  })
                                }
                                aria-label="Select Departure Airport"
                              /> */}

                              <Select
                                defaultValue={
                                  index > 0
                                    ? {
                                        value:
                                          legs[index - 1]?.to?.value ||
                                          legs[index - 1]?.to,
                                        label:
                                          legs[index - 1]?.to?.label ||
                                          legs[index - 1]?.to,
                                      }
                                    : {
                                        value: value?.to_location?.value || "",
                                        label:
                                          value?.to_location?.label ||
                                          "Select Departure",
                                      }
                                }
                                options={
                                  Array.isArray(
                                    configInfo?.getAllAirportsResponse
                                  )
                                    ? configInfo.getAllAirportsResponse.map(
                                        (option) => ({
                                          value: option?.name,
                                          label: option?.name,
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
                                  const selectedValue = selectedOption
                                    ? {
                                        value: selectedOption.value,
                                        label: selectedOption.label,
                                      }
                                    : legs[index].from; // Keep the current value if nothing changes

                                  // Only update if the user has selected a new option
                                  setLegs((prevLegs) =>
                                    prevLegs.map((legItem, legIndex) =>
                                      legIndex === index
                                        ? {
                                            ...legItem,
                                            from:
                                              selectedOption ||
                                              legItem.from === null // check if user changed the value
                                                ? selectedValue // update the state only if a new selection is made
                                                : legItem.from ||
                                                  legs[index - 1]?.to, // default to previous leg's to value
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
                                value={leg.to}
                                options={
                                  Array.isArray(
                                    configInfo?.getAllAirportsResponse
                                  )
                                    ? configInfo.getAllAirportsResponse.map(
                                        (option) => ({
                                          value: option?.name,
                                          label: option?.name,
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
                                onChange={(selectedOptions) =>
                                  handleLegChange(leg.id, {
                                    target: {
                                      name: "to",
                                      value: selectedOptions,
                                    },
                                  })
                                }
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
                                      leg.departure_date_time &&
                                      !isNaN(new Date(leg.departure_date_time))
                                        ? new Date(leg.departure_date_time)
                                            .toISOString()
                                            .split("T")[0]
                                        : ""
                                    }
                                    min={
                                      index > 0 &&
                                      legs[index - 1].arrival_date_time
                                        ? new Date(
                                            legs[index - 1].arrival_date_time
                                          )
                                            .toISOString()
                                            .split("T")[0]
                                        : new Date().toISOString().split("T")[0]
                                    }
                                    onChange={(e) =>
                                      handleLegChange(leg.id, {
                                        target: {
                                          name: "departure_date_time",
                                          value: e.target.value,
                                        },
                                      })
                                    }
                                    placeholder="Select departure date"
                                    className="py-3"
                                  />
                                  <ErrorMessage
                                    name={`legs[${index}].departure_date_time`}
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
                                    Return Date{" "}
                                    <span className="text-danger">*</span>
                                  </BootstrapForm.Label>
                                  <BootstrapForm.Control
                                    type="date"
                                    name={`legs[${index}].arrival_date_time`}
                                    value={
                                      leg.arrival_date_time &&
                                      !isNaN(new Date(leg.arrival_date_time))
                                        ? new Date(leg.arrival_date_time)
                                            .toISOString()
                                            .split("T")[0]
                                        : ""
                                    }
                                    min={
                                      leg.departure_date_time &&
                                      !isNaN(new Date(leg.departure_date_time))
                                        ? new Date(leg.departure_date_time)
                                            .toISOString()
                                            .split("T")[0]
                                        : new Date().toISOString().split("T")[0]
                                    }
                                    onChange={(e) =>
                                      handleLegChange(leg.id, {
                                        target: {
                                          name: "arrival_date_time",
                                          value: e.target.value,
                                        },
                                      })
                                    }
                                    placeholder="Select return date"
                                    className="py-3"
                                  />
                                  <ErrorMessage
                                    name={`legs[${index}].arrival_date_time`}
                                    component="div"
                                    className="text-danger"
                                  />
                                </BootstrapForm.Group>
                              </Col>

                              <Col md={6}>
                                <BootstrapForm.Group>
                                  <BootstrapForm.Label>
                                    Return Time{" "}
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
                                    <option value="">Select Return Time</option>
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
