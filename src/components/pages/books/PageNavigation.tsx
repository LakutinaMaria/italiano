import { ChevronLeft, ChevronRight } from "lucide-react";
import "./PageNavigation.css";

export default function PageNavigation({
  currentPage,
  totalPages,
  onNextPage,
  onPrevPage,
}) {
  return (
    <div className="navigation">
      <button
        className="nav-button prev"
        onClick={onPrevPage}
        disabled={currentPage <= 1}
      >
        <ChevronLeft />
        <span>Previous</span>
      </button>

      <div className="page-indicator">
        Page {currentPage} of {totalPages}
      </div>

      <button
        className="nav-button next"
        onClick={onNextPage}
        disabled={currentPage >= totalPages}
      >
        <span>Next</span>
        <ChevronRight />
      </button>
    </div>
  );
}
