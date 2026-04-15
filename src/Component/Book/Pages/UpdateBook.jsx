import React, { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import "../Styles/UpdateBook.css";

function UpdateBook() {
    const navigate = useNavigate();
    const { id } = useParams();
    const[book, setBook] = useState({
        title:"",
        author:"",
        category:"",
        quantity:"",
        active:false
    });

    const [originalBook, setOriginalBook] = useState(null);
    const [initialData, setInitialData] = useState({});

    const handleChange =(e)=>{
        setBook({...book,
            [e.target.name] : e.target.value
        })
    }

    useEffect(()=>{
        fetch(`http://localhost:8080/books/getBook/${id}`)
        .then(res => {
            if(!res.ok){
                throw new Error("Failed to fetch book")
            }return res.json();
        })
        .then(data =>{
            console.log(data)
            setBook(data); //for pre-fill
            setOriginalBook(data); //for comparison
            setInitialData(data); //for reset
        })
        .catch(err => {
            console.error(err);
        })
    },[id])

    const handleReset = () => {
    setBook(initialData);
    setIsReset(true);
    };

    const handleUpdate =(e)=>{
        e.preventDefault();

        if(!isReset && originalBook.title === book.title &&
            originalBook.author === book.author &&
            originalBook.category === book.category &&
            originalBook.quantity === book.quantity &&
            originalBook.active === book.active
        ) {
        alert("No changes detected");
        return;
    }

        // Only if changes exist
        fetch(`http://localhost:8080/books/update/${id}`, { 
        method:"PUT",
        headers:{
        "Content-Type":"application/json"
    },
    body: JSON.stringify(book)
    })
    .then(res => {
    if (!res.ok) {
        return res.text().then(text => {
            throw new Error(text);
        });
    }
    return res.json();
})
    .then(data => {
        console.log(data)
        alert("Book updated successfully");
    })
    .catch(err => {
        console.error(err);
        alert(err.message);
    })
}

if(!book){
 return <div>Loading...</div>
}

  return (
    <>
    <div className="update-container">

    <button className="back-btn" onClick={()=>{navigate("/books")}}>← Back to List</button>

    <div className="form-card">
    <h1 className="title">Update Book</h1>
    <form onSubmit={handleUpdate} className="student-form">

        <div className='form-group'>
        <label>
        Title:
        </label>
    <input type="text"
        name="title"
        value={book.title}
        onChange={handleChange}
        required
        />
        </div>
        

        <div className='form-group'>
        <label>
        Author:
        </label>
        <input type="text" 
        name="author"
        value={book.author}
        onChange={handleChange}
        required
        />
        </div>
        

        <div className='form-group'>
        <label>
        Category:
        </label>
        <select 
        name="category"
        value={book.category}
        onChange={handleChange}
        required
        className="select"
        >
        <option value="">Select Category</option>
        <option value="FICTION">Fiction</option>
        <option value="HISTORY">History</option>
        <option value="SCIENCE">Science</option>
        <option value="TECHNOLOGY">Technology</option>
        <option value="BODY_BUILDING">Body Building</option>
        <option value="PROGRAMMING">Programming</option>
        </select>
        </div>

        <div className='form-group'>
        <label>
        Quantity:
        </label>
        <input type="number" 
        name="quantity"
        value={book.quantity}
        onChange={handleChange}
        min={1}
        max={10}
        required
        className="input"
        />
        </div>

        <div className="button-group">
        <button type="submit" className="update-btn">
        Update
        </button>

        <button type="button" onClick={handleReset} className="reset-btn"v>Reset</button>
        </div>

        
        </form>
        </div>
        </div>
    </>
)
}

export default UpdateBook
