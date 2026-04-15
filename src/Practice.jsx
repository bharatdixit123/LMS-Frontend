import React, { useEffect, useState } from 'react'
import BookStatus from './Component/Book/components/BookStatus';
import ActionButton from './Component/Book/components/ActionButton';

function Practice() {
    const[books, setBooks] = useState([]);
    const id = 1; 

    const fetchAllBooks = () => {
        fetch("http://localhost:8080/books/allBooks")
        .then(res => {
            if(!res.ok){
                throw new Error("Failed to fetch")
            } return res.json();
        })
        .then(data => {
            console.log(data);
            setBooks(data);
        })
        .catch(err => {
            console.error(err);
        });
    }

        useEffect(() => {
            fetchAllBooks();
        },[])

        const handleRestore = (id) => {
            fetch(`http://localhost:8080/books/status/${id}`)
            .then(res => {
                if(!res.ok){
                    throw new Error("Failed to fetch");
                } return res.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch(err => {
                console.error(err);
            })
        };
  return (
    <>
    <table>
        <thead>
            <tr>
                <td>ID</td>
                <td>Title</td>
                <td>Author</td>
                <td>Category</td>
                <td>Status</td>
                <td>isDelete</td>
                <td>Action-Btn</td>
            </tr>
        </thead>

        <tbody>
            {
            books.map(user => (
            <tr key={user.bookId}>
                <td>{user.bookId}</td>
                <td>{user.title}</td>
                <td>{user.author}</td>
                <td>{user.category}</td>
                <td>{user.status ? "Active" : "Inactive"}</td>
                <td>{user.isDeleted ? "Delete" : "Active"}</td>

                <td>
                    <ActionButton 
                    onRestore={handleRestore}
                    />
                </td>



            </tr>
            ))
        }
        </tbody>
    </table>
    </>
  )
}

export default Practice