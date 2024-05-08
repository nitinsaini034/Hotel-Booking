import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function MyNavbar() {
  return (
    <>
    <Navbar expand="md" className="sticky-top navbar">
      <Container fluid>
        <Navbar.Brand href="/" className='logo'><img src="/src/assets/hotellogo.png" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-lg-0 navlink" style={{ maxHeight: '150px' }} navbarScroll>
            <Nav.Link href="/" className='active'>Home</Nav.Link>
            <Nav.Link href="/new" className='active'>Add new Hotal</Nav.Link>
            <Nav.Link href="" className='active'>About us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default MyNavbar