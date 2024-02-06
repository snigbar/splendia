export type Props = {
  page: number;
  pages: number;
  onPageChange: (number: number) => void;
};

export default function Pagination({ page, pages, onPageChange }: Props) {
  const pageNumbers = [];

  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center">
      <ul className="flex border border-slate-300">
        {pageNumbers.map((number) => (
          <li>
            <button
              onClick={() => onPageChange(number)}
              className={`px-3 py-1 ${
                page === number ? "bg-indigo-500 text-white" : ""
              }`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
