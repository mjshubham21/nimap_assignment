import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchMovies } from '../store/movieSlice';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const dispatch = useDispatch();
  const { results, page, total_pages, loading } = useSelector(
    (state) => state.movies.searchResults
  );

  useEffect(() => {
    if (query) {
      dispatch(searchMovies({ query, page: 1 }));
    }
  }, [dispatch, query]);

  const handlePageChange = (newPage) => {
    dispatch(searchMovies({ query, page: newPage }));
    window.scrollTo(0, 0);
  };

  if (loading && !results.length) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <Container className="py-4">
      <h1 className="display-5 mb-4 text-center">
        Search Results for "{query}"
      </h1>
      {results.length > 0 ? (
        <>
          <Row className="g-4">
            {results.map((movie) => (
              <Col xs={6} sm={4} md={3} key={movie.id}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
          <div className="d-flex justify-content-center mt-4">
            <Pagination
              currentPage={page}
              totalPages={total_pages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      ) : (
        <Alert variant="info" className="text-center">
          No movies found for your search.
        </Alert>
      )}
    </Container>
  );
};

export default SearchPage;
