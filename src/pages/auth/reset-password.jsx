import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Image,
  Row,
} from "react-bootstrap";
import logo from "../../assets/images/flybird-logo.png";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const ResetPassword = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      <Container fluid className="login-container">
        <Row>
          <Col md={7}></Col>
          <Col
            md={4}
            className="d-flex align-items-center justify-content-center"
          >
            <div className="mt-5 ">
              <Card className="shadow border-0 login-form-conatainer p-5">
                <Card.Body>
                  <div className="text-center my-4">
                    <Image src={logo} width={140} />
                    <h5 className="mt-4">Welcome</h5>
                    <p>Please fill the form below to proceed</p>
                  </div>
                  <div className="mt-5 px-3">
                    <Formik
                      initialValues={{
                        password: "",
                        confirm_password: "",
                      }}
                      validationSchema={Yup.object().shape({
                        password: Yup.string()
                          .required("No password provided.")
                          .min(
                            6,
                            "Password is too short - should be 6 chars minimum."
                          ),
                        confirm_password: Yup.string()
                          .oneOf(
                            [Yup.ref("password"), null],
                            "Passwords do not match"
                          )
                          .required("Please confirm password."),
                      })}
                      onSubmit={(values) => {
                        dispatch(loginAsync({ credentials: values }));
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
                      }) => (
                        <Form onSubmit={handleSubmit}>
                          <Form.Group className="my-4">
                            <FloatingLabel
                              controlId="floatingInput"
                              label="Password"
                              className="my-3"
                            >
                              <Form.Control
                                placeholder="Enter your password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                className="p-3 password-input"
                                type="password"
                              />
                              {errors.password && touched.password ? (
                                <small className="text-danger">
                                  {errors.password}
                                </small>
                              ) : null}
                            </FloatingLabel>
                          </Form.Group>

                          <Form.Group>
                            <FloatingLabel
                              controlId="floatingInput"
                              label="Confirm Password"
                              className="my-3"
                            >
                              <Form.Control
                                placeholder="Confirm your password"
                                name="confirm_password"
                                value={values.confirm_password}
                                onChange={handleChange}
                                className="p-3 password-input"
                                type="password"
                              />
                              {errors.confirm_password &&
                              touched.confirm_password ? (
                                <small className="text-danger">
                                  {errors.confirm_password}
                                </small>
                              ) : null}
                            </FloatingLabel>
                          </Form.Group>

                          <div className="my-4">
                            <Link to="/" className="">
                              Already have an account?{" "}
                              <span className=" fw-bold">Login</span>
                            </Link>
                          </div>
                          <div className="d-grid gap-2 mb-5">
                            <Button
                              type="submit"
                              className=" my-4 py-3  border-0  bg-color-1"
                            >
                              <span className="text-center fw-bold">
                                Submit
                              </span>
                            </Button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default ResetPassword;
