import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/StudentForm.module.css";
function StudentForm(){
    const navigate = useNavigate();

    const[student, setStudent] = useState({
        name:"",
        email:"",
        phone:"",
        active:false
    });

    
    const handleChange = (e) =>{
        setStudent({
            ...student,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("http://localhost:8080/student/greet", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to create student");
            }
            return response.json();
        })
        .then(data => {
            console.log("Student Created:", data);
            alert("Student created successfully");

            // form reset
            setStudent({
                name: "",
                email: "",
                phone: "",
                active: false
                });
                navigate("/");
            })
            .catch(error => {
            console.error(error);
            alert("Error creating student");
        });
    };

    const handleCancel = () => {
        navigate("/");
    };
    
    return (
        <div className={styles.container}>
    <h2 className={styles.title}>Create Student</h2>

    <form onSubmit={handleSubmit}>

    <div className={styles.inputGroup}>
        <input
        type="text"
        name="name"
        placeholder="Name"
        value={student.name}
        onChange={handleChange}
        className={styles.input}
        />
    </div>

    <div className={styles.inputGroup}>
        <input
        type="email"
        name="email"
        placeholder="Email"
        value={student.email}
        onChange={handleChange}
        className={styles.input}
        />
    </div>

    <div className={styles.inputGroup}>
        <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={student.phone}
        onChange={handleChange}
        className={styles.input}
        />
    </div>

    <div className={styles.checkboxRow}>
        <input
        type="checkbox"
        name="active"
        checked={student.active}
        onChange={(e) =>
            setStudent({
            ...student,
            active: e.target.checked,
            })
        }
        />
        <label>Active</label>
    </div>

    <div className={styles.buttonRow}>
        <button
        type="button"
        onClick={handleCancel}
        className={styles.secondaryBtn}
        >
        Cancel
        </button>

        <button type="submit" className={styles.primaryBtn}>
        Create
        </button>
    </div>

    </form>
</div>
    );
}

export default StudentForm;