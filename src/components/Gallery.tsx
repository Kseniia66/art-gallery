import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import styles from "../App.module.scss";
import {
  useGetPaintingsQuery,
  useGetAuthorsQuery,
  useGetLocationsQuery,
} from "../services/api.ts";
import PaintingCard from "./PaintingCard.tsx";

const ITEMS_PER_PAGE = 6;
const baseUrl = "https://test-front.framework.team";
const Gallery = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState("");

  const { data: paintingsData } = useGetPaintingsQuery({
    page: currentPage + 1,
    limit: ITEMS_PER_PAGE,
    q: searchQuery,
  });

  const { data: authors = [] } = useGetAuthorsQuery();
  const { data: locations = [] } = useGetLocationsQuery();

  const paintings = paintingsData?.data ?? [];
  const total = paintingsData?.total ?? 0;
  const pageCount = Math.ceil(total / ITEMS_PER_PAGE);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(inputValue);
    setCurrentPage(0);
  };
  const paintingsWithDetails = paintings.map((painting) => {
    const author = authors.find((a) => a.id === painting.authorId);
    const location = locations.find((l) => l.id === painting.locationId);
    return {
      ...painting,
      author: author?.name ?? "Unknown author",
      location: location?.location ?? "Unknown location",
    };
  });

  return (
    <div>
      <div className={styles.searchContainer}>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <img
            src="/public/search_icon.svg"
            alt="search"
            className={styles.searchIcon}
          />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Painting title"
            className={styles.searchInput}
          />
        </form>
      </div>
      <div className={styles.gallery}>
        {paintingsWithDetails.length === 0 ? (
          <div className={styles.noResult}>
            <h2 className={styles.h2}>
              No matches for <strong>{searchQuery}</strong>
            </h2>
            <p>Please try again with a different spelling or keywords.</p>
          </div>
        ) : (
          paintingsWithDetails.map((painting) => (
            <PaintingCard
              key={painting.id}
              image={`${baseUrl}${painting.imageUrl}`}
              title={painting.name}
              year={`${painting.created}`}
              author={painting.author}
              location={painting.location}
            />
          ))
        )}
      </div>
      {pageCount > 1 && (
        <ReactPaginate
          breakLabel="..."
          nextLabel={<span className={styles.label}>›</span>}
          previousLabel={<span className={styles.label}>‹</span>}
          onPageChange={handlePageClick}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          pageCount={pageCount}
          containerClassName={styles.pagination}
          activeClassName={styles.active}
          pageClassName={styles.page}
          breakClassName={styles.page}
        />
      )}
    </div>
  );
};
export default Gallery;
