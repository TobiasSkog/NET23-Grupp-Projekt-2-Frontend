import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import NotionImg from '../../Assets/Notion-Logo.png'

const LoginModal = ({ show, handleClose }) => {

    const handleImageClick = () => {
      console.log('Redirecting to:', process.env.REACT_APP_NOTION_AUTH_URL);
        window.location.href = process.env.REACT_APP_NOTION_AUTH_URL;
      };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center">Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="loginFormEmail" className="mb-3"> 
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter your email address" />
          </Form.Group>
          <Form.Group controlId="loginFormPassword" className="mb-3"> 
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter your password" />
          </Form.Group>
          <Button variant="dark" type="submit" className="d-block w-100 mt-3">
            Login
          </Button>
          <div className="text-center mt-3">Or Login Using</div>

          {/* Notion Image */}
          <div className="text-center">
            <img 
              src={NotionImg} 
              alt="Login Option" 
              className="img-fluid" 
              style={{ cursor: 'pointer', maxWidth: '100px', height: 'auto' }}
              onClick={handleImageClick}
            />
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;