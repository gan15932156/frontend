interface Props {
  updatePage: (newPage: number) => void;
  page: number;
  totalPages: number;
}
const Pagination: React.FC<Props> = ({ updatePage, page, totalPages }) => {
  return (
    <div className="flex justify-between items-center mt-4">
      <button
        className="p-2 bg-blue-500 text-white disabled:opacity-50"
        disabled={page === 1}
        onClick={() => updatePage(page - 1)}
      >
        Previous
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button
        className="p-2 bg-blue-500 text-white disabled:opacity-50"
        disabled={page >= totalPages}
        onClick={() => updatePage(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
