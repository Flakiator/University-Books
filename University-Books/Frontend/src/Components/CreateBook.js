import Button from "react-bootstrap/esm/Button";
import { useNavigate  } from 'react-router-dom';
import React, { useState } from 'react';
import Form from "react-bootstrap/esm/Form";
import Image from 'react-bootstrap/esm/Image';
import Row from 'react-bootstrap/esm/Row';
import ToggleButtonGroup from 'react-bootstrap/esm/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/esm/ToggleButton';
import Col from 'react-bootstrap/esm/Col';
import { Container } from "react-bootstrap";
import "../index.css"
import cookieManager from "./cookieManager";


 export function CreateBook() {
  const [image, setImage] = useState({preview: "", data: ""});
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState([]);
  const [condition, setCondition] = useState('');
  const [bookType, setBookType] = useState('For sale');
  const [price, setPrice] = useState('');
  const [ISBN, setISBN] = useState('');
  const navigate = useNavigate();

  //book picture
  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleAuthorsChange = (e) => {
    setAuthors(e.target.value);
  };

  const handleISBNChange = (e) => {
    setISBN(e.target.value);
  };

  const handlePriceChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setPrice(value);
  };

  const handleConditionChange = (e) => {
    setCondition(e.target.value);
  };

  //booktype
  const handleRadioChange = (e) => {
    setBookType(e);
  };
    

  async function handleSubmit(event) {
    event.preventDefault();
    let formData = new FormData();
    formData.append("file", image.data);
    const response = await fetch("http://localhost:3001/upload", {
      method: "POST",
      body: formData,
    });
    if (response) {
      const { body } = await response.json();
      const imagePath = (body.imagePath);
        
    const formData2 = new FormData();
    formData2.append('imagePath', imagePath);
    formData2.append('title', title);
    formData2.append('authors', authors);
    formData2.append('price', price);
    formData2.append('condition', condition);
    formData2.append('bookType', bookType);
    formData2.append('isbn', ISBN);
    formData2.append('status', "Available");
    formData2.append('id', title);
    formData2.append('ownerId', cookieManager.get('TOKEN'))
    fetch("http://localhost:3001/book", {
      method: "POST",
      body: formData2,
    })
      .then((response) => {
        if (response.status === 201) {
          console.log('Form submitted successfully');
        } else {
          console.log('Form submission failed');
        }
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
      });
      navigate('/');
    }
  };

  return (
    <Form
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '70vw', // Adjust the maximum width as desired
        margin: '0 auto', // Center the form horizontally
      }}
      onSubmit={handleSubmit}
    >
      <Container>
        <Row className="justify-content-center mt-3">
          <Col md={6}>
            <Image src={image.preview} className="img-fluid d-block mx-auto" style={{ objectFit: "cover", height: "270px", width: '14rem' }} />
          </Col>
        </Row>

        <Row className="justify-content-center mb-3 mt-2">
          <Col md={6}>
            <Form.Group>
              <Form.Control name="file" type="file" onChange={handleFileChange} required />
            </Form.Group>
          </Col>

        </Row>
        <Row className="justify-content-center mb-3">
          <Col md={6}>
            <Form.Group controlId="formBooktitle">
              <Form.Control 
              type="text" 
              placeholder="Book title and edition" 
              onChange={handleTitleChange}
              required />
            </Form.Group>
          </Col>
        </Row>

        <Row className="justify-content-center mb-3">
          <Col md={6}>
            <Form.Group controlId="formBookAuthors">
              <Form.Control 
              type="text" 
              placeholder="Authors"
              onChange={handleAuthorsChange} 
              required />
            </Form.Group>
          </Col>
        </Row>

        <Row className="justify-content-center mb-3">
          <Col md={6}>
            <Form.Group controlId="formISBN">
              <Form.Control 
              type="text" 
              placeholder="(Optional) ISBN"
              onChange={handleISBNChange} 
               />
            </Form.Group>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col md={3}>
            <Form.Group className="mb-3" controlId="formPrice">
              <Form.Control 
              type="text"
              placeholder="Price"
              value={price}
              pattern="[0-9]*"
              onChange={handlePriceChange}
              required />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3" controlId="formBookCondition">
              <Form.Control 
              type="text" 
              placeholder="Description of condition" 
              onChange={handleConditionChange}
              required />
            </Form.Group>
          </Col>
        </Row>

        <Row className="justify-content-center mb-3">
          <Col className="text-center">
            <ToggleButtonGroup
              type="radio"
              name="Booktype-outlined"
              value={bookType}
              onChange={handleRadioChange}
              
            >
              <ToggleButton
                id="Sælg-outlined"
                value="For sale"
                variant={bookType === 'For sale' ? 'primary' : 'outline-primary'}
              >
                For sale
              </ToggleButton>
              <ToggleButton
                id="Udlån-outlined"
                value="For borrow"
                variant={bookType === 'For borrow' ? 'primary' : 'outline-primary'}
                
              >
                For borrow
              </ToggleButton>
            </ToggleButtonGroup>
          </Col>
        </Row>
      </Container>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}