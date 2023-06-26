import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Book } from "../Components/Book";

export function Search() {
  // State variables
  const [books, setBooks] = useState([]); // All books
  const [searchTerm, setSearchTerm] = useState(""); // Search term entered by the user
  const [searchResults, setSearchResults] = useState([]); // Books matching the search term

  // Fetch books from API
  async function fetchBooks() {
    const response = await fetch("http://localhost:3001/", {
      method: "GET",
    });
    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
    return data;
  }

  // Fetch books on component mount
  useEffect(() => {
    fetchBooks().then((data) => {
      setBooks(data);
      setSearchResults(data);
    });
  }, []);

  // Handle search input change
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Filter books based on the search term
    const results = books.filter((book) =>
      book.title.toLowerCase().includes(term.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
<>
      <div
        className="d-flex flex-column align-items-center mt-4"
        style={{ textAlign: "center" }}
      >
        <input
        // Input makes searchBar
          type="text"
          placeholder="Search books by title"
          value={searchTerm}
          onChange={handleSearch}
          style={{
            height: '4%',
            borderRadius: "20px",
            padding: "8px 16px",
            fontSize: "16px",
            border: "none",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
            transition: "box-shadow 0.3s ease",
            marginBottom: "16px",
          }}
        />
        <style>
        {`
          @media (min-width: 420px) {
            input {
              width: 400px;
            }
          }

          @media (max-width: 420px) {
            input {
              width: 70%;
            }
          }
        `}
    </style>
        <div className="mx-auto d-flex flex-wrap gap-4 justify-content-center">
          {/* Display search results */}
          {searchResults.map((book, i) => (
            <Link
              to={`/books/${book.id}`}
              style={{ textDecoration: "none" }}
              key={i}
            >
              <div>
                <Book
                  title={book.title}
                  img={book.imagePath}
                  id={book.id}
                  price={book.price}
                  key={i}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
