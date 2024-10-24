import moment from "moment";
import { Card, Col, Modal, Row, Table } from "react-bootstrap";

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
                    <Card.Text className="fw-bold">Aircraft </Card.Text>
                    <Card.Text>
                      {props?.data[0]?.aircraft?.name || "--"}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="bg-light border-0   ">
                  <Card.Body>
                    <Card.Text className="fw-bold">Status </Card.Text>
                    <Card.Text>{props?.data[0]?.status || "--"}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="my-3">
              <Col md={6}>
                <Card className="bg-light border-0   ">
                  <Card.Body>
                    <Card.Text className="fw-bold">Departure </Card.Text>
                    <Card.Text>
                      {props?.data[0]?.from_location || "--"}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="bg-light border-0   ">
                  <Card.Body>
                    <Card.Text className="fw-bold">Arrival </Card.Text>
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
                    <Card.Text>
                      {moment(props?.data[0]?.flight_date).format("LL") || "--"}
                    </Card.Text>
                    <hr />
                    <Card.Text className="fw-bold">Flight Time</Card.Text>
                    <Card.Text>
                      {moment(props?.data[0]?.flight_time, "HH:mm:ss").format(
                        "LT"
                      ) || "--"}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="bg-light border-0   ">
                  <Card.Body>
                    <Card.Text className="fw-bold">Return Date</Card.Text>
                    <Card.Text>
                      {moment(props?.data[0]?.return_date).format("LL") || "--"}
                    </Card.Text>
                    <hr />
                    <Card.Text className="fw-bold">Return Time</Card.Text>
                    <Card.Text>
                      {moment(props?.data[0]?.return_time, "HH:mm:ss").format(
                        "LT"
                      ) || "--"}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="my-3">
              <Col md={6}>
                <Card className="bg-light border-0   ">
                  <Card.Body>
                    <Card.Text className="fw-bold">Service</Card.Text>
                    <Card.Text>
                      {props?.data[0]?.service?.service_name || "--"}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="bg-light border-0   ">
                  <Card.Body>
                    <Card.Text className="fw-bold">Payment Status</Card.Text>
                    <Card.Text>
                      {props?.data[0]?.payment_status || "--"}
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
                      Booking Progress Stage
                    </Card.Text>
                    <Card.Text>
                      {props?.data[0]?.booking_process_stage || "--"}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="bg-light border-0   ">
                  <Card.Body>
                    <Card.Text className="fw-bold">Special Request</Card.Text>
                    <Card.Text>
                      {props?.data[0]?.special_requests || "--"}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="my-3">
              <Col md={6}>
                <Card className="bg-light border-0">
                  <Card.Body>
                    <Card.Text className="fw-bold">Amount</Card.Text>
                    <Card.Text>
                      {props?.data[0]?.total_amount
                        ? new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(props.data[0].total_amount)
                        : "--"}
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
            <div className="my-3">
              <Card className="bg-light border-0   ">
                <Card.Body>
                  <Card.Text className="fw-bold">Legs</Card.Text>
                  <Table>
                    <thead>
                      <tr>
                        <th></th>
                        <th>Departure</th>
                        <th>Flight Date</th>
                        <th>Flight Time</th>
                        <th>Arrival</th>
                        <th>Arrival Date</th>
                        <th>Arrival Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {props?.data[0]?.legs?.length > 0 ? (
                        props?.data[0]?.legs.map((leg, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{leg.from}</td>
                            <td>{moment(leg.departure_date).format("LL")}</td>
                            <td>
                              {moment(leg.departure_time, "HH:mm:ss").format(
                                "LT"
                              )}
                            </td>
                            <td>{leg.to}</td>
                            <td>{moment(leg.arrival_date).format("LL")}</td>
                            <td>
                              {moment(leg.arrival_time, "HH:mm:ss").format(
                                "LT"
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="text-center">
                            No record found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </div>
          </div>
          <div>
            <Card className="bg-light border-0   ">
              <Card.Body>
                <Card.Title className="fw-bold">Trip Sheet</Card.Title>

                <Card.Text className="fw-bold">Crew Note</Card.Text>
                <Card.Text>
                  {props?.data[0]?.trip_sheet?.crew_notes || "--"}
                </Card.Text>
                <hr />
                <Card.Text className="fw-bold">Passenger Notes</Card.Text>
                <Card.Text>
                  {props?.data[0]?.trip_sheet?.passenger_notes || "--"}
                </Card.Text>
                <hr />
                <Card.Text className="fw-bold">Crew Members</Card.Text>

                <Table>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Gender</th>
                      <th>Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props?.data[0]?.trip_sheet?.crew_members?.length > 0 ? (
                      props?.data[0]?.trip_sheet?.crew_members.map(
                        (crew, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{crew.first_name + " " + crew?.last_name}</td>
                            <td> {crew?.email} </td>
                            <td>{crew?.gender}</td>
                            <td>{crew.phone}</td>
                          </tr>
                        )
                      )
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center">
                          No record found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewBooking;
