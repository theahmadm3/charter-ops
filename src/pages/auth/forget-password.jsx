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
import { forgetPasswordAsnyc } from "../../slices/auth/authSlice";
import { useDispatch } from "react-redux";

const ForgetPassword = () => {
  const navigate = useNavigate();
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
                    {/* <h5 className="mt-4">Welcome to Flybird ERP Solution</h5> */}
                    <p>Please fill the form below to proceed</p>
                  </div>
                  <div className="mt-5 px-3">
                    <Formik
                      initialValues={{
                        email: "",
                      }}
                      validationSchema={Yup.object().shape({
                        email: Yup.string()
                          .email("Invalid email")
                          .required("Email is required"),
                      })}
                      onSubmit={async (values) => {
                        try {
                          const result = await dispatch(
                            forgetPasswordAsnyc({ values })
                          );

                          if (forgetPasswordAsnyc.fulfilled.match(result)) {
                            // Check if the login was successful
                            navigate("/reset-password");
                          } else {
                            // Handle the case where login was not successful
                            console.error("Login failed:", result.error);
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
                            <FloatingLabel
                              controlId="floatingInput"
                              label="Email Address"
                              className="my-3"
                            >
                              <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                              />
                              {errors.email && touched.email ? (
                                <small className="text-danger">
                                  {errors.email}
                                </small>
                              ) : null}
                            </FloatingLabel>
                          </Form.Group>

                          <div className="my-4">
                            <Link
                              to="/"
                              className=" text-start text-color-2 my-5 text-black"
                            >
                              Login ?{" "}
                            </Link>
                          </div>
                          <div className="d-grid gap-2 mb-5">
                            <Button
                              type="submit"
                              className=" my-4 py-3  border-0  bg-color-2"
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
export default ForgetPassword;
