import { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { exportBookingsAsync, resetExportState } from '../../../../../slices/exports/exportsSlice';

const ExportToExcel = () => {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.export);

    const handleClose = () => {
        setShow(false);
        dispatch(resetExportState());
    };

    const handleShow = () => setShow(true);

    const initialValues = {
        start_date: '',
        end_date: '',
        aircraft_type: '',
    };

    const validationSchema = Yup.object({
        start_date: Yup.string().optional(),
        end_date: Yup.string().optional(),
        aircraft_type: Yup.string().optional(),
    });

    const isFormEmpty = (values) =>
        !values.start_date && !values.end_date && !values.aircraft_type;

    const handleSubmit = async (values) => {
        try {
            await dispatch(exportBookingsAsync(values)).unwrap();
            handleClose();
        } catch (err) {
            // Error is handled via Redux state
        }
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Export To Excel
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Export to Excel</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ values, errors, touched }) => (
                            <FormikForm>
                                <Form.Group className="mb-3" controlId="start_date">
                                    <Form.Label>Start Date</Form.Label>
                                    <Field
                                        name="start_date"
                                        type="date"
                                        as={Form.Control}
                                        isInvalid={touched.start_date && !!errors.start_date}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.start_date}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="end_date">
                                    <Form.Label>End Date</Form.Label>
                                    <Field
                                        name="end_date"
                                        type="date"
                                        as={Form.Control}
                                        min={values.start_date}
                                        isInvalid={touched.end_date && !!errors.end_date}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.end_date}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="aircraft_type">
                                    <Form.Label>Aircraft Type</Form.Label>
                                    <Field
                                        name="aircraft_type"
                                        type="text"
                                        as={Form.Control}
                                        isInvalid={touched.aircraft_type && !!errors.aircraft_type}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.aircraft_type}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose} disabled={loading}>
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        disabled={loading || isFormEmpty(values)}
                                    >
                                        {loading ? 'Exporting...' : 'Export'}
                                    </Button>
                                </Modal.Footer>
                            </FormikForm>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ExportToExcel;
