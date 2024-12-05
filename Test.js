This is my HomePage.jsx:
// imports here... 

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

This is my MovieCard.jsx:
// imports here... 

const MovieCard = ({ movie }) => {
  console.log("MovieCard")
  return (
    <Link to={`/movie/${movie.id}`} className="text-decoration-none">
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

This is my MovieDetails.jsx:
// imports here... 

const MovieDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: movie, loading } = useSelector(
    (state) => state.movies.movieDetails
  );
  console.log("MovieDetails")

  useEffect(() => {
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

This is my App.jsx:
// imports here... 

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="bg-secondary min-vh-100 d-flex flex-column">
          <Navbar />
          <Container className="flex-grow-1 py-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/top-rated" element={<TopRatedPage />} />
              <Route path="/upcoming" element={<UpcomingPage />} />
              <Route path="/movie/:id" element={<MovieDetailPage />} />
              <Route path="/search" element={<SearchPage />} />
            </Routes>
          </Container>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

This is my Navbar.jsx:
// imports here...

const CustomNavbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const navigate = useNavigate();

  // Debouncing logic to update search query after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500); // Adjust debounce delay (500ms)

    return () => clearTimeout(timer); // Clear the previous timer on every render
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(debouncedQuery)}`);
    } 
    // else {
    //   // Ensure it only redirects to the home page when needed
    //   if (debouncedQuery === '') {
    //     navigate('/');
    //   }
    // }
  }, [debouncedQuery, navigate]);
  

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }else {
      // If the input is cleared, navigate to the default page
      navigate('/');
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="md" className="shadow-lg">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <Film className="me-2" size={28} />
          <span className="fw-bold">MovieDB</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          {/* Navigation Links moved to the right */}
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Popular</Nav.Link>
            <Nav.Link as={Link} to="/top-rated">Top Rated</Nav.Link>
            <Nav.Link as={Link} to="/upcoming">Upcoming</Nav.Link>
          </Nav>
          {/* Search Form */}
          <Form className="d-flex" onSubmit={handleSearch}>
            <FormControl
              type="search"
              placeholder="Movie Name"
              className="me-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" variant="outline-light">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;

When we search for a movie e.g "abc" we get the filtered results, but when we clear the search input, the results of last deleted charaters are still rendred i.e "a", when we clear the seach input it shall take us to home page but without introducing the previous buildErrorMessage, how do we do it?