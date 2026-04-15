import React from 'react'
import { useState } from 'react';
import "../Styles/BookList.css";

function SearchBook({onSearch}) {

    const [keyword, setKeyword] = useState("");
    const [searchType, setSearchType] = useState("title");

    const handleSearch=()=>{
        onSearch(keyword, searchType);
    };

  return (
    <>
    <div className="search-group">
        <label htmlFor="searchType">Search By:</label>
            <select 
                id="searchType"
                value={searchType} 
                onChange={(e) => setSearchType(e.target.value)}
            >
                <option value="title">Title</option>
                <option value="author">Author</option>
            </select>

            <input
                type="text"
                placeholder={`Search by ${searchType}`}
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

export default SearchBook