import Pagination from "react-bootstrap/Pagination";

const CustomPagination = ({ currentPage, lastPage, links, onPageChange }) => {
  return (
    <Pagination className="custom-pagination">
      {/* First Page Button */}
      <Pagination.First
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="custom-pagination-item"
      />

      {/* Previous Page Button */}
      <Pagination.Prev
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!links?.prev?.[0]}
        className="custom-pagination-item"
      />

      {/* Dynamic Pagination Links */}
      {links
        ?.slice(1, -1) // Removes the first and last object
        .map((link, idx) =>
          link.label !== "..." ? (
            <Pagination.Item
              key={idx}
              active={link.active}
              onClick={() => onPageChange(Number(link.label))}
              className={`custom-pagination-item ${
                link.active ? "active" : ""
              }`}
            >
              {link.label}
            </Pagination.Item>
          ) : (
            <Pagination.Ellipsis key={idx} className="custom-pagination-item" />
          )
        )}

      {/* Next Page Button */}
      <Pagination.Next
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!links?.next?.[0]}
        className="custom-pagination-item"
      />

      {/* Last Page Button */}
      <Pagination.Last
        onClick={() => onPageChange(lastPage)}
        disabled={currentPage === lastPage}
        className="custom-pagination-item"
      />
    </Pagination>
  );
};

export default CustomPagination;
