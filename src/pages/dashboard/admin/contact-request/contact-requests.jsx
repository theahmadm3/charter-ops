import { Button, Container, Dropdown, Table, Form } from "react-bootstrap";
import AdminLayout from "../../../../component/layout/admin-layout";
import { useDispatch, useSelector } from "react-redux";
import { HiDotsHorizontal } from "react-icons/hi";
import { useEffect, useState } from "react";
import {
  updateContactResquestStatusAsync,
  getAllContactsAsync,
} from "../../../../slices/contact/contactSlice";

const ContactRequests = () => {
  const contactInfo = useSelector((state) => state?.contacts);
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  useEffect(() => {
    dispatch(getAllContactsAsync());
  }, [dispatch]);

  // Check that getAllContactResponse is an array before filtering
  const filteredContacts = Array.isArray(contactInfo.getAllContactResponse)
    ? contactInfo.getAllContactResponse.filter((contact) =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentContacts = filteredContacts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleContactRequestStatus = (id, status) => {
    let newStatus = "";

    if (status === "pending") {
      newStatus = "processed";
    } else if (status === "processed") {
      newStatus = "closed";
    }

    dispatch(updateContactResquestStatusAsync({ id, status: newStatus }));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page on new search
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <AdminLayout>
      <Container fluid>
        <div>
          <h6 className="mb-4">Contact Requests</h6>

          {/* Search Input */}
          <Form.Control
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="mb-3"
          />

          <Table striped hover responsive>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Service Type</th>
                <th>Message</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentContacts.length > 0 ? (
                currentContacts.map((contact, index) => (
                  <tr key={contact.id}>
                    <td>{startIndex + index + 1}</td>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.phone}</td>
                    <td>{contact.service_type}</td>
                    <td>{contact.message}</td>
                    <td>
                      <span
                        style={{
                          color: contact.status === "pending" ? "red" : "blue",
                        }}
                      >
                        {contact.status}
                      </span>
                    </td>
                    <td>
                      {contact.status != "closed" ? (
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="light"
                            className="border-0"
                            id="dropdown-basic"
                            size="sm"
                          >
                            <HiDotsHorizontal />
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item
                              className="small"
                              onClick={() =>
                                handleContactRequestStatus(
                                  contact.id,
                                  contact.status
                                )
                              }
                            >
                              {contact.status === "pending"
                                ? "Mark as Processed"
                                : contact.status === "processed"
                                ? "Mark as Closed"
                                : ""}
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
                    No contact requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          {/* Pagination Controls */}
          <div className="d-flex justify-content-between mt-3">
            <Button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </Button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <Button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </Container>
    </AdminLayout>
  );
};

export default ContactRequests;
