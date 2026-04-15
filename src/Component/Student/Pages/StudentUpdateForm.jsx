import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import ActionButtons from '../components/ActionButtons';
import { useNavigate } from 'react-router-dom';
import "../Styles/StudentUpdateForm.css";

function StudentUpdateForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [student, setStudent]=useState({
        name:"",
        email:"",
        phone:"",
        active:true
    });

    const [originalStudent, setOriginalStudent] = useState(null);

    const handleActivate = (id) => {
    fetch(`http://localhost:8080/student/activate/${id}`, {
        method: "PUT"
    })
    .then(() => {
        setStudent(prev => ({
            ...prev,
            active: true
        }));
    })
    .catch(err => console.error(err));
};

    const handleDeactivate = (id) => {
    fetch(`http://localhost:8080/student/deactivate/${id}`, {
        method: "PUT"
    })
    .then(() => {
        setStudent(prev => ({
            ...prev,
            active: false
        }));
    })
    .catch(err => console.error(err));
};

    // 1. fetch student when page loads(GET request)
    useEffect(() => {
        fetch(`http://localhost:8080/student/getStudent/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch student");
                }
                return response.json();
            })
            .then(data => {
                console.log("API DATA:", data);
                setStudent(data);   // form pre-fill hoga
                setOriginalStudent(data); // for comparison
            })
            .catch(error => {
                console.error(error);
            });
    }, [id]);

    // 2.Input change handler
    const handleChange = (e) =>{
        setStudent({
            ...student,
            [e.target.name]: e.target.value
        })
    }

    const updateStudent = (e) => {
        e.preventDefault();

        // No change check
        if (
        originalStudent.name === student.name &&
        originalStudent.email === student.email &&
        originalStudent.phone === student.phone &&
        originalStudent.active === student.active
        
    ) {
        alert("No changes detected");
        return;
    }

        // Only if changes exist
        fetch(`http://localhost:8080/student/updateStudent/${id}`, {
            method:"PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        })
        .then(response => {
            if(!response.ok){
                throw new Error("Failed to update student");
            }
            return response.json();
        })
        .then(data=> {
            console.log("Student Created:", data);
        })

        .then(data => {
        alert("Student updated successfully");
        navigate("/");
        })
        
        .catch(error=> {
            console.error(error);
            alert("Error update student");
        });
    };

    const handleList = () => {
        navigate("/");
    }
    return (
    <>
    <div className="update-container">
    
    <button className="back-btn" onClick={()=>{navigate("/students")}}>← Back to List</button>

    <div className="form-card">
    <h1>Update Student</h1>

    <form onSubmit={updateStudent} className="student-form">

        <div className="form-group">
        <label>Name</label>
        <input
            type="text"
            name="name"
            placeholder="Enter name"
            value={student.name}
            onChange={handleChange}
        />
        </div>

        <div className="form-group">
        <label>Email</label>
        <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={student.email}
            onChange={handleChange}
        />
        </div>

        <div className="form-group">
        <label>Phone</label>
        <input
            type="text"
            name="phone"
            placeholder="Enter phone"
            value={student.phone}
            onChange={handleChange}
        />
        </div>

        <div className="button-group">
        <button type="submit" className="update-btn">
        Update
        </button>

        <ActionButtons
        student={student}
        onDeactivate={handleDeactivate}
        onActivate={handleActivate}
        />
    </div>

    </form>
</div>
</div>
    </>
    )
}

export default StudentUpdateForm