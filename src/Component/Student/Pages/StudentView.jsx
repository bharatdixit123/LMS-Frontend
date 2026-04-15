import React from 'react'
import { useState, useEffect } from 'react';
import ActionButtons from '../components/ActionButtons';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../Styles/StudentView.css"


function GetStudentById() {
    const navigate = useNavigate();

    const { id } = useParams();
    const [student, setStudent]=useState(null)

    console.log("PARAM ID:", id);
    useEffect(() => {
        fetch(`http://localhost:8080/student/getStudent/${id}`)
        .then(response => {
        if(!response.ok){
                throw new Error("failed to fetch student");
            }
            return response.json();
        })
            .then(data => {
            console.log(data);
                setStudent(data);
            })
            .catch(error => {
                console.error(error);
            })
        },[id]);

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

    const handleEdit = (student) => {
    navigate(`/update/${student.studentId}`);
    };

// Prevent component crash during initial render
// student is null until API response arrives
// So return loading UI instead of accessing null object
        if (!student) {
        return <div>Loading...</div>;
    }
    return (
    <>
    <div className="page-container">

    <div className="top-bar">
        <button className="back-btn" onClick={() => navigate("/students")}>
        ← Back to List
        </button>
        <h2>Student Details</h2>
    </div>

    {student ? (
        <table className="student-table">
        <thead>
            <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Action</th>
            </tr>
        </thead>

        <tbody>
            <tr>
            <td>{student.studentId}</td>
            <td>{student.name}</td>
            <td>{student.email}</td>
            <td>{student.phone}</td>
            <td>
                <span className={student.active ? "status active" : "status inactive"}>
                {student.active ? "Active" : "Inactive"}
                </span>
            </td>
            <td>
                <ActionButtons className="action-buttons"
                student={student}
                onEdit={handleEdit}
                onDeactivate={handleDeactivate}
                onActivate={handleActivate}
                />
            </td>
            </tr>
        </tbody>
        </table>
    ) : (
        <p className="no-data">No student found.</p>
    )}

    </div>

    </>
    )
}

export default GetStudentById