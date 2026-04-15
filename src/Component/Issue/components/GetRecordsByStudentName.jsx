import React, { useState } from 'react'
import "../Styles/AllRecords.css";

function GetRecordsByStudentName({onSearch}) {
    const[keyword, setKeyword] = useState("");

    const handleSearch=()=>{
        if (!keyword.trim()) {
        alert("Please enter student name");
        return;
    }
        onSearch(keyword);
    };

    return (
    <>
    <div className="search-group">
    <label>Search record:</label>

                <input
                type="text"
                placeholder='Student name'
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />

            <button type="button" onClick={handleSearch}>
                Search
            </button>
            </div>
    </>
    )
}

export default GetRecordsByStudentName