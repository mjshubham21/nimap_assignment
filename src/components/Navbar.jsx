import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Film } from 'lucide-react';
import { Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';

const CustomNavbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const navigate = useNavigate();

  // Debouncing logic to search movie after typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500)

    return () => clearTimeout(timer)
  }, [searchQuery])

  useEffect(() => {
    if (debouncedQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(debouncedQuery)}`);
    } 
    // else { KNOWN BUG
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
