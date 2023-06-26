import { Link } from "react-router-dom";
import { Book } from "../Components/Book"
export function Favorites(props){
    console.log(props.user.favorites)
    const favorites = props.user.favorites || [];
    return(
        <>
    <div className="d-flex mt-4">
        <div className=" mx-auto d-flex flex-wrap gap-4 justify-content-center">
            {favorites.map((book, i) => (
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