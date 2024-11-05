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
import { firstTimeLoginAsync } from "../../slices/auth/authSlice";
import { toast } from "react-toastify";

const FirstTimeLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = localStorage.getItem("user");
  let loginUser = null;

  if (user) {
    try {
      loginUser = JSON.parse(user);
    } catch (error) {
      console.error("Error parsing 'user' from localStorage:", error);
    }
  }
  return (
    <>
      <Container fluid className="login-container">
        <Row>
          <Col md={7}></Col>
          <Col
            md={4}
            className="d-flex align-items-center justify-content-center"
          >
            <div className="">
              <Card className="shadow border-0 login-form-conatainer p-5">
                <Card.Body>
                  <div className="text-center">
                    <Image src={logo} width={140} />
                    <h5 className="mt-4">Welcome</h5>
                    <p>Please fill the form below to proceed</p>
                  </div>
                  <div className="mt-5 px-3">
                    <Formik
                      initialValues={{
                        password: "",
                        confirm_password: "",
                        email: loginUser?.email,
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
                      onSubmit={async (values) => {
                        try {
                          const result = await dispatch(
                            firstTimeLoginAsync({ credentials: values })
                          );

                          if (firstTimeLoginAsync.fulfilled.match(result)) {
                            // Check if the login was successful
                            navigate("/");
                          } else {
                            // Handle the case where login was not successful
                            toast.error("Process failed:", result.error);
                          }
                        } catch (error) {
                          console.error(
                            "An error occurred during reset:",
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
                            <FloatingLabel
                              controlId="floatingInput"
                              label="Email"
                              className="my-3"
                            >
                              <Form.Control
                                disabled
                                placeholder="Enter your email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                // className="p-3 password-input"
                                type="email"
                              />
                              {/* {errors.token && touched.token ? (
                                <small className="text-danger">
                                  {errors.token}
                                </small>
                              ) : null} */}
                            </FloatingLabel>
                          </Form.Group>
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
                                // className="p-3 password-input"
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
                                // className="p-3 password-input"
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
                              className=" my-4 py-3  border-0  bg-color-2"
                            >
                              <span className="text-center fw-bold">Set</span>
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
export default FirstTimeLogin;
