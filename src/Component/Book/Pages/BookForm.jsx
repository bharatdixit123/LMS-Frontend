import React, { useState } from 'react'
import "../Styles/BookForm.css"
import { useNavigate } from 'react-router-dom';

function BookForm() {

    const[book, setBook] = useState({
        title:"",
        author:"",
        category:"",
        quantity:"",
        status:"",
        active:false
    });

    const navigate = useNavigate();

    const handleChange=(e)=>{
        setBook({...book,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit=(e)=>{
        e.preventDefault();

        fetch("http://localhost:8080/books/save" ,{
        method:"POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(book)
    })
        .then(res => {
            if(!res.ok){
                throw new Error("failed to save book")
            }return res.json();
        })
        .then(data => {
            console.log("data", data)
            alert("Book created successfully");

            // form reset
            setBook({
                title:"",
                author:"",
                category:"",
                quantity:"",
                active:false
            })
        })
        .catch(err => {
            console.error(err);
            alert("Error creating student");
        })
    }

    const handleCancel = () => {
        navigate("/books");
    };
  return (
    <>

<div className="form-container">
<form onSubmit={handleSubmit}>

<input
type="text"
name="title"
placeholder="Title"
value={book.title}
onChange={handleChange}
/>

<input
type="text"
name="author"
placeholder="Author"
value={book.author}
onChange={handleChange}
/>

<select
name="category"
value={book.category}
onChange={handleChange}
>
<option value="">Select Category</option>
<option value="FICTION">Fiction</option>
<option value="HISTORY">History</option>
<option value="SCIENCE">Science</option>
<option value="TECHNOLOGY">Technology</option>
<option value="BODY_BUILDING">Body Building</option>
<option value="PROGRAMMING">Programming</option>
</select>

<div className="checkbox-row">
<input
type="number"
name="quantity"
placeholder="Quantity"
value={book.quantity}
onChange={(e) => {
    const qty = Number(e.target.value);

    setBook({
        ...book,
        quantity: qty,
        active: qty > 0 ? book.active : false
    });
}}
/>
</div>

<div className='buttonRow'>
        <button
        type="button"
        onClick={handleCancel}
        className='secondaryBtn'
        >
        Cancel
        </button>


<button type="submit" className='primaryBtn'>Create</button>
</div>

</form>
</div>
    </>
    )
}

export default BookForm