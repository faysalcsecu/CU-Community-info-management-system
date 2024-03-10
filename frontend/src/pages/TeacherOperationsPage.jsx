import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

function TeacherOperationPage() {
    const [teachers, setTeachers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredTeachers, setFilteredTeachers] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllTeachers = async () => {
            try {
                const res = await axios.get("http://localhost:3001/teacher");
                setTeachers(res.data);
                setFilteredTeachers(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllTeachers();
    }, []);

    useEffect(() => {
        const filtered = teachers.filter(teacher => {
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

    const handleDeleteTeacher = async (teacherId) => {
        try {
            const response = await fetch(`http://localhost:3001/teacher/${teacherId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                setTeachers(prevTeachers => prevTeachers.filter(teacher => teacher.T_ID !== teacherId));
                setFilteredTeachers(prevFilteredTeachers => prevFilteredTeachers.filter(teacher => teacher.T_ID !== teacherId));

                console.log('Teacher deleted successfully');
                alert('Teacher deleted successfully');
            } else {
                console.error('Failed to delete teacher');
                alert('Failed to delete teacher');
            }
        } catch (error) {
            console.error('Error deleting teacher:', error);
            alert('Error deleting teacher');
        }
    };

    const handleUpdateTeacher = (teacherId) => {
        navigate(`/admin/teacher/update/${teacherId}`);
    };

    return (
        <div className="container">
            <h1 className="my-4 text-center">Teacher Information</h1>
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
                {filteredTeachers.length === 0 ? (
                    <div className="col">No teacher data available.</div>
                ) : (
                    filteredTeachers.map((teacher) => (
                        <div key={teacher.T_ID} className="col-md-4 mb-4">
                            <div className="card">
                                {teacher.pictureURL && (
                                    <img src={`http://localhost:3001/${teacher.pictureURL}`} className="card-img-top" alt={teacher.T_Name} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
                                )}
                                <div className="card-body">
                                    <h5 className="card-title text-center">{teacher.T_Name}</h5>
                                    {/* <p className="card-text text-center">ID: {teacher.T_ID}</p> */}
                                    <p className="card-text text-center">Email: {teacher.T_Gmail}</p>
                                    <p className="card-text text-center">Contact: {teacher.T_Contact}</p>
                                    <p className="card-text text-center">Position: {teacher.C_Name}</p>
                                    <p className="card-text text-center">Department: {teacher.Dept_Name}</p>
                                    <p className="card-text text-center">Faculty: {teacher.Fac_Name}</p>
                                    <div className="text-center">
                                        <button className="btn btn-primary mx-1" onClick={() => handleUpdateTeacher(teacher.T_ID)}>Update</button>
                                        <button className="btn btn-danger mx-1" onClick={() => handleDeleteTeacher(teacher.T_ID)}>Delete</button>
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




export default TeacherOperationPage;
