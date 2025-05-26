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
import {
  addMaintenanceAsync,
  updateMaintenanceAsync,
} from "../../../../../slices/maintenance/maintenanceSlice";

const validationSchema = Yup.object().shape({
  aircraft_id: Yup.number().required("Aircraft ID is required"),
  maintenance_type: Yup.string().required("Type of maintenance is required"),
  amo_id: Yup.number()
    .typeError("AMO ID must be a number")
    .required("AMO ID is required"),
  // invoice_received: Yup.string().required("Invoice status is required"),
  amount_paid: Yup.number()
    .typeError("Amount paid must be a number")
    .min(0, "Amount paid must be at least 0")
    .required("Amount paid is required"),
  // receipt_upload: Yup.mixed()
  //   .required("Receipt upload is required")
  //   .test(
  //     "fileType",
  //     "Unsupported file format",
  //     (value) =>
  //       value &&
  //       ["image/jpeg", "image/png", "image/jpg", "application/pdf"].includes(
  //         value.type
  //       )
  //   ),
});

function EditMaintenance(props) {
  const dispatch = useDispatch();
  const airCraftInfo = useSelector((state) => state?.aircraft);
  const amoInfo = useSelector((state) => state?.amo);

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
          Edit Maintenance
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            aircraft_id: props?.data?.[0]?.aircraft_id,
            maintenance_type: props?.data?.[0]?.maintenance_type,
            amo_id: props?.data?.[0]?.amo_id,
            // invoice_received: "",
            amount_paid: props?.data?.[0]?.amount_paid,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            const formattedValues = {
              ...values,
              amo_id: Number(values.amo_id),
            };

            dispatch(
              updateMaintenanceAsync({
                id: props.data?.[0]?.id,
                values: formattedValues,
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
          }) => (
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <BootstrapForm.Group className="mb-3">
                    <BootstrapForm.Label>
                      Aircraft <span className="text-danger">*</span>
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
                      controlId="floatingTypeOfMaintenance"
                      label="Type of Maintenance"
                    >
                      <BootstrapForm.Control
                        as="select"
                        name="maintenance_type"
                        value={values.maintenance_type}
                        onChange={handleChange}
                        isInvalid={
                          touched.maintenance_type &&
                          !!errors.maintenance_type
                        }
                      >
                        <option value="">{values.maintenance_type}</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="unscheduled">Unscheduled</option>
                      </BootstrapForm.Control>
                      <BootstrapForm.Control.Feedback type="invalid">
                        {errors.maintenance_type}
                      </BootstrapForm.Control.Feedback>
                    </FloatingLabel>
                  </BootstrapForm.Group>
                </Col>
                <Col md={6}>
                  <BootstrapForm.Group className="mb-3">
                    <FloatingLabel controlId="floatingAMO" label="AMO">
                      <BootstrapForm.Control
                        as="select"
                        name="amo_id"
                        value={values.amo_id}
                        onChange={handleChange}
                        isInvalid={touched.amo_id && !!errors.amo_id}
                      >
                        <option value="">Select AMO</option>
                        {Array.isArray(
                          amoInfo?.getAllAircraftMaintenanceOrgResponse?.data
                        )
                          ? amoInfo?.getAllAircraftMaintenanceOrgResponse?.data.map(
                            (amo, index) => (
                              <option value={amo.id} key={index}>
                                {amo.name}
                              </option>
                            )
                          )
                          : null}
                      </BootstrapForm.Control>
                      <BootstrapForm.Control.Feedback type="invalid">
                        {errors.amo_id}
                      </BootstrapForm.Control.Feedback>
                    </FloatingLabel>
                  </BootstrapForm.Group>
                </Col>
              </Row>

              <Row>
                {/* <Col md={6}>
                  <BootstrapForm.Group className="mb-3">
                    <FloatingLabel
                      controlId="floatingInvoiceReceived"
                      label="Invoice Received"
                    >
                      <BootstrapForm.Control
                        as="select"
                        name="invoice_received"
                        value={values.invoice_received}
                        onChange={handleChange}
                        isInvalid={
                          touched.invoice_received && !!errors.invoice_received
                        }
                      >
                        <option value="">Select Invoice Status</option>
                        <option value="received">Received</option>
                        <option value="not_received">Not Received</option>
                      </BootstrapForm.Control>
                      <BootstrapForm.Control.Feedback type="invalid">
                        {errors.invoice_received}
                      </BootstrapForm.Control.Feedback>
                    </FloatingLabel>
                  </BootstrapForm.Group>
                </Col> */}
                <Col md={6}>
                  <BootstrapForm.Group controlId="amountPaid">
                    <BootstrapForm.Label>Amount Paid</BootstrapForm.Label>
                    <BootstrapForm.Control
                      type="number"
                      placeholder={values.amount_paid}
                      name="amount_paid"
                      value={values.amount_paid}
                      onChange={handleChange}
                      isInvalid={touched.amount_paid && !!errors.amount_paid}
                    />
                    <BootstrapForm.Control.Feedback type="invalid">
                      {errors.amount_paid}
                    </BootstrapForm.Control.Feedback>
                  </BootstrapForm.Group>
                </Col>
                <Col md={6}>
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

              <Button type="submit">Update</Button>
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

export default EditMaintenance;
