import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Row,
  Col,
  FloatingLabel,
  Form as BootstrapForm,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserAsync,
  updateUserAsync,
} from "../../../../../../slices/user/userSlice";

const EditCrewForm = ({ onHide, data }) => {
  const dispatch = useDispatch();
  const configInfo = useSelector((state) => state?.config);

  const validationSchema = Yup.object({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone_number: Yup.string().required("Phone number is required"),
  });

  return (
    <Formik
      initialValues={{
        first_name: data?.data[0].first_name,
        last_name: data?.data[0].last_name,
        email: data?.data[0].email,
        designation: data?.data[0].department_id,
        user_type: "crew",
        phone_number: data?.data[0].phone_number,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        dispatch(updateUserAsync({ id: data?.data[0].id, values: values }))
          .then((response) => {
            if (response?.payload?.success) {
              data?.onHide();
            } else {
              console.log("Error please try again");
            }
          })
          .catch((error) => {
            console.error("Error occurred:", error);
          });
      }}
    >
      {({ errors, touched, handleSubmit, values, handleChange }) => (
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={12}>
              <BootstrapForm.Group>
                <FloatingLabel
                  controlId="floatingFullName"
                  label="Enter first name"
                  className="my-2"
                >
                  <BootstrapForm.Control
                    type="text"
                    placeholder="First name"
                    name="first_name"
                    value={values.first_name}
                    onChange={handleChange}
                  />
                  {errors.first_name && touched.first_name ? (
                    <small className="text-danger">{errors.first_name}</small>
                  ) : null}
                </FloatingLabel>
              </BootstrapForm.Group>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <BootstrapForm.Group>
                <FloatingLabel
                  controlId="floatingFullName"
                  label="Enter last name"
                  className="my-2"
                >
                  <BootstrapForm.Control
                    type="text"
                    placeholder="last name"
                    name="last_name"
                    value={values.last_name}
                    onChange={handleChange}
                  />
                  {errors.last_name && touched.last_name ? (
                    <small className="text-danger">{errors.last_name}</small>
                  ) : null}
                </FloatingLabel>
              </BootstrapForm.Group>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <BootstrapForm.Group>
                <FloatingLabel
                  controlId="floatingFullName"
                  label="Enter phone number"
                  className="my-2"
                >
                  <BootstrapForm.Control
                    type="tel"
                    placeholder="phone number"
                    name="phone_number"
                    value={values.phone_number}
                    onChange={handleChange}
                  />
                  {errors.phone_number && touched.phone_number ? (
                    <small className="text-danger">{errors.phone_number}</small>
                  ) : null}
                </FloatingLabel>
              </BootstrapForm.Group>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <BootstrapForm.Group>
                <FloatingLabel
                  controlId="floatingEmail"
                  label="Email"
                  className="my-2"
                >
                  <BootstrapForm.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    disabled
                  />
                  {errors.email && touched.email ? (
                    <small className="text-danger">{errors.email}</small>
                  ) : null}
                </FloatingLabel>
              </BootstrapForm.Group>
            </Col>
          </Row>

          {/* <Row>
            <Col md={12}>
              <BootstrapForm.Group>
                <FloatingLabel
                  controlId="floatingRoleId"
                  label="Select Role"
                  className="my-2"
                >
                  <BootstrapForm.Control
                    as="select"
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
                    ))}{" "}
                  </BootstrapForm.Control>
                  {errors.role_id && touched.role_id ? (
                    <small className="text-danger">{errors.role_id}</small>
                  ) : null}
                </FloatingLabel>
              </BootstrapForm.Group>
            </Col>
          </Row> */}
          <Row>
            <Col md={12}>
              <BootstrapForm.Group>
                <FloatingLabel
                  controlId="floatingDesignation"
                  label="Designation"
                  className="my-2"
                >
                  <BootstrapForm.Control
                    as="select"
                    aria-label="Select designation"
                    name="designation"
                    value={values.designation}
                    onChange={handleChange}
                  >
                    <option value="">Select Designation</option>
                    <option value="Captain">Captain</option>
                    <option value="Senior first officer">
                      Senior first officer
                    </option>
                    <option value="First Officer">First officer</option>
                    <option value="Cabin executive">Cabin executive</option>
                  </BootstrapForm.Control>
                </FloatingLabel>
              </BootstrapForm.Group>
            </Col>
          </Row>
          <div className="d-flex justify-content-end mt-3">
            <Button type="submit">Save</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EditCrewForm;
