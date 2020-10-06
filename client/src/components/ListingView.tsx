// @ts-nocheck
import React, { useState } from 'react';
import Paginate from './Paginate'
import Listing from './Listing'
import { Grid } from '@material-ui/core';
import * as types from '../types'
import useGlobalStyles from '../styles/styles';

const ListingView = ({ listings, pageCount }: { listings: any, pageCount: any }) => {
  const listingsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastBorrower = currentPage * listingsPerPage;
  const indexOfFirstBorrower = indexOfLastBorrower - listingsPerPage;


  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
  };

  const filteredListingsView = listings && listings
    .slice(indexOfFirstBorrower, indexOfLastBorrower)
    .map((listing: types.Listing, listingIndex: number) => (
      <Grid item xs={12} key={`${listing.address_sanitized}-${listingIndex}`}>
        <Listing listing={listing} />
      </Grid>
    ))

  const globalClasses = useGlobalStyles();

  return (
    <div>
      <Paginate onClick={handlePageClick} pageCount={pageCount} />
      <div className={globalClasses.container}>
        {filteredListingsView?.length ? filteredListingsView : 'There are no results with the selected filters'}
      </div>
    </div >
  );
};

export default ListingView;