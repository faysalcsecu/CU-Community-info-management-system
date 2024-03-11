
// StudentPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function StudentPage() {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    const fetchAllStudents = async () => {
      try {
        const res = await axios.get("http://localhost:3001/student");
        setStudents(res.data);
        setFilteredStudents(res.data); // Initialize filteredStudents with all students initially
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllStudents();
  }, []);

  useEffect(() => {
    // Filter students based on search query
    const filtered = students.filter(student => {
      // Check if any field contains the search query
      return Object.values(student).some(value => {
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return false;
      });
    });
    setFilteredStudents(filtered);
  }, [searchQuery, students]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  

  return (
    <div className="container">
      <h1 className="my-4 text-center">Student Information</h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by department, faculty, name, ID, email, contact, batch, etc."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="row justify-content-center">
        {filteredStudents.length === 0 ? (
          <div className="col">No student data available.</div>
        ) : (
          filteredStudents.map((student) => (
            <div key={student.ST_ID} className="col-md-4 mb-4">
              <div className="card">
                {student.pictureURL && (
                  <img src={`http://localhost:3001/${student.pictureURL}`} className="card-img-top" alt={student.ST_Name} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
                )}
                <div className="card-body">
                  <h5 className="card-title text-center">{student.ST_Name}</h5>
                  <p className="card-text text-center">ID: {student.ST_ID}</p>
                  <p className="card-text text-center">Gmail: {student.ST_Gmail}</p>
                  <p className="card-text text-center">Contact: {student.ST_Contact}</p>
                  <p className="card-text text-center">Batch: {student.ST_Batch}</p>
                  <p className="card-text text-center">Department: {student.Dept_Name}</p>
                  <p className="card-text text-center">Faculty: {student.Fac_Name}</p>
                  
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default StudentPage;
