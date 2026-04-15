    import React, { useState } from 'react'
    import "../Styles/IssueBook.css"
import { useNavigate } from 'react-router-dom';

    function IssueBook() {
        const navigate = useNavigate();

        const[formData, setFormData]=useState({
            studentId: "",
            bookId: ""
        });

        const handleChange = (e) => {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        };

        const [response, setResponse] = useState(null);


        const issueBook = () => {
            if (!formData.studentId || !formData.bookId) {
            alert("Error: Student ID and Book ID required are required!");
            return;
        }

            fetch("http://localhost:8080/record/issues", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            .then((res) => res.json())
            .then((data) => {
            console.log(data); 
            setResponse(data);
        })

        .catch((error) => {
            console.log(error);
        });
        }
    return (
        <>

        <div className="page-container">

            <div className="top-bar">
        <button className="back-btn" onClick={() => navigate("/records")}>
        ← Back to List
        </button>
        <h2>Record Details</h2>
    </div>

        <div className="container">
    <h2>Issue Book</h2>

    <input 
        type="text"
        name="studentId"
        placeholder="StudentId"
        onChange={handleChange}
    />

    <input
        type="text"
        name="bookId"
        placeholder="Book ID"
        onChange={handleChange}
    />

    <button onClick={issueBook}>Issue Book</button>

    {response && (
        <div className="response-box">
            <h3>{response.message}</h3>

            {response.data && (
                <>
                    <p>Student: {response.data.studentName}</p>
                    <p>Book: {response.data.bookTitle}</p>
                    <p>Status: {response.status}</p>
                </>
            )}
        </div>
    )}
</div>
</div>

        </>
    )
    }

    export default IssueBook