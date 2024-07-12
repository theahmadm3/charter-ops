function StaffForm() {
  return (
    <>
      <Formik
        initialValues={{
          name: "",
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string()
            .required("Name is required")
            .min(3, "The name must be at least 3 characters"),
        })}
        onSubmit={(values) => {
          dispatch(addDepartmentAsync({ values }))
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
              <Col md={12}>
                <Form.Group>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Name"
                    className="my-2"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                    />
                    {errors.name && touched.name ? (
                      <small className="text-danger">{errors.name}</small>
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
    </>
  );
}

export default StaffForm;
