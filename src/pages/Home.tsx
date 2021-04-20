//@ts-nocheck
import React, { useEffect, useState } from 'react';
import SearchFilters from '../components/SearchFilters/SearchFilters';
import fetchApi from '../helpers/fetch';
import ListingView from '../components/ListingView/ListingView';
import { Paper } from '@material-ui/core';
import { ListingInterface } from '../types/types';
import { homePageStyles } from './Home.style';
import { reducer, reducerInitialState } from '../reducers/reducer';
import { getAllListings } from '../actions/actions';

const Home: React.FC = () => {
  const [state, dispatch] = React.useReducer(reducer, reducerInitialState);

  const listings: ListingInterface[] = state.data.listings;
  const initialData = fetchApi({ url: '/api/constants', method: 'GET' }).response?.data;
  const classes = homePageStyles();

  const initialFilterState = { county: '', city: '', saleDate: '' };
  const getListingsSucceeded = state.getListingsSucceeded === true;

  const [filters, setFilters] = useState(initialFilterState);
  const [filterErrors, setFilterErrors] = useState(undefined);
  const [filteredListings, setFilteredListings] = useState(undefined);

  const filterByCounty = (listing: ListingInterface) => listing.county === filters.county;

  const filterByCity = (listing: ListingInterface) => {
    if (!filters.city) {
      return true;
    }

    return listing.city === filters.city;
  };

  const onFilterChange = (event) => {
    const { name, value } = event.target;

    if (name === 'county') {
      setFilters({ county: value, city: '', saleDate: '' });
      return;
    }

    setFilters({ ...filters, [name]: value });
  };

  console.log(state);

  const onFilterReset = () => setFilters(initialFilterState);

  const onFilterSubmit = () => {
    if (!listings) {
      return;
    }

    if (filters === initialFilterState) {
      setFilteredListings(listings);
      return;
    }

    if (!filters.county && filters.county) {
      setFilterErrors({ county: true });
      return;
    }

    const filtersToApply = Object.keys(filters).filter((key) => filters[key]);
    if (filtersToApply.length === 0) {
      setFilteredListings(listings);
    }

    const listingsWithFilterApplied = listings.filter(filterByCounty).filter(filterByCity);

    setCurrentPage(1);
    setFilteredListings(listingsWithFilterApplied);
  };

  useEffect(() => {
    if (!getListingsSucceeded) {
      getAllListings(dispatch);
    }
  }, [getListingsSucceeded, listings]);

  return (
    <Paper className={classes.root} elevation={0}>
      <div className={classes.header}>
        <div className={classes.title}>
          <h1>Sheriff Sale Scraper</h1>
        </div>
        <div>
          <SearchFilters
            cities={initialData?.cities}
            citiesByCounty={initialData?.citiesByCounty}
            counties={initialData?.counties}
            filters={filters}
            filterErrors={filterErrors}
            onFilterChange={onFilterChange}
            onFilterReset={onFilterReset}
            onFilterSubmit={onFilterSubmit}
            saleDates={initialData?.saleDates}
          />
        </div>
      </div>
      <ListingView listings={filteredListings || listings} />
    </Paper>
  );
};

export default Home;
