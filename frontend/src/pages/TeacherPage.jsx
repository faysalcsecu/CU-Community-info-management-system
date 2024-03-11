import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css"; // Import custom CSS file
import { Link } from "react-router-dom";


function TeacherPage() {
  const [teachers, setTeachers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTeachers, setFilteredTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await axios.get("http://localhost:3001/teacher");
        setTeachers(res.data);
        setFilteredTeachers(res.data); // Initialize filteredStudents with all students initially
      } catch (err) {
        console.error("Error fetching teachers:", err);
      }
    };

    fetchTeachers();
  }, []);

  useEffect(() => {
    // Filter students based on search query
    const filtered = teachers.filter(teacher => {
      // Check if any field contains the search query
      return Object.values(teacher).some(value => {
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return false;
      });
    });
    setFilteredTeachers(filtered);
  }, [searchQuery, teachers]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="container">
      <h1 className="my-4 text-center">Teacher Information</h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by department, faculty, name, ID, email, contact, etc."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="row justify-content-center">
        {filteredTeachers.length === 0 ? (
          <div className="col">No Teacher data available.</div>
        ) : (
          filteredTeachers.map((teacher) => (
            <div key={teacher.T_ID} className="col-md-4 mb-4">
              <div className="card">
                {teacher.pictureURL && (
                  <img src={`http://localhost:3001/${teacher.pictureURL}`} className="card-img-top" alt={teacher.T_Name} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
                )}
                <div className="card-body">
                  <h5 className="card-title text-center">{teacher.T_Name}</h5>
                  {/* <p className="card-text">ID: {teacher.T_ID}</p> */}
                  <p className="card-text text-center">Gmail: {teacher.T_Gmail}</p>
                  <p className="card-text text-center">Contact: {teacher.T_Contact}</p>
                  <p className="card-text text-center">Position: {teacher.C_Name}</p>
                  <p className="card-text text-center">Department: {teacher.Dept_Name}</p>
                  <p className="card-text text-center">Faculty: {teacher.Fac_Name}</p>
                  <Link to={teacher.link}><p className="card-text text-center">Profile</p></Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TeacherPage;
