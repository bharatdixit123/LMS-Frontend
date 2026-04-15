import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <h1 className="title">Library Management System</h1>
      <p className="subtitle">Manage everything in one place</p>

      <div className="card-container">

        <Link to="/students" className="card">
          <img src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png" alt="students" />
          <h2>Students</h2>
          <p>Manage student records</p>
        </Link>

        <Link to="/books" className="card">
          <img src="https://cdn-icons-png.flaticon.com/512/29/29302.png" alt="books" />
          <h2>Books</h2>
          <p>Manage books inventory</p>
        </Link>

        <Link to="/records" className="card">
          <img src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png" alt="records" />
          <h2>Records</h2>
          <p>Track issued books</p>
        </Link>

      </div>
    </div>
  );
}

export default Home;