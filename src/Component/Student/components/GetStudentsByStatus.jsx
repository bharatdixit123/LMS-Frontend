import "../Styles/StudentStatus.css"

function GetStudentByStatus({ onFilter }) {

    const handleChange = (e) => {
        onFilter(e.target.value);
    };

    return (
        <div className="status-filter">
        <label>Student Status:</label>
        <select onChange={handleChange}>
            <option value="ALL">All</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
        </select>
        </div>
    );
}

export default GetStudentByStatus;