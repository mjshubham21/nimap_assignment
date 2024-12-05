import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Card } from 'react-bootstrap';
import { IMAGE_BASE_URL } from '../services/api';

const MovieCard = ({ movie }) => {
  // console.log("MovieCard")
  return (
    <Link to={`/movie/${movie?.id}`} className="text-decoration-none">
      <Card className="h-100 shadow-sm border-0 transition-transform" style={{ cursor: 'pointer' }}>
        <Card.Img
          variant="top"
          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
          style={{ height: '400px', objectFit: 'cover' }}
        />
        <Card.Body>
          <Card.Title className="text-dark text-truncate mb-2">{movie.title}</Card.Title>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <Star className="text-warning me-1" size={20} />
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
            <span className="text-muted">
              {new Date(movie.release_date).getFullYear()}
            </span>
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default MovieCard;
