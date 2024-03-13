// TeacherRegisterPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

function TeacherRegisterPage() {
  const [formData, setFormData] = useState({
    T_ID: "",
    T_Name: "",
    T_Gmail: "",
    T_Contact: "",
    Dept_ID: "",
    C_ID: "",
  });
  const [departments, setDepartments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

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

    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:3001/categories");
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataWithImage = new FormData();
      formDataWithImage.append("T_ID", formData.T_ID);
      formDataWithImage.append("T_Name", formData.T_Name);
      formDataWithImage.append("T_Gmail", formData.T_Gmail);
      formDataWithImage.append("T_Contact", formData.T_Contact);
      formDataWithImage.append("Dept_ID", formData.Dept_ID);
      formDataWithImage.append("C_ID", formData.C_ID);
      formDataWithImage.append("image", selectedImage);

      const res = await axios.post(
        "http://localhost:3001/register/teacher",
        formDataWithImage,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res.data);
      window.alert("Registration successful!");

      setFormData({
        T_ID: "",
        T_Name: "",
        T_Gmail: "",
        T_Contact: "",
        Dept_ID: "",
        C_ID: "",
      });
      setSelectedImage(null);
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data &&
        (error.response.data.error === "Teacher with this ID already exists" ||
          error.response.data.error ===
            "Teacher with this email already exists" ||
          error.response.data.error ===
            "Teacher with this contact already exists")
      ) {
        window.alert(error.response.data.error);
      } else {
        console.error(error);
        window.alert("Teacher with this ID already exists");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Teacher Registration</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Teacher ID:</label>
          <input
            type="text"
            className="form-control"
            name="T_ID"
            value={formData.T_ID}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            name="T_Name"
            value={formData.T_Name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            name="T_Gmail"
            value={formData.T_Gmail}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contact:</label>
          <input
            type="text"
            className="form-control"
            name="T_Contact"
            value={formData.T_Contact}
            onChange={handleChange}
            required
          />
        </div>
        {/* Other form fields */}
        <div className="mb-3">
          <label className="form-label">Department:</label>
          <select
            className="form-select"
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
          <label className="form-label">Category:</label>
          <select
            className="form-select"
            name="C_ID"
            value={formData.C_ID}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.C_ID} value={category.C_ID}>
                {category.C_Name}
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
        {/* Input fields for teacher registration */}
        {/* Include similar structure as in StudentRegisterPage.jsx */}
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
}

export default TeacherRegisterPage;
