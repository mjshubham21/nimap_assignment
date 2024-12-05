import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <BootstrapPagination className="justify-content-center my-4">
      {/* Previous Button */}
      <BootstrapPagination.Prev
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft size={20} />
      </BootstrapPagination.Prev>

      {/* Current Page Display */}
      <BootstrapPagination.Item active>
        {currentPage} of {totalPages}
      </BootstrapPagination.Item>

      {/* Next Button */}
      <BootstrapPagination.Next
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight size={20} />
      </BootstrapPagination.Next>
    </BootstrapPagination>
  );
};

export default Pagination;
