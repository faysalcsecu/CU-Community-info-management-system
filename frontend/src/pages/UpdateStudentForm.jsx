


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

// function UpdateStudentForm({ studentId, onClose }) {
function UpdateStudentForm({ onClose }) {
    

    const { studentId } = useParams(); // Get studentId from URL parameters

    // alert("Student ID: " + studentId);

    const [studentData, setStudentData] = useState({
        // Initialize with empty values
        ST_Name: "",
        ST_Gmail: "",
        ST_Contact: "",
        ST_Batch: "",
        Dept_ID: ""
    });
    const [departments, setDepartments] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null); // New state for storing the selected image file

    useEffect(() => {

        // console.log("Student ID:", studentId);
        const fetchStudentData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/student/${studentId}`);
                setStudentData(response.data);
            } catch (error) {
                console.error("Error fetching student data:", error);
            }
        };
        fetchStudentData();
    }, [studentId]);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const res = await axios.get('http://localhost:3001/departments');
                setDepartments(res.data);
            } catch (error) {
                console.error('Error fetching departments:', error);
            }
        };
        fetchDepartments();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStudentData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Function to handle image file selection
    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            // alert("Student ID: " + studentId);
            const formDataWithImage = new FormData();
            formDataWithImage.append('ST_Name', studentData.ST_Name);
            formDataWithImage.append('ST_Gmail', studentData.ST_Gmail);
            formDataWithImage.append('ST_Contact', studentData.ST_Contact);
            formDataWithImage.append('ST_Batch', studentData.ST_Batch);
            formDataWithImage.append('Dept_ID', studentData.Dept_ID);
            formDataWithImage.append('image', selectedImage); // Append the selected image file to the form data


            await axios.put(`http://localhost:3001/student/${studentId}`, formDataWithImage, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert("Student updated successfully");
            console.log("Before clearing form data:", studentData);
            onClose();
            setStudentData({
                ST_Name: "",
                ST_Gmail: "",
                ST_Contact: "",
                ST_Batch: "",
                Dept_ID: ""
            });
            setSelectedImage(null);
            console.log("Before clearing form data:", studentData);
        } catch (error) {
            console.error("Error updating student:", error);
            // alert("An error occurred while updating student");
        }
    };

    return (
        <div className="container">
            <h2 className="my-4">Update Student</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="ST_Name"
                        value={studentData.ST_Name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        name="ST_Gmail"
                        value={studentData.ST_Gmail}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Contact:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="ST_Contact"
                        value={studentData.ST_Contact}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Batch:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="ST_Batch"
                        value={studentData.ST_Batch}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Department:</label>
                    <select
                        className="form-control"
                        name="Dept_ID"
                        value={studentData.Dept_ID}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Department</option>
                        {departments.map((dept) => (
                            <option key={dept.Dept_ID} value={dept.Dept_ID}>{dept.Dept_Name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Select Image:</label>
                    <input type="file" className="form-control" name="image" onChange={handleImageChange} accept="image/*" />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
}

export default UpdateStudentForm;



