import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  FloatingLabel,
  Image,
} from "react-bootstrap";
import * as Yup from "yup";
import { Formik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AddService(props) {
  const [imageUrl, setImageUrl] = useState(null);
  const [profilePic, setProfilePic] = useState();
  const roles = useSelector((state) => state.settings.getAllRolesResponse);
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
            Add New User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              service_name: "",
              rate_type: "",
              charge_rate: "",
              currency: "",
              remarks: "",
            }}
            validationSchema={Yup.object().shape({
              first_name: Yup.string().required("First name is required"),
              last_name: Yup.string().required("Last name is required"),
              email: Yup.string().required("Email is required"),
              phone_number: Yup.string().required("Phone number is required"),
              address: Yup.string().required("Address is required"),
              role: Yup.string().required("Role is required"),
            })}
            onSubmit={(values) => {
              dispatch(addUserAsync(values));
              props.closeAddModal();
            }}
            validateOnChange
            validateOnBlur
            validateOnSubmit
          >
            {({
              errors,
              touched,
              handleSubmit,
              isSubmitting,
              values,
              handleChange,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="First name"
                        className="my-2"
                      >
                        <Form.Control
                          type="text"
                          placeholder="First name"
                          name="first_name"
                          value={values.first_name}
                          onChange={handleChange}
                        />
                        {errors.first_name && touched.first_name ? (
                          <small className="text-danger">
                            {errors.first_name}
                          </small>
                        ) : null}
                      </FloatingLabel>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Last name"
                        className="my-2"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Last name"
                          name="last_name"
                          value={values.last_name}
                          onChange={handleChange}
                        />
                        {errors.last_name && touched.last_name ? (
                          <small className="text-danger">
                            {errors.last_name}
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
                        label="Email"
                        className="my-2"
                      >
                        <Form.Control
                          type="email"
                          placeholder="Email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                        />
                        {errors.email && touched.email ? (
                          <small className="text-danger">{errors.email}</small>
                        ) : null}
                      </FloatingLabel>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Address"
                        className="my-2"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Address"
                          name="address"
                          value={values.address}
                          onChange={handleChange}
                        />
                        {errors.address && touched.address ? (
                          <small className="text-danger">
                            {errors.address}
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
                        label="Role"
                        className="my-2"
                      >
                        <Form.Select
                          aria-label="Floating label select example"
                          name="role"
                          value={values.role}
                          onChange={handleChange}
                        >
                          <option>Select Role</option>
                          {roles?.data?.map((role, index) => (
                            <option key={index} value={role.name}>
                              {role.name}
                            </option>
                          ))}
                        </Form.Select>
                        {errors.role && touched.role ? (
                          <small className="text-danger">{errors.role}</small>
                        ) : null}
                      </FloatingLabel>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Phone Number"
                        className="my-2"
                      >
                        <Form.Control
                          type="tel"
                          placeholder="Phone"
                          name="phone_number"
                          value={values.phone_number}
                          onChange={handleChange}
                        />
                        {errors.phone_number && touched.phone_number ? (
                          <small className="text-danger">
                            {errors.phone_number}
                          </small>
                        ) : null}
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="">
                  <Button
                    type="submit"
                    variant="success"
                    className=" my-2 me-3  border-0  "
                  >
                    <span className=" ">Create</span>
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
export default AddService;
