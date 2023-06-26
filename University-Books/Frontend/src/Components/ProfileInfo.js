import React, { useState } from 'react';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Form from 'react-bootstrap/esm/Form';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';
import cookieManager from './cookieManager';

export default function ProfileInfo(props) {
  const [username, setUsername] = useState(props.name);
  const [password, setPassword] = useState(props.password);
  const [email, setEmail] = useState(props.email);
  const [isEditable, setIsEditable] = useState(false);
  const navigate = useNavigate();

  const handleEditClick = async () => {
    setIsEditable(!isEditable);
    if(isEditable){
      props.user.name = username;
      props.user.email = email;
      props.user.password = password;
      const data = {
        name: username,
        email: email,
        password: password,
        user: props.user,
      };
      console.log(JSON.stringify(props.user))
      await fetch("http://localhost:3001/updateuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((response) => {
          if (response.status === 204) {
            console.log('user updated successfully');
          } else {
            console.log('user update failed');
          }
        })
        .catch((error) => {
          console.error('Error updating user:', error);
        });
    }
  };

  const handleLogOutClick = () => {
    cookieManager.remove("TOKEN", { path: "/" });
    navigate("/")
  };

  return (
    <div style={{maxWidth: "80%", display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '65vh', padding: '20px' }}>
      {/* Profile Picture */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ width: '150px', height: '150px', backgroundColor: '#f0f0f0', borderRadius: '50%' }}>
          {/* Placeholder for the profile picture */}
          {/* You can include an actual image here */}
          <img src={require('./images/profil.png')} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
        </div>
      </div>
      {/* User Info Form */}
      <div style={{marginTop: "10px", width: '150%', maxWidth: '800px', border: '1px solid #ccc', borderRadius: '4px', padding: '20px', position: 'relative' }}>
        <Link to="/favorites" className="btn btn-primary" style={{ position: 'absolute', left: '0', top: '-44px' }}>
          Favorites
        </Link>
        <Button
          variant="secondary"
          style={{
            position: 'absolute',
            right: '0',
            top: '-44px',
            backgroundColor: isEditable ? 'gray' : '#D9F0FF',
            color: isEditable ? 'white' : 'black',
            border: '1px solid #ccc'
          }}
          onClick={handleEditClick}
        >
          {isEditable ? 'Save' : 'Edit'}
        </Button>
        <Button
          variant="danger"
          style={{
            position: 'absolute',
            right: '0',
            top: '-150px',
            border: '1px solid #ccc'
          }}
          onClick={handleLogOutClick}
        >
          Log out
        </Button>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', }}>
         
          {/* Username Field */}
          <FloatingLabel controlId="floatingUsername" label="Username">
            <Form.Control type="text" placeholder="Username" value={username} readOnly={!isEditable} onChange={e => setUsername(e.target.value)} />
          </FloatingLabel>

          {/* Password Field */}
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control type="password" placeholder="Password" value={password} readOnly={!isEditable} onChange={e => setPassword(e.target.value)} />
          </FloatingLabel>

          {/* Email Field */}
          <FloatingLabel controlId="floatingEmail" label="Email address">
            <Form.Control type="email" placeholder="name@example.com" value={email} readOnly={true} onChange={e => setEmail(e.target.value)} />
          </FloatingLabel>
        </div>
      </div>

      <Link to="/add" className="btn btn-primary" style={{ marginTop: '20px' , backgroundColor: '#FFA065', color: 'black', border: '1px solid #ccc'}}>
  Create listing
</Link>
    </div>
  );
}
