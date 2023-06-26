import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import cookieManager from '../Components/cookieManager';

const CreateUserPage = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  async function fetchCreate(){
    try{
      const data = new FormData()
      data.append('name',user.name);
      data.append('email',user.email);
      data.append('password',user.password);
      data.append('pfp', file)
      const response = await fetch("http://localhost:3001/user", {
        method:"POST",
        body: data
      })
      if(!response.ok){
        throw new Error("Failed to create user");
    }
    cookieManager.set("TOKEN", user.email, { path: "/" });
    const newUser = await response.json();
    props.setUser(newUser);
    console.log('Form submitted successfully');
  }
    catch (error){
      console.error('Error submitting form:', error);
    };
    navigate('/')
  }


  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const [file, setFile] = useState();
  function handleUpload(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchCreate();
    console.log(user);
    // Reset the form after submission
    setUser({
      name: '',
      email: '',
      password: '',
    });
  };

  return (
    <div class="mx-auto" style ={{width:"100%", maxWidth:"300px"}}>
      <h1>Create User</h1>
      <h5>Upload profile picture</h5>
      <input type="file" onChange={handleUpload}/>
      
      <img src={file} alt ="file" class="mx-auto rounded-circle" style={{width:"100%", maxWidth:"150px", height:"100%", maxHeight:"150px"}}/>

      <Form onSubmit={handleSubmit} className="gap-3" style={{marginTop: "15px"}}>
        <Form.Group controlId="name" className="mb-3">
          <Form.Control
            type="text"
            name="name"
            class="form-control"
            style={{backgroundColor: '#D9F0FF', borderColor: "black"}}
            value={user.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
        </Form.Group>

        <Form.Group controlId="email" className="mb-3">
          <Form.Control
              type="email"
              name="email"
              class="form-control"
              style={{backgroundColor: "#D9F0FF", borderColor: "black"}} // BORDERSHIT!!!
              value={user.email}
              onChange={handleChange}
              placeholder="Institution email"
              required
            />
            <div/>
        </Form.Group>

        <Form.Group controlId="password" className="mb-3">
          <Form.Control
            type="password"
            name="password"
            class="form-control"
            style={{backgroundColor: '#D9F0FF', borderColor: "black"}}
            value={user.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" block>
          Create User
        </Button>
      </Form>
    </div>
  );
};

export default CreateUserPage;
