import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate  } from 'react-router-dom';
import './BookDetails.css';
import Card from "react-bootstrap/esm/Card";
import cookieManager from "../Components/cookieManager";
import img from '../Components/images/heart.png'
export function BookDetails(props) {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [Loading, setLoading] = useState(true);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const navigate = useNavigate();

  async function fetchBook() {
    console.log("Fettching book")
    const response = await fetch(`http://localhost:3001/books/${id}`, {
      method: "GET",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setBook(data);
    setLoading(false)
    
  };

  useEffect(() => {
    setTimeout(() => {
        setLoading(false);
      }, 2500);
      fetchBook().then(() => {
        if (book.ownerId === cookieManager.get("TOKEN")) {
          setIsOwner(true);
        }
        if (props.user.favorites && props.user.favorites.length > 0) {
          setIsFavorite(props.user?.favorites.some((favorite) => JSON.stringify(favorite) === JSON.stringify(book)));
          console.log(isFavorite);
        }
      });
  },[book.ownerId, props.user.favorites]);

  const handleDelete = async (e) => {
    await fetch(`http://localhost:3001/books/${book.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "same-origin",
    })
      .then((response) => {
        if (response.status === 200) {
          console.log('Book deleted successfully');
        } else {
          console.log('Failed to delete book');
        }
      })
      .catch((error) => {
        console.error('Error deleting book:', error);
      });
    navigate('/');
  };

  const handleAquire = async (e) => {
    props.user.orders.push(book);
    const data = {
      email: props.user.email,
      user: props.user
    };
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

      const data2 = {
        bookId: book.id,
        book: book
      };
      console.log(book.id)
      console.log(book)
      await fetch("http://localhost:3001/updatebook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data2),
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

      navigate('/');
    }
  
  if (Loading) {
    return <div>Loading...</div>;
    
  }

  if (!book) {
    return <div>Error: Book not found.</div>;
  }



  const handleButtonClick = () => {
    if(! ((book.status === "sold" && !isOwner) || book.status === "loaned"))
    {
      if(isButtonPressed)
      {
        if(isOwner)
        {
          if(book.status === "Available")
          {
            if(isButtonPressed)
            {
              handleDelete();
            }
          }
        }
        else
        {
          if(book.status === "Available")
          {
            if(book.bookType === "For sale")
            {
              book.status = "sold";
            }
            else if(book.bookType === "For borrow")
            {
              book.status = "loaned";
            }
            handleAquire();
          }
        }
      }

      setIsButtonPressed(!isButtonPressed);
    }
  };


  const handleHBClick = async (e) => {
    const tempUser = {...props.user};
    if(isFavorite){
      console.log("removing from favorites");
      tempUser.favorites.splice(tempUser.favorites.indexOf((item) => item.id === book.id), 1);
    } else {
      console.log("adding to favorites");
      tempUser.favorites = tempUser.favorites || [];
      tempUser.favorites.push(book);
    }
    const data = {
      email: tempUser.email,
      user: tempUser
    };
    await fetch("http://localhost:3001/updateuser", {
      method: "POST",
      mode: 'cors',
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
        if (response.status === 204) {
          console.log('user updated successfully');

          setIsFavorite(prevState => !prevState)
          props.setUser(tempUser);

        } else {
          console.log('user update failed');
        }
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      });
    }

    
  const Button = () => {
    if (isOwner) { // !isowner switch for testing
      return (
        <div className="text-center">
          <button
            variant="danger"
            type="button"
            className="btn btn-primary btn-lg"
            onClick={handleButtonClick}
            style={{marginTop: "15px", backgroundColor: '#d11a2a', border: '1px solid #ccc',}}

          >
            {isButtonPressed ? "Are you sure? DELETE" : "Delete"}
          </button>
        </div>
      );
    } else {
      return (
        <><div className="text-center"></div>
          <button
          style={buyButtonStyle}
          type="button"
          className="btn btn-primary btn-lg"
          onClick={handleButtonClick}
        >
          {isButtonPressed ? "Aquire" : "Contact owner"}
        </button></>
        
      );
    }
  };

  function heartButton() {  
    return (
      <button className="heartButton " onClick={handleHBClick} style={heartButtonStyle}>          
        <img src={img} alt="Favorite" width={30} /> 
      </button>
    );
  }

  const heartButtonStyle = {
    backgroundColor: isFavorite ? "#A3D5FF" : "transparent",
    color: isFavorite ? "black" : "white",
    position: "absolute",
    right: "35%",
    border: "none",
  };
  

  const emailText = () => {
    if(isButtonPressed && !isOwner)
    {
      return book.ownerId;
    }
  }

  const buyButtonStyle = {
    marginTop: isButtonPressed ? "1px" :"15px",
    backgroundColor: isButtonPressed ? "#A3D5FF" : "#FFA065",
    color: isButtonPressed ? "black" : "white",
    borderColor: "#000000",
  };

  return (
    <div style={{padding: "10px"}}>
      {/* Other book details */}
      <div>
        <div className="d-flex justify-content-end " style={{alignItems: "end"}}>
        <Card className="mx-auto" style={{marginTop: "20px", width: '14rem' }}>
          <Card.Img variant="top" src={book.imagePath} alt="Header Image" style={{ objectFit: "cover", height: "270px" }} />
        </Card>
        {heartButton()}

        </div>
      </div>
      <div style={{maxWidth: "600px"}} className="container">
      <div className="row">
        <h5 style={{marginTop: "15px"}}>{book.title}</h5>
      </div>
      <div className="row">
        <div className="LeftRight">
          <b style={{fontSize:"large" }}>{book.price} kr.</b> <p style={{padding: "2px", marginRight: "2px"}} className="info-card">{book.status}</p>
        </div>
      </div>

      <div className="row mt-4">
        <div>
          <div className="box">
          {/*
            <div className="box-content">
              <h5 style={{marginLeft: "10px"}}>Edition</h5>
              <p style={{marginRight: "10px"}}>{book.edition}</p>
            </div>
            <div className="dotted-line"></div>
          */}
            <div className="box-content">
              <h5 style={{marginLeft: "10px"}}>Authors</h5>
              <p style={{marginRight: "10px"}}>{book.authors}</p>
            </div>
            <div className="dotted-line"></div>
            <div className="box-content">
            {/*
              <h5 style={{marginLeft: "10px"}}>Language</h5>
              <p style={{marginRight: "10px"}}>{book.language}</p>
            </div>
            <div className="dotted-line"></div>
            <div className="box-content">
            */}
              <h5 style={{marginLeft: "10px"}}>Condition</h5>
              <p style={{marginRight: "10px"}}>{book.condition}</p>
            </div>
            <div className="dotted-line"></div>
            <div className="box-content">
              <h5 style={{marginLeft: "10px"}}>Sale type</h5>
              <p style={{marginRight: "10px"}}>{book.bookType}</p>
            </div>
            <div className="dotted-line"></div>
            <div className="box-content">
              <h5 style={{marginLeft: "10px"}}>ISBN</h5>
              <p style={{marginRight: "10px"}}>{book.isbn}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center">
        {emailText()}
        {Button()}
      </div>
    </div>
    </div>
    
  );
}