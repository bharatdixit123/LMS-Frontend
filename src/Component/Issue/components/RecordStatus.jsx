import React from 'react'

function RecordStatus({onFilter}) {

  const handleChange = (e) => {
        onFilter(e.target.value);
    };

  return (
    <>
    <select onChange={handleChange}>
            <option value="ALL">All</option>
            <option value="ISSUED">Issued</option>
            <option value="RETURNED">Returned</option>
        </select>
    </>
  )
}

export default RecordStatus