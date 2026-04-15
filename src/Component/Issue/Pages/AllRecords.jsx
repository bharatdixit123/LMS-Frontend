import React, { useEffect, useState } from 'react';
import ActionButtons from '../components/ActionButtons';
import "../Styles/AllRecords.css"

import { Navigate, useNavigate } from 'react-router-dom';
import GetRecordsByStudentName from '../components/GetRecordsByStudentName';
import RecordStatus from '../components/RecordStatus';

function AllRecords() {

    const navigate = useNavigate();
    const [records, setRecords] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const loadAllRecords = () => {
        fetch("http://localhost:8080/record/records")
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to fetch");
                }
                return res.json();
            })
            .then(data => {
                console.log(data);
                setRecords(Array.isArray(data) ? data : data.data);
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        loadAllRecords();
    }, []);

    const handleReturn = (id) => {
        fetch(`http://localhost:8080/record/return/${id}`, {
            method: "PUT"
        })
        .then(res => {
            if (!res.ok) {
                throw new Error("failed to fetch");
            }
            return res.json();
        })
        .then(() => {
            setRecords(prev =>
                prev.map(record =>
                    record.issueId === id
                        ? { ...record, status: "RETURNED" }
                        : record
                )
            );
        })
        .catch(err => console.error(err));
    };

    const handleView = (id) =>{
        console.log("issueId: ",id)
        navigate(`/view/${id}`)
    }

    const handleSearch = (keyword) => {
        fetch(`http://localhost:8080/record/name/${keyword}`)
            .then(res => {
                console.log("STATUS:", res.status);
                if (!res.ok) throw new Error("Search failed");
                return res.json();
            })
            .then(data => {
                console.log(data);
                //setRecords(Array.isArray(data) ? data : (data ? [data] : []));
                setRecords(data.data);
                setIsSearching(true);
            })
            .catch(err => {
                console.error(err);
                setRecords([]);
            });
    };

    const handleFilterByStatus=(status)=>{
            if (status === "ALL") {
            fetch("http://localhost:8080/record/records")
            .then(res=>{
                if(!res.ok){
                    throw new Error("Failed to fetch")
                }return res.json();
            })

            .then(data => {
                console.log(data);
                setRecords(Array.isArray(data) ? data : data.data);
            })
            return;
        }

        fetch(`http://localhost:8080/record/issue?status=${status}`)
            .then(res => res.json())
            .then(data => setRecords(Array.isArray(data) ? data : []));
    };

    return (
        <>
        <div className="record-container">

    <div className="top-bar">
        <button className="home-btn" onClick={() => navigate("/")}>
        🏠 Home
        </button>

        <h2>Record Management</h2>
    </div>

        {isSearching && (
    <button 
    className="back-btn"
        onClick={() => {
            loadAllRecords();
            setIsSearching(false);
        }}
    >
        ← Back to List
    </button>
)}

<div className="filter-bar">
        <button onClick={() => navigate("/records/issue")}>+ New Student</button>

        <GetRecordsByStudentName onSearch={handleSearch} />
        <RecordStatus onFilter={handleFilterByStatus} />
    </div>

    <div className="table-container">
                    <table className="record-table">
                <thead>
                    <tr>
                        <th>Issue ID</th>
                        <th>Student Name</th>
                        <th>Student ID</th>
                        <th>Book Title</th>
                        <th>Book ID</th>
                        <th>Issue Date</th>
                        <th>Due Date</th>
                        <th>Return Date</th>
                        <th>Status</th>
                        <th>Fine Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {records.length === 0 ? (
                        <tr>
                            <td colSpan="11" className="empty-row">No records found</td>
                        </tr>
                    ) : (
                        records.map(record => (
                            <tr key={record.issueId}>
                                <td>{record.issueId}</td>
                                <td>{record.studentName}</td>
                                <td>{record.studentId}</td>
                                <td>{record.bookTitle}</td>
                                <td>{record.bookId}</td>
                                <td>{record.issueDate}</td>
                                <td>{record.dueDate}</td>
                                <td>{record.returnDate || "Not Returned"}</td>
                                {/* <td className={`status ${record.status.toLowerCase()}}`>{record.status}</td> */}
                                
                                <td>
                                <span className={`status ${record.status.toLowerCase()}`}>
                                {record.status}
                                </span>
                                </td>

                                <td>{record.fine}</td>
                                <td>
                                    <ActionButtons className="action-buttons"
                                        record={record}
                                        onReturn={handleReturn}
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
        </>
    );
}

export default AllRecords;