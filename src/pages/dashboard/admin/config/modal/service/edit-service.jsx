import { Modal, Button, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import * as Yup from "yup";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { updateServiceAsync } from "../../../../../../slices/config/configSlice";

function EditService(props) {
  const dispatch = useDispatch();

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Service
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              service_name: props?.data[0]?.service_name,
              rate_type: props?.data[0]?.rate_type,
              charge_rate: props?.data[0]?.charge_rate,
              currency: props?.data[0]?.currency,
              remarks: props?.data[0]?.remarks,
            }}
            validationSchema={Yup.object().shape({
              service_name: Yup.string()
                .required("Service name is required")
                .min(3, "The service name must be at least 3 characters"),
              rate_type: Yup.string().required("Rate type is required"),
              charge_rate: Yup.string().required("Charge rate is required"),
              currency: Yup.string().required("Currency is required"),
            })}
            onSubmit={(values) => {
              dispatch(
                updateServiceAsync({ id: props?.data[0]?.id, values: values })
              )
                .then((response) => {
                  if (response.payload && !response.error) {
                    props.onHide();
                  } else {
                    console.log("Error please try again");
                  }
                })
                .catch((error) => {
                  // Handle the error case if necessary
                  console.error("Error occurred:", error);
                });
            }}
            validateOnChange
            validateOnBlur
            validateOnSubmit
          >
            {({
              errors,
              touched,
              handleSubmit,
              values,
              handleChange,
              dirty,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Service name"
                        className="my-2"
                      >
                        <Form.Control
                          type="text"
                          placeholder="service name"
                          name="service_name"
                          value={values.service_name}
                          onChange={handleChange}
                        />
                        {errors.service_name && touched.service_name ? (
                          <small className="text-danger">
                            {errors.service_name}
                          </small>
                        ) : null}
                      </FloatingLabel>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Rate Type"
                        className="my-2"
                      >
                        <Form.Select
                          aria-label="Floating label select example"
                          name="rate_type"
                          value={values.rate_type}
                          onChange={handleChange}
                        >
                          <option value="">Select Rate Type</option>
                          <option value="Flat rate">Flat rate</option>
                          <option value="Hourly rate">Hourly rate</option>
                        </Form.Select>
                        {errors.rate_type && touched.rate_type ? (
                          <small className="text-danger">
                            {errors.rate_type}
                          </small>
                        ) : null}
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Charge rate"
                        className="my-2"
                      >
                        <Form.Control
                          type="number"
                          placeholder="charge rate"
                          name="charge_rate"
                          value={values.charge_rate}
                          onChange={handleChange}
                        />
                        {errors.charge_rate && touched.charge_rate ? (
                          <small className="text-danger">
                            {errors.charge_rate}
                          </small>
                        ) : null}
                      </FloatingLabel>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Currency"
                        className="my-2"
                      >
                        <Form.Select
                          aria-label="Floating label select example"
                          name="currency"
                          value={values.currency}
                          onChange={handleChange}
                        >
                          <option value="">Select Currency</option>
                          <option value="Naira">Naira</option>
                          <option value="Dollar">Dollar</option>
                        </Form.Select>
                        {errors.currency && touched.currency ? (
                          <small className="text-danger">
                            {errors.currency}
                          </small>
                        ) : null}
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={12}>
                    <Form.Group>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Remarks"
                        className="my-2"
                      >
                        <Form.Control
                          as="textarea"
                          style={{ height: "100px" }}
                          name="remarks"
                          value={values.remarks}
                          onChange={handleChange}
                        />
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="">
                  <Button
                    type="submit"
                    variant="success"
                    className=" my-2 me-3  border-0  "
                    disabled={!dirty}
                  >
                    <span className=" ">Update</span>
                  </Button>
                  <Button onClick={props.onHide} variant="danger">
                    Close
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}
export default EditService;
