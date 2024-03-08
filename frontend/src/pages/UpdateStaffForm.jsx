import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

function UpdateStaffForm({ onClose }) {
    const { staffId } = useParams(); // Get staffId from URL parameters

    const [staffData, setStaffData] = useState({
        STF_Name: '',
        STF_Gmail: '',
        STF_Contact: '',
        Dept_ID: '',
        SC_ID: ''
    });
    const [departments, setDepartments] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchStaffData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/staff/${staffId}`);
                setStaffData(response.data);
            } catch (error) {
                console.error("Error fetching staff data:", error);
            }
        };
        fetchStaffData();

        const fetchDepartments = async () => {
            try {
                const res = await axios.get('http://localhost:3001/departments');
                setDepartments(res.data);
            } catch (error) {
                console.error('Error fetching departments:', error);
            }
        };
        fetchDepartments();

        const fetchCategories = async () => {
            try {
                const res = await axios.get('http://localhost:3001/staff-categories');
                setCategories(res.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, [staffId]);

    const handleChange = (e) => {
        setStaffData({
            ...staffData,
            [e.target.name]: e.target.value
        });
    };

    // Function to handle image file selection
    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const formDataWithImage = new FormData();
            formDataWithImage.append('STF_Name', staffData.STF_Name);
            formDataWithImage.append('STF_Gmail', staffData.STF_Gmail);
            formDataWithImage.append('STF_Contact', staffData.STF_Contact);
            formDataWithImage.append('Dept_ID', staffData.Dept_ID);
            formDataWithImage.append('C_ID', staffData.SC_ID);
            formDataWithImage.append('image', selectedImage);
            await axios.put(`http://localhost:3001/staff/${staffId}`, formDataWithImage, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert("Staff updated successfully");
            onClose();
            setStudentData({
                STF_Name: "",
                STF_Gmail: "",
                STF_Contact: "",
                Dept_ID: "",
                SC_ID: ""
            });
            setSelectedImage(null);
        } catch (error) {
            console.error("Error updating staff:", error);
        }
    };

    return (
        <div className="container">
            <h2 className="my-4">Update Staff</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name:</label>
                    <input type="text" className="form-control" name="STF_Name" value={staffData.STF_Name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input type="email" className="form-control" name="STF_Gmail" value={staffData.STF_Gmail} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Contact:</label>
                    <input type="text" className="form-control" name="STF_Contact" value={staffData.STF_Contact} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Department:</label>
                    <select className="form-select" name="Dept_ID" value={staffData.Dept_ID} onChange={handleChange} required>
                        <option value="">Select Department</option>
                        {departments.map((dept) => (
                            <option key={dept.Dept_ID} value={dept.Dept_ID}>{dept.Dept_Name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Category:</label>
                    <select className="form-select" name="SC_ID" value={staffData.SC_ID} onChange={handleChange} required>
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                            <option key={category.SC_ID} value={category.SC_ID}>{category.SC_Name}</option>
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

export default UpdateStaffForm;
