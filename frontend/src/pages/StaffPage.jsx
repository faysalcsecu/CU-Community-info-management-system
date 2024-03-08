import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css"; // Import custom CSS file

function StaffPage() {
  const [staff, setStaff] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredStaffs, setFilteredStaffs] = useState([]);


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
    // Filter students based on search query
    const filtered = staff.filter(staff1 => {
      // Check if any field contains the search query
      return Object.values(staff1).some(value => {
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return false;
      });
    });
    setFilteredStaffs(filtered);
  }, [searchQuery, staff]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="container">
      <h1 className="my-4 text-center">Staff Information</h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by department, faculty, name, ID, email, contact etc."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="row justify-content-center">
      {filteredStaffs.length === 0 ? (
          <div className="col">No staff data available.</div>
        ) : (
          filteredStaffs.map((staffMember) => (
            <div key={staffMember.STF_ID} className="col-md-4 mb-4">
              <div className="card">
                {staffMember.pictureURL && (
                  <img src={`http://localhost:3001/${staffMember.pictureURL}`} className="card-img-top" alt={staffMember.STF_Name} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
                )}
                <div className="card-body">
                  <h5 className="card-title text-center">{staffMember.STF_Name}</h5>
                  {/* <p className="card-text">ID: {staffMember.STF_ID}</p> */}
                  <p className="card-text text-center">Gmail: {staffMember.STF_Gmail}</p>
                  <p className="card-text text-center">Contact: {staffMember.STF_Contact}</p>
                  <p className="card-text text-center">Position: {staffMember.SC_Name}</p>
                  <p className="card-text text-center">Department: {staffMember.Dept_Name}</p>
                  <p className="card-text text-center">Faculty: {staffMember.Fac_Name}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default StaffPage;
