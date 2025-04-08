import { Select } from "antd";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CustomPagination = ({
  currentPage,
  totalRows,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) => {
  const totalPages = Math.ceil(totalRows / pageSize);

  const renderPageNumbers = () => {
    if (totalPages === 0) return null;

    const pageNumbers = [];

    // Mobile view - simplified pagination
    if (window.innerWidth < 768) {
      return (
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
      );
    }

    // Desktop view - full pagination
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pageNumbers.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pageNumbers.map((page, index) => {
      if (page === "...") {
        return (
          <span key={`ellipsis-${index}`} className="!px-3 !py-1">
            ...
          </span>
        );
      }

      return (
        <button
          key={page}
          className={`!px-3 !py-1 rounded-lg outline-none hover:!border-[#1677ff] ${
            currentPage === page
              ? "!bg-[#1677ff] text-white border-[#1677ff]"
              : "bg-white text-black"
          }`}
          onClick={() => onPageChange(page)}
          onMouseDown={(e) => e.preventDefault()}
        >
          {page}
        </button>
      );
    });
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4 p-2">
      {/* Page size selector and info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-2 sm:gap-4 w-full md:w-auto">
        {totalRows > 0 && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-sm whitespace-nowrap">Items per page</span>
              <Select
                className="min-w-[80px]"
                defaultValue={pageSize}
                onChange={(value) => onPageSizeChange(Number(value))}
              >
                <Option value="5">5</Option>
                <Option value="10">10</Option>
                <Option value="15">15</Option>
                <Option value="20">20</Option>
              </Select>
            </div>

            <div className="text-sm text-gray-600 whitespace-nowrap">
              Showing{" "}
              {totalRows > 0 ? (
                <>
                  {totalRows <= pageSize ? 1 : (currentPage - 1) * pageSize + 1}
                  -{Math.min(currentPage * pageSize, totalRows)} of {totalRows}
                </>
              ) : (
                "0-0 of 0"
              )}{" "}
              entries
            </div>
          </>
        )}
      </div>

      {/* Page navigation */}
      {totalPages > 0 && (
        <div className="flex items-center gap-2 w-full md:w-auto justify-center md:justify-end">
          <button
            className={`p-2 rounded-lg hover:bg-gray-100 ${
              currentPage <= 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {renderPageNumbers()}

          <button
            className={`p-2 rounded-lg hover:bg-gray-100 ${
              currentPage >= totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() =>
              currentPage < totalPages && onPageChange(currentPage + 1)
            }
            disabled={currentPage >= totalPages}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomPagination;
