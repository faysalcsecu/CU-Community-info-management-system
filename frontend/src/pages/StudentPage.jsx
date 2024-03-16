
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./StudentPage.css";

function StudentPage() {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");

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
    // Filter students based on search query, selected department, and selected batch
    const filtered = students.filter((student) => {
      // Check if any field contains the search query
      const matchesSearchQuery = Object.values(student).some((value) => {
        if (typeof value === "string") {
          return value.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return false;
      });
      // Check if department matches selected department
      const matchesDepartment =
        selectedDepartment === "" ||
        student.Dept_Name.toLowerCase() === selectedDepartment.toLowerCase();
      // Check if batch matches selected batch
      const matchesBatch =
        selectedBatch === "" ||
        student.ST_Batch.toLowerCase() === selectedBatch.toLowerCase();

      return matchesSearchQuery && matchesDepartment && matchesBatch;
    });
    setFilteredStudents(filtered);
  }, [searchQuery, students, selectedDepartment, selectedBatch]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDepartmentChange = (e) => {
    const department = e.target.value;
    setSelectedDepartment(department);
    // Reset selected batch when changing department
    setSelectedBatch("");
  };

  const handleBatchChange = (e) => {
    setSelectedBatch(e.target.value);
  };

  // Filter unique batches based on the selected department
  const uniqueBatches =
    selectedDepartment !== ""
      ? Array.from(
          new Set(
            students
              .filter(
                (student) =>
                  student.Dept_Name.toLowerCase() ===
                  selectedDepartment.toLowerCase()
              )
              .map((student) => student.ST_Batch)
          )
        )
      : [];

  return (
    <div className="container">
      <h1 className="my-4 text-center">Student Information</h1>
      <div className="mb-3">
        <div className="row justify-content-center"> {/* Centering the row */}
          <div className="col-md-3">
            <select
              className="form-control"
              value={selectedDepartment}
              onChange={handleDepartmentChange}
            >
              <option value="">All Departments</option>
              {/* Populate dropdown options with unique department names */}
              {Array.from(
                new Set(students.map((student) => student.Dept_Name))
              ).map((department, index) => (
                <option key={index} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <select
              className="form-control"
              value={selectedBatch}
              onChange={handleBatchChange}
            >
              <option value="">All Batches</option>
              {/* Populate dropdown options with unique batch numbers */}
              {uniqueBatches.map((batch, index) => (
                <option key={index} value={batch}>
                  {batch}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name, ID, email, contact, etc."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>

      <div className="d-flex flex-wrap justify-content-center">
        {filteredStudents.length === 0 ? (
          <div className="col">No student data available.</div>
        ) : (
          filteredStudents.map((student) => (
            <div
              key={student.ST_ID}
              className="card m-2 bg-light "
              style={{ height: "auto", width: "20rem" }}
            >
              {student.pictureURL && (
                <img
                  src={`http://localhost:3001/${student.pictureURL}`}
                  className="card-img-top rounded-circle mx-auto mt-3"
                  alt={student.ST_Name}
                  style={{ width: "200px", height: "200px" }}
                />
              )}
              <div className="card-body text-center">
                <h5 className="card-title text-center">{student.ST_Name}</h5>
                <p>
                  <strong>ID: </strong>
                  {student.ST_ID}
                  <br />
                  <strong>Gmail: </strong>
                  {student.ST_Gmail}
                  <br />
                  <strong>Contact: </strong>
                  {student.ST_Contact}
                  <br />
                  <strong>Batch: </strong>
                  {student.ST_Batch}
                  <br />
                  <strong>Department: </strong>
                  {student.Dept_Name}
                  <br />
                  <strong>Faculty:</strong> {student.Fac_Name}
                  <br />
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default StudentPage;
