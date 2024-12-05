import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUpcomingMovies } from '../store/movieSlice';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

const UpcomingPage = () => {
  const dispatch = useDispatch();
  const { results, page, total_pages, loading } = useSelector(
    (state) => state.movies.upcoming
  );

  useEffect(() => {
    dispatch(fetchUpcomingMovies(1));
  }, [dispatch]);

  const handlePageChange = (newPage) => {
    dispatch(fetchUpcomingMovies(newPage));
    window.scrollTo(0, 0);
  };

  if (loading && !results.length) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" variant="primary" size="lg" />
      </div>
    );
  }

  return (
    <Container className="py-4">
      <h1 className="text-center mb-4">Upcoming Movies</h1>
      <Row>
        {results.map((movie) => (
          <Col key={movie.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
      <Pagination
        currentPage={page}
        totalPages={total_pages}
        onPageChange={handlePageChange}
      />
    </Container>
  );
};

export default UpcomingPage;
