import { Modal, Button, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import * as Yup from "yup";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { updatePartnershipAsync } from "../../../../../../slices/config/configSlice";

function EditPartnership(props) {
  const dispatch = useDispatch();

  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Partnership
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              name: props?.data[0]?.name,
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string()
                .required("Name is required")
                .min(3, "The name must be at least 3 characters"),
            })}
            onSubmit={(values) => {
              dispatch(
                updatePartnershipAsync({
                  id: props?.data[0]?.id,
                  values: values,
                })
              )
                .then((response) => {
                  if (response.payload.success) {
                    props.onHide();
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
            {({
              errors,
              touched,
              handleSubmit,
              values,
              handleChange,
              dirty,
            }) => (
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
                    disabled={!dirty}
                  >
                    <span className=" ">Update</span>
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
export default EditPartnership;
