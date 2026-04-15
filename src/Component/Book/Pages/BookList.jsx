import React, { useEffect, useState } from 'react'
import ActionButton from '../components/ActionButton';
import { useNavigate } from 'react-router-dom';
import SearchBook from '../components/SearchBook';
import BookStatus from '../components/BookStatus';
import "../Styles/BookList.css"

function BookList() {
    const navigate = useNavigate();
    
    const[books, setBooks] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const fetchAllBooks = () => {
        fetch("http://localhost:8080/books/allBooks")
            .then(res => {
                if(!res.ok){
                    throw new Error("failed to fetch books");
                }return res.json();
            })
            .then(data => {
                setBooks(data);
                console.log("Data:", data);
            })
            .catch(err => {
                console.error(err);
            })
        }

        useEffect(() => {
            fetchAllBooks();    
        },[]);

        const handleSearch = (keyword, type) => {
        let url = "";

        if (type === "title") {
            url = `http://localhost:8080/books/search?title=${keyword}`;
        } else if (type === "author") {
            url = `http://localhost:8080/books/author?author=${keyword}`;
        }

        fetch(url)
        .then(res => {
            if (!res.ok) throw new Error("Search failed");
            return res.json();
        })
        .then(data => {
            if (!Array.isArray(data)) {
                setBooks(data ? [data] : []);
            } else {
                setBooks(data);
            }
            setIsSearching(true);
        })
        .catch(err => {
            console.error(err);
            setBooks([]);
        });
};

        const handleDelete = (id)=>{
        fetch(`http://localhost:8080/books/delete/${id}`, {
            method:"DELETE"
        })
        .then(res => {
            if(!res.ok){
                throw new Error("Failed to fetch book");
            }return res.text();
        })
        .then(()=>{
            setBooks(pre => 
                pre.map(book => 
                    book.bookId === Number(id)
                    ? {...book, isDeleted: true, active: false}
                    :book
                )
            )
        })
        .catch(err => console.error(err));
        };

        const handleRestore = (id)=>{
            fetch(`http://localhost:8080/books/restore/${id}`, {
            method:"PUT"
        })
        .then(res=>{
            if(!res.ok){
                throw new error("Failed to fetch book")
            }return res.text();
        })
        .then(() => {
            setBooks(pre =>
                pre.map(book => 
                    book.bookId === Number(id)
                    ? {...book, isDeleted: false, active: true}
                    :book
                )
            );
        })
        .catch(err => console.error(err));
        };

        const handleView = (book) => {
            console.log("BOOK:", book);
    console.log("BOOK ID:", book?.bookId);
    
            navigate(`/books/view/${book.bookId}`);
    };

        const handleEdit = (book) => {
            console.log("BOOK:", book);
            console.log("ID:", book.bookId);

            navigate(`/books/update/${book.bookId}`)
        }

        const handleFilterByStatus=(status)=>{
            if (status === "ALL") {
            fetch("http://localhost:8080/books/allBooks")
            .then(res=>{
                if(!res.ok){
                    throw new Error("Failed to fetch")
                }return res.json();
            })
            .then(data => setStudents(data));
            return;
        }

        fetch(`http://localhost:8080/books/status?active=${status}`)
            .then(res => res.json())
            .then(data => setBooks(data));
    };
        
    return (
    <>
    <div className="book-container">

    <div className="top-bar">
        <button className="home-btn" onClick={() => navigate("/")}>
        🏠 Home
        </button>

        <h2>Book Management</h2>
    </div>

{isSearching && (
<button 
className="back-btn"
onClick={() => {
fetchAllBooks();
setIsSearching(false);
}}
>
← Back to List
</button>
)}

<div className="filter-bar">
<button onClick={() => navigate("/books/create")}>+ New Book</button>

<SearchBook onSearch={handleSearch} />
<BookStatus onFilter={handleFilterByStatus} />
</div>

<div className="table-container">
<table className="book-table">
<thead>
<tr>
<td>ID</td>
<td>Title</td>
<td>Author</td>
<td>Category</td>
<td>Quantity</td>
<td>Status</td>
<td>Delete</td>
<td>Action</td>
</tr>
</thead>

<tbody>
{books.length === 0 ? (
<tr>
<td colSpan="8" className="empty-row">
No books found
</td>
</tr>
) : (
books.map(book => {
return(
<tr key={book.bookId}>

<td>{book.bookId}</td>
<td>{book.title}</td>
<td>{book.author}</td>
<td>{book.category}</td>
<td>{book.quantity}</td>
<td className={book.active ? "status-active" : "status-inactive"}>{book.active ? "Active" : "Inactive"}</td>
<td className={book.isDeleted ? "status-nDelete" : "status-delete"}>{book.isDeleted ? "Deleted" : "Active"}</td>

<td className="action-buttons">
<ActionButton 
book={book}
onView={handleView}
onDelete={handleDelete}
onRestore={handleRestore}
onEdit={handleEdit}
/>
</td>

</tr>
)
})
)}
</tbody>

</table>
</div>

</div>
    </>
    )
}

export default BookList


