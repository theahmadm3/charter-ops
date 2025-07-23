import React, { useState } from "react";
import {
	Button,
	Card,
	Col,
	Container,
	Form,
	Row,
	InputGroup,
	Dropdown,
} from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const toggleShowPassword = () => setShowPassword(!showPassword);
	const toggleShowConfirmPassword = () =>
		setShowConfirmPassword(!showConfirmPassword);

	const companySizes = [
		{ value: "small", label: "Small Charter (1-5)" },
		{ value: "medium", label: "Medium Size (6-20)" },
		{ value: "large", label: "Large Size (20+)" },
	];

	return (
		<>
			<Container fluid className="login-container">
				<Row style={{ overflowY: "auto" }}>
					<Col md={7}></Col>
					<Col md={4} className="align-items-center justify-content-center">
						<div className="mt-5">
							<Card
								className="shadow border-0 login-form-container p-5 tw-backdrop-blur-sm tw-bg-white/5 tw-border-b tw-border-white/10 tw-shadow-sm"
								style={{
									background:
										"linear-gradient(to bottom, rgba(135, 206, 235, 0.7), rgba(70, 130, 180, 0.8))",
								}}
							>
								<Card.Body>
									<div className="text-center mb-4">
										<div className="skyops-logo">
											<span className="sky">Charter</span>{" "}
											<span className="ops">
												O<span className="cloud"></span>ps
											</span>
										</div>
										<h5 className="mt-4">Create Your Account</h5>
										<p className="text-muted">Join Charter Ops today</p>
									</div>
									<div className="mt-3 px-3">
										<Formik
											initialValues={{
												fullName: "",
												companyName: "",
												email: "",
												companySize: "",
												password: "",
												confirmPassword: "",
											}}
											validationSchema={Yup.object().shape({
												fullName: Yup.string().required(
													"Full name is required",
												),
												companyName: Yup.string().required(
													"Company name is required",
												),
												email: Yup.string()
													.email("Invalid email")
													.required("Email is required"),
												companySize: Yup.string().required(
													"Company size is required",
												),
												password: Yup.string()
													.required("Password is required")
													.min(8, "Password must be at least 8 characters"),
												confirmPassword: Yup.string()
													.oneOf(
														[Yup.ref("password"), null],
														"Passwords must match",
													)
													.required("Please confirm your password"),
											})}
											onSubmit={(values, { setSubmitting }) => {
												console.log("Signup values:", values);
												// Add your signup logic here
												setSubmitting(false);
											}}
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
													<Form.Group className="mb-3">
														<Form.Label>Full Name</Form.Label>
														<Form.Control
															className="p-3"
															type="text"
															placeholder="Enter your full name"
															name="fullName"
															value={values.fullName}
															onChange={handleChange}
															isInvalid={touched.fullName && errors.fullName}
														/>
														<Form.Control.Feedback type="invalid">
															{errors.fullName}
														</Form.Control.Feedback>
													</Form.Group>

													<Form.Group className="mb-3">
														<Form.Label>Company Name</Form.Label>
														<Form.Control
															className="p-3"
															type="text"
															placeholder="Enter your company name"
															name="companyName"
															value={values.companyName}
															onChange={handleChange}
															isInvalid={
																touched.companyName && errors.companyName
															}
														/>
														<Form.Control.Feedback type="invalid">
															{errors.companyName}
														</Form.Control.Feedback>
													</Form.Group>

													<Form.Group className="mb-3">
														<Form.Label>Email</Form.Label>
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

													<Form.Group className="mb-3">
														<Form.Label>Company Size</Form.Label>
														<Form.Select
															className="p-3"
															name="companySize"
															value={values.companySize}
															onChange={handleChange}
															isInvalid={
																touched.companySize && errors.companySize
															}
														>
															<option value="">Select company size</option>
															{companySizes.map((size) => (
																<option key={size.value} value={size.value}>
																	{size.label}
																</option>
															))}
														</Form.Select>
														<Form.Control.Feedback type="invalid">
															{errors.companySize}
														</Form.Control.Feedback>
													</Form.Group>

													<Form.Group className="mb-3">
														<Form.Label>Password</Form.Label>
														<InputGroup>
															<Form.Control
																placeholder="Create password"
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
															>
																{showPassword ? <FaEyeSlash /> : <FaEye />}
															</Button>
															<Form.Control.Feedback type="invalid">
																{errors.password}
															</Form.Control.Feedback>
														</InputGroup>
														<Form.Text className="text-muted">
															Must be at least 8 characters
														</Form.Text>
													</Form.Group>

													<Form.Group className="mb-4">
														<Form.Label>Confirm Password</Form.Label>
														<InputGroup>
															<Form.Control
																placeholder="Confirm your password"
																name="confirmPassword"
																value={values.confirmPassword}
																className="p-3 password-input"
																onChange={handleChange}
																type={showConfirmPassword ? "text" : "password"}
																isInvalid={
																	touched.confirmPassword &&
																	errors.confirmPassword
																}
															/>
															<Button
																variant="outline-secondary"
																onClick={toggleShowConfirmPassword}
															>
																{showConfirmPassword ? (
																	<FaEyeSlash />
																) : (
																	<FaEye />
																)}
															</Button>
															<Form.Control.Feedback type="invalid">
																{errors.confirmPassword}
															</Form.Control.Feedback>
														</InputGroup>
													</Form.Group>

													<div className="d-grid gap-2 mb-3">
														<Button
															type="submit"
															className="py-3 border-0 bg-color-2"
															variant="primary"
														>
															<span className="text-center fw-bold">
																Sign Up
															</span>
														</Button>
													</div>

													<div className="text-center mt-4">
														<p className="text-muted">
															Already have an account?{" "}
															<Link to="/login" className="text-primary">
																Log in
															</Link>
														</p>
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

export default Signup;
