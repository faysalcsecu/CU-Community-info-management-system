

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css"; // Import custom CSS file

function StaffPage() {
  const [staff, setStaff] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStaffs, setFilteredStaffs] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await axios.get("http://localhost:3001/staff");
        setStaff(res.data);
        setFilteredStaffs(res.data);
      } catch (err) {
        console.error("Error fetching staff:", err);
      }
    };

    fetchStaff();
  }, []);

  useEffect(() => {
    // Filter staff members based on search query and selected department
    const filtered = staff.filter((staffMember) => {
      // Check if any field contains the search query
      const matchesSearchQuery = Object.values(staffMember).some((value) => {
        if (typeof value === "string") {
          return value.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return false;
      });
      // Check if department matches selected department
      const matchesDepartment =
        selectedDepartment === "" ||
        staffMember.Dept_Name.toLowerCase() ===
          selectedDepartment.toLowerCase();

      return matchesSearchQuery && matchesDepartment;
    });
    setFilteredStaffs(filtered);
  }, [searchQuery, staff, selectedDepartment]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  return (
    <div className="container">
      <h1 className="my-4 text-center">Staff Information</h1>
      <div className="mb-3">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <select
              className="form-control"
              value={selectedDepartment}
              onChange={handleDepartmentChange}
            >
              <option value="">All Departments</option>
              {Array.from(
                new Set(staff.map((staffMember) => staffMember.Dept_Name))
              ).map((department, index) => (
                <option key={index} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-5">
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
        {filteredStaffs.length === 0 ? (
          <div className="col">No staff data available.</div>
        ) : (
          filteredStaffs.map((staffMember) => (
            <div
              key={staffMember.STF_ID}
              className="card m-2 bg-light "
              style={{ height: "auto", width: "20rem" }}
            >
              {staffMember.pictureURL && (
                <img
                  src={`http://localhost:3001/${staffMember.pictureURL}`}
                  className="card-img-top rounded-circle mx-auto mt-3"
                  alt={staffMember.STF_Name}
                  style={{ width: "200px", height: "200px" }}
                />
              )}
              <div className="card-body text-center">
                <h5 className="card-title text-center">
                  {staffMember.STF_Name}
                </h5>
                <p className="card-text text-center">
                  <strong>Gmail:</strong> {staffMember.STF_Gmail} <br />
                  <strong>Contact:</strong> {staffMember.STF_Contact} <br />
                  <strong>Position:</strong> {staffMember.SC_Name} <br />
                  <strong>Department:</strong> {staffMember.Dept_Name} <br />
                  <strong>Faculty:</strong> {staffMember.Fac_Name} <br />
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default StaffPage;
