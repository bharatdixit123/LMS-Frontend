import { useState } from "react";
import "../Styles/StudentList.css";

function SearchStudent({ onSearch }) {

    const [keyword, setKeyword] = useState("");
    const [searchType, setSearchType] = useState("name");

    const handleSearch = () => {
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
                <option value="name">Name</option>
                <option value="email">Email</option>
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
    );
}

export default SearchStudent;