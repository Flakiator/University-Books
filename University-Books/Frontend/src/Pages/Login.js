import { useState } from "react";
import { useNavigate  } from 'react-router-dom';
import { Form } from 'react-bootstrap'; 
import cookieManager from "../Components/cookieManager";

export function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isActive1, setIsActive1] = useState(false);
  const [isActive2, setIsActive2] = useState(false);
  const navigate = useNavigate();
  

  
  function handleSubmit(event) {
    event.preventDefault();
    fetch(`http://localhost:3001/user/${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((response) => {
    if (response.status === 200) {
      console.log("Login successful");
      cookieManager.set("TOKEN", email, { path: "/" });
      return response.json(); // Parse the response data
    } else {
      console.log("Login failed");
      throw new Error("Login failed"); // Reject the promise chain
    }
  })
  .then((user) => {
    if(user.password === password){
    props.updateUser(user); // Update the user in the App component
    navigate("/");
    }
  })
  .catch((error) => {
    console.error("Error logging in:", error);
  });
console.log(`The following sign-in attempt was made: Email=${email}, Password=${password}`);
}

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  return (
    <div
      id="container"
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // Center horizontally
        justifyContent: "center", // Center vertically
      }}
      className=""
    >
           <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Georgia&display=swap');

          h1 {
            font-family: 'Georgia', serif;
            /* Add any other styling properties for the logo */
          }
        `}
      </style>
      <form
        style={{
          width: "60%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // Center horizontally
        }}
        className=""
        onSubmit={handleSubmit}
      >
        <h1
          style={{
            marginTop: "6rem",
            fontSize: "4rem",
            lineHeight: "1",
            textAlign: "center", // Center horizontally
          }}
          className=""
        >
          University books
        </h1>

        <h1
          style={{
            marginTop: "0.3rem",
            fontSize: "1.5rem",
            lineHeight: "1",
            textAlign: "center", // Center horizontally
          }}
          className=""
        >
          Marketplace
        </h1>

      <Form>
        <Form.Group controlId="email">
        <div
          class="form-floating mb-3"
          style={{ width: "100%", maxWidth: "300px", marginTop: "8rem"}}
        >
          <input
            type="email"
            class="form-control"
            style={{backgroundColor: "#D9F0FF", borderColor: "black"}} // BORDERSHIT!!!
            id="floatingInput"
            placeholder="name@example.com"
            onChange={handleEmailChange}
            required
          />
          <label for="floatingInput">Email address</label>
        </div>
        </Form.Group>
        <div
          class="form-floating"
          style={{ width: "100%", maxWidth: "300px"}}
        >
          <input
            type="password"
            class="form-control"
            style={{backgroundColor: "#D9F0FF", borderColor: "black"}} // BORDERSHIT!!!
            id="floatingPassword"
            placeholder="Password"
            onChange={handlePasswordChange}
          />
          <label for="floatingPassword">Password</label>
        </div>
        </Form>
        <div style={{ marginTop: "2rem", width: "100%", display: "flex", justifyContent: "center" }}>
          <button
            type="submit"
            className={`btn btn-primary btn-lg mx-auto ${isHovered1 ? "hovered" : ""} ${isActive1 ? "active" : ""}`}
            style={{
              backgroundColor: isHovered1 ? "#75b6f2" : "#83C9F4",
              borderColor: "#83C9F4",
              width: "120px",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={() => setIsHovered1(true)}
            onMouseLeave={() => setIsHovered1(false)}
            onMouseDown={() => setIsActive1(true)}
            onMouseUp={() => setIsActive1(false)}
          >
            Log in
          </button>
        </div>
        <div style={{ marginTop: "2rem", width: "100%", display: "flex", justifyContent: "center" }}>
          <button
            onClick={() => (window.location.href = '/create-profile')}
            type="button"
            className={`btn btn-primary btn-lg mx-auto ${isHovered2 ? "hovered" : ""} ${isActive2 ? "active" : ""}`}
            style={{
              backgroundColor: isHovered2 ? "#75b6f2" : "#83C9F4",
              borderColor: "#83C9F4",
              width: "196px",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={() => setIsHovered2(true)}
            onMouseLeave={() => setIsHovered2(false)}
            onMouseDown={() => setIsActive2(true)}
            onMouseUp={() => setIsActive2(false)}

          >
            Create New User
          </button>
        </div>
      </form>
    </div>
  );
}