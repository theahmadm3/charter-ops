import { Modal, Button, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import * as Yup from "yup";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { updateSupplierAsync } from "../../../../../../slices/config/configSlice";

function EditSupplier(props) {
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
            Edit Supplier
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              name: props?.data[0]?.name,
              remarks: props?.data[0]?.remarks,
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string()
                .required("Name is required")
                .min(3, "The name must be at least 3 characters"),
            })}
            onSubmit={(values) => {
              dispatch(
                updateSupplierAsync({
                  id: props?.data[0]?.id,
                  values: values,
                })
              )
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
                  <Col md={12}>
                    <Form.Group>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Remark"
                        className="my-2"
                      >
                        <Form.Control
                          type="text"
                          placeholder="remarks"
                          name="remarks"
                          value={values.remarks}
                          onChange={handleChange}
                        />
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
                    <span className=" ">Create</span>
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
export default EditSupplier;
