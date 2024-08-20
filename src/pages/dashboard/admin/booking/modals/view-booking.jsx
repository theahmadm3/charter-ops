import { Card, Col, Modal, Row } from "react-bootstrap";

const ViewBooking = (props) => {
  return (
    <>
      <Modal
        {...props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Booking information - {props?.data[0]?.aircraft?.name} |{" "}
            {props?.data[0]?.trip_type}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="bg-color-1 p-3">
            <h6>Flight Details</h6>
          </div>
          <div>
            <Row className="my-3">
              <Col md={6}>
                <Card className="bg-light border-0   ">
                  <Card.Body>
                    <Card.Text className="fw-bold">Trip Type</Card.Text>
                    <Card.Text>{props?.data[0]?.trip_type || "--"}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="bg-light border-0   ">
                  <Card.Body>
                    <Card.Text className="fw-bold">Client</Card.Text>
                    <Card.Text>
                      {props?.data[0]?.client?.first_name || "--"}{" "}
                      {props?.data[0]?.client?.last_name || "--"}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="my-3">
              <Col md={6}>
                <Card className="bg-light border-0   ">
                  <Card.Body>
                    <Card.Text className="fw-bold">From </Card.Text>
                    <Card.Text>
                      {props?.data[0]?.from_location || "--"}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="bg-light border-0   ">
                  <Card.Body>
                    <Card.Text className="fw-bold">To </Card.Text>
                    <Card.Text>{props?.data[0]?.to_location || "--"}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="my-3">
              <Col md={6}>
                <Card className="bg-light border-0   ">
                  <Card.Body>
                    <Card.Text className="fw-bold">Flight Date</Card.Text>
                    <Card.Text>{props?.data[0]?.flight_date || "--"}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="bg-light border-0   ">
                  <Card.Body>
                    <Card.Text className="fw-bold">Return Date</Card.Text>
                    <Card.Text>{props?.data[0]?.return_date || "--"}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="my-3">
              <Col md={6}>
                <Card className="bg-light border-0   ">
                  <Card.Body>
                    <Card.Text className="fw-bold">Number of Adults</Card.Text>
                    <Card.Text>{props?.data[0]?.num_adults || "--"}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="bg-light border-0   ">
                  <Card.Body>
                    <Card.Text className="fw-bold">
                      Number of Children
                    </Card.Text>
                    <Card.Text>
                      {props?.data[0]?.num_children || "--"}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="my-3">
              <Col md={6}>
                <Card className="bg-light border-0   ">
                  <Card.Body>
                    <Card.Text className="fw-bold">Number of Infants</Card.Text>
                    <Card.Text>{props?.data[0]?.num_infants || "--"}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="bg-light border-0   ">
                  <Card.Body>
                    <Card.Text className="fw-bold">Aircraft Name</Card.Text>
                    <Card.Text>
                      {props?.data[0]?.aircraft?.name || "--"}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="my-3">
              <Col md={6}>
                <Card className="bg-light border-0   ">
                  <Card.Body>
                    <Card.Text className="fw-bold">
                      Aircraft Manufacturer
                    </Card.Text>
                    <Card.Text>
                      {props?.data[0]?.aircraft?.manufacturer || "--"}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6}>
                <Card className="bg-light border-0   ">
                  <Card.Body>
                    <Card.Text className="fw-bold">Booked By</Card.Text>
                    <Card.Text>
                      {props?.data[0]?.bookedBy?.first_name || "--"}{" "}
                      {props?.data[0]?.bookedBy?.last_name || "--"}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewBooking;
