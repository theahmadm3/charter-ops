import { Modal, Button, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import * as Yup from "yup";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { updateAircraftMaintenanceOrgAsync } from "../../../../../../slices/amo/amoSlice";

function EditAmo(props) {
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
            Update Aircraft Maintenance Organization
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              name: props?.data[0]?.name,
              contact_email: props?.data[0]?.contact_email,
              contact_phone: props?.data[0]?.contact_phone,
              address: props?.data[0]?.address,
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string()
                .required("AMO name is required")
                .min(3, "AMO name must be at least 3 characters"),
              contact_email: Yup.string()
                .email("Invalid email address")
                .required("Contact email is required"),
              contact_phone: Yup.string()
                .required("Contact phone is required")
                .matches(
                  /^\+?[0-9\s-]{7,15}$/,
                  "Contact phone must be a valid phone number"
                ),
              address: Yup.string().required("Address is required"),
            })}
            onSubmit={(values) => {
              dispatch(
                updateAircraftMaintenanceOrgAsync({
                  id: props?.data[0]?.id,
                  values: values,
                })
              )
                .then((response) => {
                  if (response.payload) {
                    props.onHide();
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
                        controlId="floatingName"
                        label="AMO Name"
                        className="my-2"
                      >
                        <Form.Control
                          type="text"
                          placeholder="AMO Name"
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                          isInvalid={touched.name && !!errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <FloatingLabel
                        controlId="floatingEmail"
                        label="Contact Email"
                        className="my-2"
                      >
                        <Form.Control
                          type="email"
                          placeholder="Contact Email"
                          name="contact_email"
                          value={values.contact_email}
                          onChange={handleChange}
                          isInvalid={
                            touched.contact_email && !!errors.contact_email
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.contact_email}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <FloatingLabel
                        controlId="floatingPhone"
                        label="Contact Phone"
                        className="my-2"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Contact Phone"
                          name="contact_phone"
                          value={values.contact_phone}
                          onChange={handleChange}
                          isInvalid={
                            touched.contact_phone && !!errors.contact_phone
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.contact_phone}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <FloatingLabel
                        controlId="floatingAddress"
                        label="Address"
                        className="my-2"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Address"
                          name="address"
                          value={values.address}
                          onChange={handleChange}
                          isInvalid={touched.address && !!errors.address}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.address}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="">
                  <Button
                    type="submit"
                    variant="success"
                    className="my-2 me-3 border-0"
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
export default EditAmo;
