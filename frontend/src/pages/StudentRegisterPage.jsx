// StudentRegisterPage.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";

function StudentRegisterPage() {
  const [formData, setFormData] = useState({
    ST_ID: "",
    ST_Name: "",
    ST_Gmail: "",
    ST_Contact: "",
    ST_Batch: "",
    Dept_ID: "",
  });
  const [departments, setDepartments] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // New state for storing the selected image file

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await axios.get("http://localhost:3001/departments");
        setDepartments(res.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
      formDataWithImage.append("ST_ID", formData.ST_ID);
      formDataWithImage.append("ST_Name", formData.ST_Name);
      formDataWithImage.append("ST_Gmail", formData.ST_Gmail);
      formDataWithImage.append("ST_Contact", formData.ST_Contact);
      formDataWithImage.append("ST_Batch", formData.ST_Batch);
      formDataWithImage.append("Dept_ID", formData.Dept_ID);
      formDataWithImage.append("image", selectedImage); // Append the selected image file to the form data

      const res = await axios.post(
        "http://localhost:3001/register/student",
        formDataWithImage,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res.data); // Log response from server
      // Clear form fields after successful submission
      // Display alert for successful registration
      window.alert("Registration successful!");
      setFormData({
        ST_ID: "",
        ST_Name: "",
        ST_Gmail: "",
        ST_Contact: "",
        ST_Batch: "",
        Dept_ID: "",
      });
      setSelectedImage(null); // Reset selected image state
      // } catch (error) {
      //     console.error(error);
      // }
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data &&
        (error.response.data.error === "Student with this ID already exists" ||
          error.response.data.error ===
            "Student with this email already exists" ||
          error.response.data.error ===
            "Student with this contact already exists")
      ) {
        window.alert(error.response.data.error);
      } else {
        console.error(error);
        window.alert("Student with this ID already exists");
      }
    }
  };

  return (
   
    <div className="container mt-5">
      <h1 className="mb-4">Student Registration</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Student ID:</label>
          <input
            type="text"
            className="form-control"
            name="ST_ID"
            value={formData.ST_ID}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            name="ST_Name"
            value={formData.ST_Name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            name="ST_Gmail"
            value={formData.ST_Gmail}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contact:</label>
          <input
            type="text"
            className="form-control"
            name="ST_Contact"
            value={formData.ST_Contact}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Batch:</label>
          <input
            type="text"
            className="form-control"
            name="ST_Batch"
            value={formData.ST_Batch}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Department:</label>
          <select
            className="form-control"
            name="Dept_ID"
            value={formData.Dept_ID}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept.Dept_ID} value={dept.Dept_ID}>
                {dept.Dept_Name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Select Image:</label>
          <input
            type="file"
            className="form-control"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
}

export default StudentRegisterPage;
