'use client';

import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';

type Props<TItem, TDispatchAction extends ActionCreatorWithPayload<{ startOffSet: number, endOffset: number }, string>> = {
  itemsPerPage: number;
  items: TItem[];
  getItemsByPage: TDispatchAction;
};

const Pagination = <TItem, TDispatchAction extends ActionCreatorWithPayload<{ startOffSet: number, endOffset: number }, string>>({
  itemsPerPage,
  items,
  getItemsByPage,
}: Props<TItem, TDispatchAction>) => {
  const dispatch = useDispatch();

  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: { selected: number }) => {
    const startOffSet = (event.selected * itemsPerPage) % items.length;
    const endOffset = startOffSet + itemsPerPage;
    // const currentItems = items.slice(startOffSet, endOffset);
    dispatch(getItemsByPage({ startOffSet, endOffset }));
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
