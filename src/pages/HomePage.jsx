import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularMovies } from '../store/movieSlice';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

const HomePage = () => {
  const dispatch = useDispatch();
  const { results, page, total_pages, loading } = useSelector(
    (state) => state.movies.popular
  );
  console.log("HomePage")
  useEffect(() => {
    dispatch(fetchPopularMovies(1));
  }, [dispatch]);

  const handlePageChange = (newPage) => {
    dispatch(fetchPopularMovies(newPage));
    window.scrollTo(0, 0);
  };

  if (loading && !results.length) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" variant="primary" style={{ width: '4rem', height: '4rem' }} />
      </div>
    );
  }

  return (
    <Container className="py-4">
      <h1 className="text-center mb-4">Popular Movies</h1>
      <Row className="gy-4">
        {results.map((movie) => (
          <Col key={movie.id} xs={12} sm={6} md={4} lg={3}>
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

export default HomePage;
