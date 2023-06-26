import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Book } from "../Components/Book"
export default function Overview(){
    const [books, setBooks] = useState([]);

    async function fetchBooks() {
        try {
          const response = await fetch("http://localhost:3001/", {
            method: "GET",
          });
      
          if (!response.ok) {
            throw new Error("Failed to fetch books");
          }
      
          const data = await response.json();
          return data;
        } catch (error) {
          console.error(error);
          return [];
        }
      }

useEffect(() =>{
    fetchBooks().then((data) => setBooks(data));
}, [])

    return(
    <>
    <div className="d-flex mt-4">
        <div className=" mx-auto d-flex flex-wrap gap-4 justify-content-center">
            {books.map((book, i) => (
                <Link to={`/books/${book.id}`} style={{ textDecoration: "none" }} key={i}>
                    <div>
                    <Book title={book.title} img={book.imagePath} id={book.id} price={book.price} key={i} />
                    </div>
                </Link>
        ))}
        </div>
    </div>
    </>
    )
}