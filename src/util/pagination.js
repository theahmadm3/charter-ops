import { Pagination } from "react-bootstrap";

function PaginationComponent({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleLastClick = () => {
    if (!isNaN(totalPages)) {
      onPageChange(totalPages);
    }
  };

  return (
    <Pagination className="my-4 text-black">
      <Pagination.First onClick={() => onPageChange(1)} />
      <Pagination.Prev
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {pageNumbers.map((page) => (
        <Pagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Pagination.Item>
      ))}
      <Pagination.Next
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
      <Pagination.Last
        onClick={handleLastClick}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
}

export default PaginationComponent;
