import React from 'react';
import ReactPaginate from 'react-paginate';
import { paginateStyles } from './Paginate.style';
import { reducer, reducerInitialState } from '../../reducers/reducer';

interface PaginateProps {
  pageCount: number;
}

const Paginate: React.FC<PaginateProps> = ({ pageCount }: PaginateProps) => {
  const [state, dispatch] = React.useReducer(reducer, reducerInitialState);
  const { currentPage } = state;

  const handlePageClick: (selectedItem: { selected: number }) => void = (selectedItem) => {
    dispatch({ type: 'SET_PAGE', currentPage: selectedItem.selected + 1 });
  };

  const classes = paginateStyles();

  if (currentPage === 0) {
    return null;
  }

  return (
    <ReactPaginate
      previousLabel="<"
      previousLinkClassName={classes.linkStyle}
      nextLabel=">"
      nextLinkClassName={classes.linkStyle}
      breakLabel="..."
      breakClassName={classes.basicStyle}
      breakLinkClassName={classes.linkStyle}
      containerClassName={classes.containerStyle}
      initialPage={0}
      pageCount={pageCount}
      marginPagesDisplayed={5}
      nextClassName={classes.basicStyle}
      pageClassName={classes.basicStyle}
      pageLinkClassName={classes.linkStyle}
      pageRangeDisplayed={3}
      previousClassName={classes.basicStyle}
      onPageChange={handlePageClick}
      activeLinkClassName={classes.activeLinkStyle}
    />
  );
};

export default Paginate;
