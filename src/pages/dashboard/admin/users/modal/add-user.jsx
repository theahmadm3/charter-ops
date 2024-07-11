import { Modal, Button, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import * as Yup from "yup";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { addUserAsync } from "../../../../../slices/user/userSlice";

function StaffForm({ values, handleChange, errors, touched, configInfo }) {
  return (
    <>
      <Row>
        <Col md={6}>
          <Form.Group>
            <FloatingLabel
              controlId="floatingRoleId"
              label="Select Role"
              className="my-2"
            >
              <Form.Select
                aria-label="Select role"
                name="role_id"
                value={values.role_id}
                onChange={handleChange}
              >
                <option value="">Select Role</option>
                {configInfo?.getAllRoleResponse?.data?.map((role) => (
                  <option value={role.id} key={role.id}>
                    {role?.role_name}
                  </option>
                ))}
              </Form.Select>
              {errors.role_id && touched.role_id ? (
                <small className="text-danger">{errors.role_id}</small>
              ) : null}
            </FloatingLabel>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group>
            <FloatingLabel
              controlId="floatingDepartmentId"
              label="Select Department"
              className="my-2"
            >
              <Form.Select
                aria-label="Select department"
                name="department_id"
                value={values.department_id}
                onChange={handleChange}
              >
                <option value="">Select Department</option>
                {configInfo?.getAllDepartmentsResponse?.data?.map(
                  (department) => (
                    <option value={department.id} key={department.id}>
                      {department?.name}
                    </option>
                  )
                )}
              </Form.Select>
              {errors.department_id && touched.department_id ? (
                <small className="text-danger">{errors.department_id}</small>
              ) : null}
            </FloatingLabel>
          </Form.Group>
        </Col>
      </Row>
    </>
  );
}

function PartnerForm({ values, handleChange, errors, touched, configInfo }) {
  return (
    <Row>
      <Col md={12}>
        <Form.Group>
          <FloatingLabel
            controlId="floatingPartnershipTypeId"
            label="Select type of partnership"
            className="my-2"
          >
            <Form.Select
              aria-label="Select type of partnership"
              name="partnership_type_id"
              value={values.partnership_type_id}
              onChange={handleChange}
            >
              <option value="">Select Type of Partnership</option>
              {configInfo?.getAllPartnershipTypesResponse?.data?.map((type) => (
                <option value={type.id} key={type.id}>
                  {type?.name}
                </option>
              ))}
            </Form.Select>
            {errors.partnership_type_id && touched.partnership_type_id ? (
              <small className="text-danger">
                {errors.partnership_type_id}
              </small>
            ) : null}
          </FloatingLabel>
        </Form.Group>
      </Col>
    </Row>
  );
}

function CrewForm({ values, handleChange, errors, touched }) {
  return (
    <Row>
      <Col md={12}>
        <Form.Group>
          <FloatingLabel
            controlId="floatingDesignation"
            label="Designation"
            className="my-2"
          >
            <Form.Control
              type="text"
              placeholder="Designation"
              name="designation"
              value={values.designation}
              onChange={handleChange}
            />
            {errors.designation && touched.designation ? (
              <small className="text-danger">{errors.designation}</small>
            ) : null}
          </FloatingLabel>
        </Form.Group>
      </Col>
    </Row>
  );
}

function AddUser(props) {
  const dispatch = useDispatch();
  const configInfo = useSelector((state) => state?.config);

  const validationSchema = Yup.object().shape({
    user_type: Yup.string().required("User type is required"),
    full_name: Yup.string()
      .required("Full name is required")
      .matches(/^[a-zA-Z0-9\s]+$/, "Only alphanumeric characters are allowed"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    role_id: Yup.number()
      .nullable()
      .when("user_type", {
        is: (value) => value === "Staff",
        then: Yup.number().required("Role is required"),
        otherwise: Yup.number().nullable(),
      }),
    department_id: Yup.number()
      .nullable()
      .when("user_type", {
        is: (value) => value === "Staff",
        then: Yup.number().required("Department is required"),
        otherwise: Yup.number().nullable(),
      }),
    partnership_type_id: Yup.number()
      .nullable()
      .when("user_type", {
        is: (value) => value === "Partner",
        then: Yup.number().required("Type of partnership is required"),
        otherwise: Yup.number().nullable(),
      }),
    designation: Yup.string()
      .nullable()
      .when("user_type", {
        is: (value) => value === "Crew",
        then: Yup.string().required("Designation is required"),
        otherwise: Yup.string().nullable(),
      }),
  });

  return (
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
            user_type: "",
            phone: "",
            gender: "",
            address: "",
            email: "",
            role_id: null,
            department_id: null,
            partnership_type_id: null,
            designation: "",
            password: "",
            status: true,
          }}
          validationSchema={validationSchema}
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
            setFieldValue,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={12}>
                  <Form.Group>
                    <FloatingLabel
                      controlId="floatingUserType"
                      label="Type of User"
                      className="my-2"
                    >
                      <Form.Select
                        aria-label="Select user type"
                        name="user_type"
                        value={values.user_type}
                        onChange={(e) => {
                          handleChange(e);
                          setFieldValue("role_id", null);
                          setFieldValue("department_id", null);
                          setFieldValue("partnership_type_id", null);
                          setFieldValue("designation", "");
                        }}
                      >
                        <option value="">Select Type of User</option>
                        <option value="Staff">Staff</option>
                        <option value="Partner">Partner</option>
                        <option value="Crew">Crew</option>
                      </Form.Select>
                      {errors.user_type && touched.user_type ? (
                        <small className="text-danger">
                          {errors.user_type}
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
                      controlId="floatingFullName"
                      label="Enter full name"
                      className="my-2"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Full name"
                        name="full_name"
                        value={values.full_name}
                        onChange={handleChange}
                      />
                      {errors.full_name && touched.full_name ? (
                        <small className="text-danger">
                          {errors.full_name}
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
              </Row>

              {values.user_type === "Staff" && (
                <StaffForm
                  values={values}
                  handleChange={handleChange}
                  errors={errors}
                  touched={touched}
                  configInfo={configInfo}
                />
              )}

              {values.user_type === "Partner" && (
                <PartnerForm
                  values={values}
                  handleChange={handleChange}
                  errors={errors}
                  touched={touched}
                  configInfo={configInfo}
                />
              )}

              {values.user_type === "Crew" && (
                <CrewForm
                  values={values}
                  handleChange={handleChange}
                  errors={errors}
                  touched={touched}
                />
              )}

              <div className="d-flex justify-content-end mt-3">
                <Button type="submit">Save</Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}

export default AddUser;
