import React, { useEffect, useState } from 'react'
import ActionButtons from '../components/ActionButtons';
import { useNavigate } from "react-router-dom";
import GetStudentByStatus from '../components/GetStudentsByStatus';
import SearchStudent from "../components/SearchStudent";

import "../Styles/StudentList.css";


function StudentList() {
    
    const[students,setStudents]=useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const navigate = useNavigate();


    const fetchAllStudents = () => {
        console.log("Fetching all students...");
        
        fetch("http://localhost:8080/student/allStudents")
        .then(response => {
            if(!response.ok){
                throw new Error("failed to fetch students");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
                setStudents(data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(() => {
        fetchAllStudents();
    }, []);

    const handleSearch = (keyword, type) => {

    let url = "";

    if (type === "name") {
        url = `http://localhost:8080/student/search?keyword=${keyword}`;
    } else if (type === "email") {
        url = `http://localhost:8080/student/email?email=${keyword}`;
    }

    fetch(url)
        .then(res => {
            if (!res.ok) throw new Error("Search failed");
            return res.json();
        })
        .then(data => {
            // agar email single object return kare
            if (!Array.isArray(data)) {
                setStudents(data ? [data] : []);
            } else {
                setStudents(data);
            }
            setIsSearching(true);
        })
        .catch(err => {
            console.error(err);
            setStudents([]);
        });
};

    const handleFilterByStatus = (status) => {

        if (status === "ALL") {
        fetch("http://localhost:8080/student/allStudents")
            .then(res => res.json())
            .then(data => setStudents(data));
        return;
    }

        fetch(`http://localhost:8080/student/status?active=${status}`)
            .then(res => res.json())
            .then(data => setStudents(data));
    };

    const handleActivate = (id) => {
    fetch(`http://localhost:8080/student/activate/${id}`, {
        method: "PUT"
    })
    .then(() => {
        setStudents(prev =>
            prev.map(student =>
                student.studentId === Number(id)
                    ? { ...student, active: true }
                    : student
            )
        );
    })
    .catch(err => console.error(err));
};

    const handleDeactivate = (id) => {
    fetch(`http://localhost:8080/student/deactivate/${id}`, {
        method: "PUT"
    })
    .then(() => {
        setStudents(prev =>
            prev.map(student =>
                student.studentId === Number(id)
                    ? { ...student, active: false }
                    : student
            )
        );
    })
    .catch(err => console.error(err));
};

    const handleEdit = (student) => {
    navigate(`/students/update/${student.studentId}`);
    };

    const handleView = (student) => {
    navigate(`/students/view/${student.studentId}`);
    };

    return (
    <div className="student-container">

        {/* 🔥 Top Bar */}
    <div className="top-bar">
      <button className="home-btn" onClick={() => navigate("/")}>
        🏠 Home
      </button>

      <h2>Student Management</h2>
    </div>

        {isSearching && (
    <button 
        className="back-btn" 
        onClick={() => {
            fetchAllStudents();
            setIsSearching(false);
        }}
    >
        ← Back to List
    </button>
)} 

    <div className="filter-bar">
        <button onClick={() => navigate("/students/create")}>+ New Student</button>

        <SearchStudent onSearch={handleSearch} />
        <GetStudentByStatus onFilter={handleFilterByStatus} />
    </div>

    <div className="table-container">
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
            {students.length === 0 ? (
                <tr>
                    <td colSpan="6" className="empty-row">
                        No students found
                    </td>
                </tr>
            ) : (
                students.map((student) => (
                    <tr key={student.studentId}>
                        <td>{student.studentId}</td>
                        <td>{student.name}</td>
                        <td>{student.email}</td>
                        <td>{student.phone}</td>
                        <td className={student.active ? "status-active" : "status-inactive"}>
                            {student.active ? "Active" : "Inactive"}
                        </td>
                        <td className="action-buttons">
                            <ActionButtons 
                                student={student}
                                onEdit={handleEdit}
                                onDeactivate={handleDeactivate}
                                onActivate={handleActivate}
                                onView={handleView}
                            />
                        </td>
                    </tr>
                ))
            )}
        </tbody>
    </table>
    </div>

</div>
    )
}

export default StudentList