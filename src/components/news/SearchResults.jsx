"use client";
import React, { useState } from "react";
import moment from "moment";
import config from "../../utils/config";
import Link from "next/link";
import "../../css/searchResults.css";

import {
  InstantSearch,
  SearchBox,
  Hits,
  Pagination,
} from "react-instantsearch-dom";
import { useRouter } from "next/navigation";

const SearchResults = ({ searchClient }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(
    new URLSearchParams(location.search).get("query") || ""
  );

  const handleSearchStateChange = (searchState) => {
    const newQuery = searchState.query || "";
    setSearchQuery(newQuery);
    navigate(`/search${newQuery ? `?query=${newQuery}` : ""}`, {
      replace: true,
    });
  };

  const Hit = ({ hit }) => (
    <div className="card mb-4 border-0 rounded wow fadeInUp news-item">
      <Link href={`/post/${hit.slug}`}>
        <img
          src={`${config.API_URL}${hit.thumbnail.url}`}
          className="card-img-top"
          alt={hit.title}
        />
      </Link>
      <div className="card-body">
        <Link href={`/post/${hit.slug}`}>
          <h5 className="card-title">{hit.title}</h5>
        </Link>
        <p className="card-text">{hit.description}</p>
        <p className="card-text">
          <small className="text-muted">
            {moment(hit.createdAt).format("DD [tháng] MM YYYY, HH:mm")}
          </small>
        </p>
      </div>
    </div>
  );

  return (
    <div
      className="search-results-container d-flex flex-column"
      style={{ minHeight: "55vh" }}
    >
      <div className="container flex-grow-1 py-5">
        <h1 className="text-center fs-15 mb-5">
          {searchQuery ? `Search Results for "${searchQuery}"` : "Search News"}
        </h1>
        {/* <InstantSearch searchClient={searchClient} indexName="blog" onSearchStateChange={handleSearchStateChange}
          searchState={{ query: searchQuery }}>
          <SearchBox />
          <div className="mt-5"></div>
          <div className="row">
            <Hits hitComponent={Hit} />
          </div>
          <div className="mt-5"></div>
         <Pagination /> 
        </InstantSearch> */}
      </div>
    </div>
  );
};

export default SearchResults;
