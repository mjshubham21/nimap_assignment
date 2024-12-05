import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetails } from '../store/movieSlice';
import { IMAGE_BASE_URL } from '../services/api';
import { Star, Calendar, Clock } from 'lucide-react';
import { Container, Row, Col, Spinner, Card } from 'react-bootstrap';

const MovieDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: movie, loading } = useSelector(
    (state) => state.movies.movieDetails
  );
  console.log("MovieDetails")
  console.log("MovieDetails ID::", id)

  useEffect(() => {
    console.log("Movie ID:", id);
    if (id) {
      dispatch(fetchMovieDetails(id));
    }
  }, [dispatch, id]);

  if (loading || !movie) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <>
      {/* Backdrop Section */}
      <div
        className="d-flex align-items-end bg-dark text-white"
        style={{
          height: '500px',
          backgroundImage: `url(${IMAGE_BASE_URL}${movie.backdrop_path})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="w-100 h-100" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <Container className="h-100 d-flex align-items-end">
            <Row className="w-100">
              <Col md={3}>
                <img
                  src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                  alt={movie.title}
                  className="img-fluid rounded shadow"
                />
              </Col>
              <Col md={9}>
                <h1 className="display-4 fw-bold">{movie.title}</h1>
                <div className="d-flex align-items-center gap-4 my-3">
                  <div className="d-flex align-items-center">
                    <Star size={20} className="text-warning me-1" />
                    <span>{movie.vote_average.toFixed(1)}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <Calendar size={20} className="me-1" />
                    <span>{new Date(movie.release_date).getFullYear()}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <Clock size={20} className="me-1" />
                    <span>{movie.runtime} min</span>
                  </div>
                </div>
                <p className="fs-5">{movie.overview}</p>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      {/* Cast Section */}
      <Container className="py-5">
        <h2 className="mb-4">Cast</h2>
        <Row className="g-4">
          {movie.credits.cast.slice(0, 12).map((actor) => (
            <Col xs={6} sm={4} md={3} lg={2} key={actor.id}>
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={`${IMAGE_BASE_URL}${actor.profile_path}`}
                  alt={actor.name}
                  style={{ height: '180px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title className="fs-6 text-truncate">{actor.name}</Card.Title>
                  <Card.Text className="text-muted">{actor.character}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default MovieDetailPage;
