import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

function StaffOperationPage() {
    const [staffs, setStaffs] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredStaffs, setFilteredStaffs] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllStaffs = async () => {
            try {
                const res = await axios.get("http://localhost:3001/staff");
                setStaffs(res.data);
                setFilteredStaffs(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllStaffs();
    }, []);

    useEffect(() => {
        const filtered = staffs.filter(staff => {
            return Object.values(staff).some(value => {
                if (typeof value === 'string') {
                    return value.toLowerCase().includes(searchQuery.toLowerCase());
                }
                return false;
            });
        });
        setFilteredStaffs(filtered);
    }, [searchQuery, staffs]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleDeleteStaff = async (staffId) => {
        try {
            const response = await fetch(`http://localhost:3001/staff/${staffId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                setStaffs(prevStaffs => prevStaffs.filter(staff => staff.STF_ID !== staffId));
                setFilteredStaffs(prevFilteredStaffs => prevFilteredStaffs.filter(staff => staff.STF_ID !== staffId));

                console.log('Staff deleted successfully');
                alert('Staff deleted successfully');
            } else {
                console.error('Failed to delete staff');
                alert('Failed to delete staff');
            }
        } catch (error) {
            console.error('Error deleting staff:', error);
            alert('Error deleting staff');
        }
    };

    const handleUpdateStaff = (staffId) => {
        navigate(`/admin/staff/update/${staffId}`);
    };

    return (
        <div className="container">
            <h1 className="my-4 text-center">Staff Information</h1>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name, ID, email, contact, department, etc."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="row justify-content-center">
                {filteredStaffs.length === 0 ? (
                    <div className="col">No staff data available.</div>
                ) : (
                    filteredStaffs.map((staff) => (
                        <div key={staff.STF_ID} className="col-md-4 mb-4">
                            <div className="card">
                                {staff.pictureURL && (
                                    <img src={`http://localhost:3001/${staff.pictureURL}`} className="card-img-top" alt={staff.STF_Name} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
                                )}
                                <div className="card-body">
                                    <h5 className="card-title text-center">{staff.STF_Name}</h5>
                                    {/* <p className="card-text text-center">ID: {staff.STF_ID}</p> */}
                                    <p className="card-text text-center">Email: {staff.STF_Gmail}</p>
                                    <p className="card-text text-center">Contact: {staff.STF_Contact}</p>
                                    <p className="card-text text-center">Position: {staff.SC_Name}</p>
                                    <p className="card-text text-center">Department: {staff.Dept_Name}</p>
                                    <p className="card-text text-center">Faculty: {staff.Fac_Name}</p>
                                    <div className="text-center">
                                        <button className="btn btn-primary mx-1" onClick={() => handleUpdateStaff(staff.STF_ID)}>Update</button>
                                        <button className="btn btn-danger mx-1" onClick={() => handleDeleteStaff(staff.STF_ID)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default StaffOperationPage;
