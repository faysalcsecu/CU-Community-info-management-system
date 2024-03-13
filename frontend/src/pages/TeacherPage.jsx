import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css"; // Import custom CSS file
import { Link } from "react-router-dom";

function TeacherPage() {
  const [teachers, setTeachers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await axios.get("http://localhost:3001/teacher");
        setTeachers(res.data);
        setFilteredTeachers(res.data);
      } catch (err) {
        console.error("Error fetching teachers:", err);
      }
    };

    fetchTeachers();
  }, []);

  useEffect(() => {
    // Filter teachers based on search query and selected department
    const filtered = teachers.filter((teacher) => {
      // Check if any field contains the search query
      const matchesSearchQuery = Object.values(teacher).some((value) => {
        if (typeof value === "string") {
          return value.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return false;
      });
      // Check if department matches selected department
      const matchesDepartment =
        selectedDepartment === "" ||
        teacher.Dept_Name.toLowerCase() === selectedDepartment.toLowerCase();

      return matchesSearchQuery && matchesDepartment;
    });
    setFilteredTeachers(filtered);
  }, [searchQuery, teachers, selectedDepartment]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  return (
    <div className="container">
      <h1 className="my-4 text-center">Teacher Information</h1>
      <div className="mb-3">
        <div className="row">
          <div className="col-md-6">
            <select
              className="form-control"
              value={selectedDepartment}
              onChange={handleDepartmentChange}
            >
              <option value="">All Departments</option>
              {Array.from(
                new Set(teachers.map((teacher) => teacher.Dept_Name))
              ).map((department, index) => (
                <option key={index} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name, ID, email, contact, position, etc."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>

      <div className="d-flex flex-wrap justify-content-center">
        {filteredTeachers.length === 0 ? (
          <div className="col">No Teacher data available.</div>
        ) : (
          filteredTeachers.map((teacher) => (
            <div
              key={teacher.T_ID}
              className="card m-2 bg-light"
              style={{ height: "auto", width: "20rem" }}
            >
              {teacher.pictureURL && (
                <img
                  src={`http://localhost:3001/${teacher.pictureURL}`}
                  className="card-img-top rounded-circle mx-auto mt-3"
                  alt={teacher.T_Name}
                  style={{ width: "200px", height: "200px" }}
                />
              )}
              <div className="card-body text-center">
                <h5 className="card-title text-center">{teacher.T_Name}</h5>
                <p className="card-text text-center">
                  <strong>Gmail:</strong> {teacher.T_Gmail} <br />
                  <strong>Contact:</strong> {teacher.T_Contact} <br />
                  <strong>Position:</strong> {teacher.C_Name} <br />
                  <strong>Department:</strong> {teacher.Dept_Name} <br />
                  <strong>Faculty:</strong> {teacher.Fac_Name}
                  <Link to={teacher.link}>
                    <p className="card-text text-center">Profile</p>
                  </Link>
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TeacherPage;
