import React from "react";

export const Pagination = React.memo(({ totalPages, currentPage, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
//   console.log('pages: ', pages);
console.log('pagination');

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        {"<"}
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{
            margin: "0 5px",
            padding: "5px 10px",
            backgroundColor: page === currentPage ? "blue" : "white",
            color: page === currentPage ? "white" : "black",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        >
          {page}
        </button>
      ))}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        {">"}
      </button>
    </div>
  );
});
