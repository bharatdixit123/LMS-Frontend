import React from 'react'

function BookStatus({onFilter}) {
    
  const handleChange = (e) => {
        onFilter(e.target.value);
    };

  return (
    <>
    <div className="status-filter">
    <label>Book Status:</label>
        <select onChange={handleChange}>
            <option value="ALL">All</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
        </select>
        </div>
    </>
  )
}

export default BookStatus