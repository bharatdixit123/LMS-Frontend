import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import ActionButtons from './ActionButtons';

function GetRecordById() {

  const navigate=useNavigate();
  const {id} = useParams();
  console.log(id)

  const[record, setRecord] =useState();

        useEffect(() => {
        fetch(`http://localhost:8080/record/view/${id}`)
        .then(res => {
            if(!res.ok){
                throw new Error("Record not found");
            } return res.json()
        })
        .then(data => {
            console.log(data)
            setRecord(Array.isArray(data) ? data : data.data);
        })
        .catch(err => {
            console.error(err);
        })
    }, [id])

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
            setRecord(prev =>
                prev.map(record =>
                    record.issueId === id
                        ? { ...record, status: "RETURNED" }
                        : record
                )
            );
        })
        .catch(err => console.error(err));
    };

    if(!record){
    return <div>Loading...</div>
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

    {record ? (
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
        <tr>
          <td>{record.issueId}</td>
                            <td>{record.studentName}</td>
                            <td>{record.studentId}</td>
                            <td>{record.bookTitle}</td>
                            <td>{record.bookId}</td>
                            <td>{record.issueDate}</td>
                            <td>{record.dueDate}</td>
                            <td>{record.returnDate || "Not Returned"}</td>
                            {/* <td>{record.status}</td> */}

                            <td>
                                <span className={`status ${record.status.toLowerCase()}`}>
                                {record.status}
                                </span>
                                </td>

                            <td>{record.fine}</td>
                            
                            <td>
                                <ActionButtons
                                    record={record}
                                    onReturn={handleReturn}
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

export default GetRecordById