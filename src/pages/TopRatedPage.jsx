import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopRatedMovies } from '../store/movieSlice';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

const TopRatedPage = () => {
  const dispatch = useDispatch();
  const { results, page, total_pages, loading } = useSelector(
    (state) => state.movies.topRated
  );

  useEffect(() => {
    dispatch(fetchTopRatedMovies(1));
  }, [dispatch]);

  const handlePageChange = (newPage) => {
    dispatch(fetchTopRatedMovies(newPage));
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
      <h1 className="display-5 text-center mb-4">Top Rated Movies</h1>
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
    </Container>
  );
};

export default TopRatedPage;
