import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  Row,
  InputGroup,
} from "react-bootstrap";
import logo from "../../assets/images/flybird-logo.png";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { loginAsync } from "../../slices/auth/authSlice";
import { useDispatch } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <>
      <Container fluid className="login-container">
        <Row style={{ overflowY: "auto" }}>
          <Col md={7}></Col>
          <Col md={4} className="align-items-center justify-content-center">
            <div className="mt-5">
              <Card className="shadow border-0 login-form-container p-5 tw-backdrop-blur-sm tw-bg-white/5 tw-border-b tw-border-white/10 tw-shadow-sm"
                style={{ background: 'linear-gradient(to bottom, rgba(135, 206, 235, 0.7), rgba(70, 130, 180, 0.8))' }}>
                <Card.Body>
                  <div className="text-center mb-4">
                    <div className="skyops-logo">
                      <span className="sky">Charter</span> <span className="ops">O<span className="cloud"></span>ps</span>
                    </div>
                    <h5 className="mt-4">Welcome to Charter Ops</h5>

                  </div>
                  <div className="mt-5 px-3">
                    <Formik
                      initialValues={{
                        email: "",
                        password: "",
                      }}
                      validationSchema={Yup.object().shape({
                        email: Yup.string()
                          .email("Invalid email")
                          .required("Email is required"),
                        password: Yup.string()
                          .required("No password provided.")
                          .min(
                            6,
                            "Password is too short - should be 6 chars minimum."
                          ),
                      })}
                      onSubmit={async (values) => {
                        try {
                          const result = await dispatch(
                            loginAsync({ credentials: values })
                          );

                          if (loginAsync.fulfilled.match(result)) {
                            if (result?.payload?.data?.user?.first_login) {
                              window.location.href = "/first-time-login";
                            } else {
                              // navigate("/admin-dashboard");
                              window.location.href = "/admin-dashboard";
                            }
                            // Check if the login was successful
                          } else {
                            // Handle the case where login was not successful
                            console.error("Login failed:", result);
                          }
                        } catch (error) {
                          console.error(
                            "An error occurred during login:",
                            error
                          );
                        }
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
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                              className="p-3"
                              type="email"
                              placeholder="Enter your email"
                              name="email"
                              value={values.email}
                              onChange={handleChange}
                              isInvalid={touched.email && errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.email}
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group className="my-4">
                            <Form.Label>Password</Form.Label>
                            <InputGroup className="border-left-0">
                              <Form.Control
                                placeholder="Enter your password"
                                name="password"
                                value={values.password}
                                className="p-3 password-input"
                                onChange={handleChange}
                                type={showPassword ? "text" : "password"}
                                isInvalid={touched.password && errors.password}
                              />
                              <Button
                                variant="outline-secondary"
                                onClick={toggleShowPassword}
                                className="border-left-0  "
                              >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                              </Button>
                              <Form.Control.Feedback type="invalid">
                                {errors.password}
                              </Form.Control.Feedback>
                            </InputGroup>
                          </Form.Group>
                          <Form.Group className="my-4">
                            <Form.Check
                              type="checkbox"
                              label="Remember Me"
                              checked={rememberMe}
                              onChange={() => setRememberMe(!rememberMe)}
                            />
                          </Form.Group>
                          <div className="my-4">
                            <Link
                              to="/forget-password"
                              className="text-start text-color-2 my-5 text-black"
                            >
                              Forgot your Password?{" "}
                            </Link>
                          </div>
                          <div className="d-grid gap-2 mb-5">
                            <Button
                              type="submit"
                              className="my-4 py-3 border-0 bg-color-2"
                              variant="secondary"
                            >
                              <span className="text-center fw-bold">Login</span>
                            </Button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                  <div className="text-center">
                    <span className="text-muted">
                      {`Don't have an account? `}
                      <Link to="/signup" className="text-color-2">
                        Sign Up
                      </Link>
                    </span>
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
export default Login;
