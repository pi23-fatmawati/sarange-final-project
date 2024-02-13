import { Pagination } from "flowbite-react";

export default function PaginationTable(
  totalPages,
  currentPage,
  handlePageChange,
  display
) {
  return (
    <Pagination
      totalPages={totalPages}
      currentPage={currentPage}
      onPageChange={handlePageChange}
      style={{
        textAlign: "center",
        fontSize: "small",
        display: display,
      }}
      previousLabel="<"
      nextLabel=">"
    />
  );
}