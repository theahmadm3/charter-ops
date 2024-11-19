import {
  Modal,
  Button,
  Form as BootstrapForm,
  FloatingLabel,
  Row,
  Col,
} from "react-bootstrap";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateFuelAsync } from "../../../../../slices/fuel/fuelSlice";

const validationSchema = Yup.object().shape({
  aircraft_id: Yup.number().required("Aircraft ID is required"),
  vendor_id: Yup.string().required("Vendor name is required"),
  fuel_quantity: Yup.number()
    .typeError("Fuel quantity must be a number")
    .min(1, "Fuel quantity must be greater than 0")
    .required("Fuel quantity is required"),
  fuel_cost: Yup.number()
    .typeError("Fuel cost must be a number")
    .min(0, "Fuel cost must be at least 0")
    .required("Fuel cost is required"),
  payment_status: Yup.string().required("Payment status is required"),
  location: Yup.string().required("Location is required"),
  // remarks: Yup.string(),
  // receipt_upload: Yup.mixed().required("Receipt upload is required"),
});

function EditFuel(props) {
  const dispatch = useDispatch();
  const airCraftInfo = useSelector((state) => state?.aircraft);
  const configInfo = useSelector((state) => state?.config);

  const handleFileChange = async (event, setFieldValue) => {
    const file = event.currentTarget.files[0];

    if (!file.type.startsWith("image/")) {
      toast.info("Please upload an image file.");
      return;
    }

    const imgInKb = file.size / 1024;

    if (imgInKb > 500) {
      toast.info("Image size must be 500kb or less");

      return;
    }
    if (file) {
      const base64 = await convertFileToBase64(file);
      setFieldValue("receipt_upload", base64);
    }
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Fuel
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            aircraft_id: props?.data?.[0]?.aircraft_id,
            vendor_id: props?.data?.[0]?.vendor_id,
            fuel_quantity: props?.data?.[0]?.fuel_quantity,
            fuel_cost: props?.data?.[0]?.fuel_cost,
            payment_status: props?.data?.[0]?.payment_status,
            location: props?.data?.[0]?.location,
            remarks: props?.data?.[0]?.remarks,
            receipt_upload: props?.data?.[0]?.receipt_upload,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            // Filter out empty values
            const filteredValues = Object.entries(values).reduce(
              (acc, [key, value]) => {
                if (value !== "" && value !== null && value !== undefined) {
                  acc[key] = value;
                }
                return acc;
              },
              {}
            );

            dispatch(
              updateFuelAsync({
                id: props.data?.[0]?.id,
                values: filteredValues,
              })
            )
              .then((response) => {
                if (response?.payload?.success) {
                  props.onHide();
                }
              })
              .catch((error) => {
                console.error("Error occurred:", error);
              });
          }}
        >
          {({
            errors,
            touched,
            handleSubmit,
            setFieldValue,
            handleChange,
            values,
            dirty,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <BootstrapForm.Group className="mb-3">
                    <BootstrapForm.Label>
                      Aircraft ID <span className="text-danger">*</span>
                    </BootstrapForm.Label>
                    <BootstrapForm.Control
                      as="select"
                      className="py-3"
                      name="aircraft_id"
                      value={values.aircraft_id}
                      onChange={handleChange}
                      isInvalid={touched.aircraft_id && !!errors.aircraft_id}
                    >
                      <option value="">Select Aircraft</option>
                      {Array.isArray(airCraftInfo?.getAllAircraftResponse?.data)
                        ? airCraftInfo?.getAllAircraftResponse?.data.map(
                            (aircraft, index) => (
                              <option value={aircraft.id} key={index}>
                                {aircraft.reg_no}
                              </option>
                            )
                          )
                        : null}
                    </BootstrapForm.Control>
                    <ErrorMessage
                      name="aircraft_id"
                      component="div"
                      className="text-danger"
                    />
                  </BootstrapForm.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <BootstrapForm.Group className="mb-3">
                    <FloatingLabel
                      controlId="floatingPaymentStatus"
                      label="Fuel Supplier"
                    >
                      <BootstrapForm.Control
                        as="select"
                        name="vendor_id"
                        value={values.vendor_id}
                        onChange={handleChange}
                        isInvalid={touched.vendor_id && !!errors.vendor_id}
                      >
                        <option value="">Select Supplier</option>
                        {Array.isArray(
                          configInfo?.getAllSuppliersResponse?.data
                        )
                          ? configInfo?.getAllSuppliersResponse?.data.map(
                              (supplier, index) => (
                                <option value={supplier.id} key={index}>
                                  {supplier.name}
                                </option>
                              )
                            )
                          : null}
                      </BootstrapForm.Control>
                      <ErrorMessage
                        name="vendor_id"
                        component="div"
                        className="text-danger"
                      />
                    </FloatingLabel>
                  </BootstrapForm.Group>
                </Col>
                <Col md={6}>
                  <BootstrapForm.Group className="mb-3">
                    <FloatingLabel
                      controlId="floatingFuelQuantity"
                      label="Fuel Quantity"
                    >
                      <BootstrapForm.Control
                        type="number"
                        placeholder="Fuel Quantity"
                        name="fuel_quantity"
                        value={values.fuel_quantity}
                        onChange={handleChange}
                        isInvalid={
                          touched.fuel_quantity && !!errors.fuel_quantity
                        }
                      />
                      <BootstrapForm.Control.Feedback type="invalid">
                        {errors.fuel_quantity}
                      </BootstrapForm.Control.Feedback>
                    </FloatingLabel>
                  </BootstrapForm.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <BootstrapForm.Group className="mb-3">
                    <FloatingLabel
                      controlId="floatingFuelCost"
                      label="Fuel Cost"
                    >
                      <BootstrapForm.Control
                        type="number"
                        placeholder="Fuel Cost"
                        name="fuel_cost"
                        value={values.fuel_cost}
                        onChange={handleChange}
                        isInvalid={touched.fuel_cost && !!errors.fuel_cost}
                      />
                      <BootstrapForm.Control.Feedback type="invalid">
                        {errors.fuel_cost}
                      </BootstrapForm.Control.Feedback>
                    </FloatingLabel>
                  </BootstrapForm.Group>
                </Col>
                <Col md={6}>
                  <BootstrapForm.Group className="mb-3">
                    <FloatingLabel
                      controlId="floatingPaymentStatus"
                      label="Payment Status"
                    >
                      <BootstrapForm.Control
                        as="select"
                        name="payment_status"
                        value={values.payment_status}
                        onChange={handleChange}
                        isInvalid={
                          touched.payment_status && !!errors.payment_status
                        }
                      >
                        <option value="">Select Payment Status</option>
                        <option value="paid">Paid</option>
                        <option value="not_paid">Not Paid</option>
                      </BootstrapForm.Control>
                      <BootstrapForm.Control.Feedback type="invalid">
                        {errors.payment_status}
                      </BootstrapForm.Control.Feedback>
                    </FloatingLabel>
                  </BootstrapForm.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <BootstrapForm.Group className="mb-3">
                    <FloatingLabel
                      controlId="floatingLocation"
                      label="Location"
                    >
                      <BootstrapForm.Control
                        type="text"
                        placeholder="Location"
                        name="location"
                        value={values.location}
                        onChange={handleChange}
                        isInvalid={touched.location && !!errors.location}
                      />
                      <BootstrapForm.Control.Feedback type="invalid">
                        {errors.location}
                      </BootstrapForm.Control.Feedback>
                    </FloatingLabel>
                  </BootstrapForm.Group>
                </Col>
                <Col md={6}>
                  <BootstrapForm.Group className="mb-3">
                    <FloatingLabel controlId="floatingRemarks" label="Remarks">
                      <BootstrapForm.Control
                        as="textarea"
                        placeholder="Remarks"
                        name="remarks"
                        value={values.remarks}
                        onChange={handleChange}
                        isInvalid={touched.remarks && !!errors.remarks}
                      />
                      <BootstrapForm.Control.Feedback type="invalid">
                        {errors.remarks}
                      </BootstrapForm.Control.Feedback>
                    </FloatingLabel>
                  </BootstrapForm.Group>
                </Col>
              </Row>

              <Row>
                <Col md={12}>
                  <BootstrapForm.Group className="mb-3">
                    <FloatingLabel
                      controlId="floatingReceiptUpload"
                      label="Receipt Upload"
                    >
                      <BootstrapForm.Control
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        name="receipt_upload"
                        onChange={(e) => handleFileChange(e, setFieldValue)}
                        isInvalid={
                          touched.receipt_upload && !!errors.receipt_upload
                        }
                      />
                      <BootstrapForm.Control.Feedback type="invalid">
                        {errors.receipt_upload}
                      </BootstrapForm.Control.Feedback>
                    </FloatingLabel>
                  </BootstrapForm.Group>
                </Col>
              </Row>

              <Button type="submit" disabled={!dirty}>
                Update
              </Button>
              <Button variant="danger" className="ms-4" onClick={props.onHide}>
                Close
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}

export default EditFuel;
