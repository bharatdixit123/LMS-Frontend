import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ActionButton from '../components/ActionButton';
import { useParams } from "react-router-dom";

function GetBookById() {
    const navigate = useNavigate();
    const { id } = useParams();
    console.log(id);
    const[book, setBook] = useState(null);

    useEffect(()=>{
        fetch(`http://localhost:8080/books/getBook/${id}`)
        .then(res => {
            if(!res.ok){
                throw new Error("book not found")
            }return res.json();
        })
        .then(data => {
            console.log(data);
            setBook(data);
        })
        .catch(err => {
            console.error(err);
        })
    }, [id]);

    const handleEdit=(book)=>{
        navigate(`/update/${book.bookId}`)
    }

    const handleDelete = (id) => {
    fetch(`http://localhost:8080/student/activate/${id}`, {
        method: "PUT"
    })
    .then(() => {
        setBook(prev => ({
            ...prev,
            isDeleted: true, active: false
        }));
    })
    .catch(err => console.error(err));
    };

    const handleRestore = (id) => {
    fetch(`http://localhost:8080/student/activate/${id}`, {
        method: "PUT"
    })
    .then(() => {
        setBook(prev => ({
            ...prev,
            isDeleted: false, active: true
        }));
    })
    .catch(err => console.error(err));
};


    if(!book){
    return <div>Loading...</div>
}
    return (
    <>
    <div className="page-container">

    <div className="top-bar">
    <button className="back-btn" onClick={() => navigate("/books")}>
        ← Back to List
        </button>
    </div>    
        
    {book ? (
        <table className="book-table">   
        <thead>
            <tr>
                <td>ID</td>
                <td>Title</td>
                <td>Author</td>
                <td>Category</td>
                <td>Status</td>
                <th>Delete</th>
                <th>Action</th>
            </tr>
        </thead>

        <tbody>
            <tr>
                <td>{book.bookId}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.category}</td>
                <td>
                <span className={book.active ? "status active" : "status inactive"}>
                {book.active ? "Active" : "Inactive"}
                </span>
            </td>
                <td>
                <span className={book.active ? "status active" : "status inactive"}>
                {book.isDeleted ? "Deleted" : "Active"}
                </span>
            </td>
                <td>
                    <ActionButton className="action-buttons"
                    book={book}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onRestore={handleRestore}
                    />
                </td>

            </tr>
        </tbody>
    </table>
    ) : (
        <p className="no-data">No book found.</p>
    )}

    </div>
    </>
    )
}

export default GetBookById