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
import { addUserAsync } from "../../../../../../slices/user/userSlice";

const PartnerForm = ({ props }) => {
  const dispatch = useDispatch();
  const configInfo = useSelector((state) => state?.config);

  const validationSchema = Yup.object({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    role_id: Yup.string().required("Role is required"),
    partnership_type_id: Yup.string().required(
      "Type of partnership is required"
    ),
  });

  return (
    <Formik
      initialValues={{
        first_name: "",
        last_name: "",
        email: "",
        partnership_type_id: "",
        role_id: "",
        user_type: "partner",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        dispatch(addUserAsync(values))
          .then((response) => {
            if (response?.payload?.success) {
              props.onHide();
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
                  />
                  {errors.email && touched.email ? (
                    <small className="text-danger">{errors.email}</small>
                  ) : null}
                </FloatingLabel>
              </BootstrapForm.Group>
            </Col>
          </Row>
          <Row>
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
          </Row>
          <Row>
            <Col md={12}>
              <BootstrapForm.Group>
                <FloatingLabel
                  controlId="floatingPartnershipTypeId"
                  label="Select Type of Partnership"
                  className="my-2"
                >
                  <BootstrapForm.Control
                    as="select"
                    aria-label="Select type of partnership"
                    name="partnership_type_id"
                    value={values.partnership_type_id}
                    onChange={handleChange}
                  >
                    <option value="">Select Type of Partnership</option>
                    {configInfo?.getAllPartnershipTypesResponse?.data?.map(
                      (type) => (
                        <option value={type.id} key={type.id}>
                          {type?.name}
                        </option>
                      )
                    )}
                  </BootstrapForm.Control>
                  {errors.partnership_type_id && touched.partnership_type_id ? (
                    <small className="text-danger">
                      {errors.partnership_type_id}
                    </small>
                  ) : null}
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

export default PartnerForm;
