'use client';

import ReactPaginate from 'react-paginate';

type Props<TItem> = {
  itemsPerPage: number;
  items: TItem[];
  setCurrentItems: React.Dispatch<React.SetStateAction<TItem[]>>;
};

const Pagination = <TItem,>({
  itemsPerPage,
  items,
  setCurrentItems
}: Props<TItem>) => {
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: { selected: number }) => {
    const startOffSet = (event.selected * itemsPerPage) % items.length;
    const endOffset = startOffSet + itemsPerPage;
    const currentItems = items.slice(startOffSet, endOffset);
    setCurrentItems(currentItems);
  };

  return (
    <div className="flex items-center justify-center mt-4">
      <ReactPaginate
        onPageChange={handlePageClick}
        breakLabel="..."
        nextLabel=">"
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        containerClassName="flex space-x-2"
        pageClassName="px-2 py-1 rounded-md cursor-pointer hover:bg-primary hover:text-white"
        activeClassName="bg-primary text-white"
        previousClassName="px-2 py-1 rounded-md cursor-pointer hover:bg-primary hover:text-white"
        nextClassName="px-2 py-1 rounded-md cursor-pointer hover:bg-primary hover:text-white"
        disabledClassName="invisible"
      />
    </div>
  );
};

export default Pagination;