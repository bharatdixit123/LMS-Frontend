import React from 'react'
import { useState } from "react";

function SearchStudentByName({onSearch}) {

    const [keyword, setKeyword] = useState("");

    const handleSearch = () => {
      onSearch(keyword);   // parent ko bhej do
    };
    return (
    <>
    <input
        type="text"
        placeholder="Enter student name"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
    />

    <button type="button" onClick={handleSearch}>
        Search
    </button>
    </>
    )
}

export default SearchStudentByName