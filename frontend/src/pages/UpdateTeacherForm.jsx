import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

function UpdateTeacherForm({ onClose }) {
    const { teacherId } = useParams(); // Get teacherId from URL parameters

    const [teacherData, setTeacherData] = useState({
        T_ID: '',
        T_Name: '',
        T_Gmail: '',
        T_Contact: '',
        Dept_ID: '',
        C_ID: ''
    });
    const [departments, setDepartments] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchTeacherData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/teacher/${teacherId}`);
                setTeacherData(response.data);
            } catch (error) {
                console.error("Error fetching teacher data:", error);
            }
        };
        fetchTeacherData();

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
                const res = await axios.get('http://localhost:3001/categories');
                setCategories(res.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, [teacherId]);

    const handleChange = (e) => {
        setTeacherData({
            ...teacherData,
            [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataWithImage = new FormData();
            formDataWithImage.append('T_Name', teacherData.T_Name);
            formDataWithImage.append('T_Gmail', teacherData.T_Gmail);
            formDataWithImage.append('T_Contact', teacherData.T_Contact);
            formDataWithImage.append('Dept_ID', teacherData.Dept_ID);
            formDataWithImage.append('C_ID', teacherData.C_ID);
            formDataWithImage.append('image', selectedImage);

            await axios.put(`http://localhost:3001/teacher/${teacherId}`, formDataWithImage, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert("Teacher updated successfully");
            onClose();
        } catch (error) {
            console.error("Error updating teacher:", error);
        }
    };

    return (
        <div className="container">
            <h2 className="my-4">Update Teacher</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name:</label>
                    <input type="text" className="form-control" name="T_Name" value={teacherData.T_Name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input type="email" className="form-control" name="T_Gmail" value={teacherData.T_Gmail} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Contact:</label>
                    <input type="text" className="form-control" name="T_Contact" value={teacherData.T_Contact} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Department:</label>
                    <select className="form-select" name="Dept_ID" value={teacherData.Dept_ID} onChange={handleChange} required>
                        <option value="">Select Department</option>
                        {departments.map((dept) => (
                            <option key={dept.Dept_ID} value={dept.Dept_ID}>{dept.Dept_Name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Category:</label>
                    <select className="form-select" name="C_ID" value={teacherData.C_ID} onChange={handleChange} required>
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                            <option key={category.C_ID} value={category.C_ID}>{category.C_Name}</option>
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

export default UpdateTeacherForm;
