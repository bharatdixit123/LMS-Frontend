import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';

function ReturnBook() {
const {id} = useParams();
        useEffect(() => {
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
    },[])
  return (
    <>
    
    </>
  )
}

export default ReturnBook