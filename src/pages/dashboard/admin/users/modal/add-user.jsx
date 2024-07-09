import { Modal, Button, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import * as Yup from "yup";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { addUserAsync } from "../../../../../slices/user/userSlice";

function AddUser(props) {
  const dispatch = useDispatch();
  const rolesInfo = useSelector((state) => state?.config?.getAllRoleResponse);
  console.log("config", rolesInfo);
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
              first_name: "",
              middle_name: "",
              last_name: "",
              phone: "",
              gender: "",
              address: "",
              email: "",
              role_id: "",
            }}
            validationSchema={Yup.object().shape({
              first_name: Yup.string()
                .required("First name is required")
                .min(3, "The first name must be at least 3 characters"),
              // middle_name: Yup.string().required("Middle name is required"),
              last_name: Yup.string().required("Last name is required"),
              phone: Yup.string()
                .required("Phone number is required")
                .matches(
                  /^\+\d{1,3} \(\d{3}\) \d{3}-\d{4}$/,
                  "Phone number must be in the format +X (XXX) XXX-XXXX"
                ),
              gender: Yup.string()
                .required("Gender is required")
                .oneOf(["male", "female", "other"], "Invalid gender"),
              address: Yup.string()
                .required("Address is required")
                .min(5, "The address must be at least 5 characters"),
              email: Yup.string()
                .required("Email is required")
                .email("Invalid email address"),
              role_id: Yup.number()
                .required("Role is required")
                .integer("Role ID must be an integer"),
            })}
            onSubmit={(values) => {
              dispatch(addUserAsync(values))
                .then((response) => {
                  if (response) {
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
            {({ errors, touched, handleSubmit, values, handleChange }) => (
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <FloatingLabel
                        controlId="floatingFirstName"
                        label="First Name"
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
                        controlId="floatingMiddleName"
                        label="Middle Name"
                        className="my-2"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Middle name"
                          name="middle_name"
                          value={values.middle_name}
                          onChange={handleChange}
                        />
                        {errors.middle_name && touched.middle_name ? (
                          <small className="text-danger">
                            {errors.middle_name}
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
                        controlId="floatingLastName"
                        label="Last Name"
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

                  <Col md={6}>
                    <Form.Group>
                      <FloatingLabel
                        controlId="floatingPhone"
                        label="Phone Number"
                        className="my-2"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Phone number"
                          name="phone"
                          value={values.phone}
                          onChange={handleChange}
                        />
                        {errors.phone && touched.phone ? (
                          <small className="text-danger">{errors.phone}</small>
                        ) : null}
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <FloatingLabel
                        controlId="floatingGender"
                        label="Gender"
                        className="my-2"
                      >
                        <Form.Select
                          aria-label="Floating label select example"
                          name="gender"
                          value={values.gender}
                          onChange={handleChange}
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </Form.Select>
                        {errors.gender && touched.gender ? (
                          <small className="text-danger">{errors.gender}</small>
                        ) : null}
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
                        controlId="floatingEmail"
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
                        controlId="floatingRoleId"
                        label="Role ID"
                        className="my-2"
                      >
                        <Form.Select
                          aria-label="Floating label select example"
                          name="role_id"
                          value={values.role_id}
                          onChange={handleChange}
                        >
                          <option value="">Select Gender</option>

                          {rolesInfo?.data?.map((role) => (
                            <option value={role.id} key={role.id}>
                              {role.role_name}
                            </option>
                          ))}
                        </Form.Select>

                        {errors.role_id && touched.role_id ? (
                          <small className="text-danger">
                            {errors.role_id}
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
export default AddUser;
