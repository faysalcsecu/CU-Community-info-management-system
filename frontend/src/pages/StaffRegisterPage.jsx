// StaffRegisterPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

function StaffRegisterPage() {
  const [formData, setFormData] = useState({
    STF_ID: "",
    STF_Name: "",
    STF_Gmail: "",
    STF_Contact: "",
    Dept_ID: "",
    SC_ID: "",
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
        const res = await axios.get("http://localhost:3001/staff-categories");
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
      formDataWithImage.append("STF_ID", formData.STF_ID);
      formDataWithImage.append("STF_Name", formData.STF_Name);
      formDataWithImage.append("STF_Gmail", formData.STF_Gmail);
      formDataWithImage.append("STF_Contact", formData.STF_Contact);
      formDataWithImage.append("Dept_ID", formData.Dept_ID);
      formDataWithImage.append("SC_ID", formData.SC_ID);
      formDataWithImage.append("image", selectedImage);

      const res = await axios.post(
        "http://localhost:3001/register/staff",
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
        STF_ID: "",
        STF_Name: "",
        STF_Gmail: "",
        STF_Contact: "",
        Dept_ID: "",
        SC_ID: "",
      });
      setSelectedImage(null);
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data &&
        (error.response.data.error ===
          "Staff member with this ID already exists" ||
          error.response.data.error ===
            "Staff member with this email already exists" ||
          error.response.data.error ===
            "Staff member with this contact already exists")
      ) {
        window.alert(error.response.data.error);
      } else {
        console.error(error);
        window.alert("Staff member with this ID already exists");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Staff Registration</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Staff ID:</label>
          <input
            type="text"
            className="form-control"
            name="STF_ID"
            value={formData.STF_ID}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            name="STF_Name"
            value={formData.STF_Name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            name="STF_Gmail"
            value={formData.STF_Gmail}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contact:</label>
          <input
            type="text"
            className="form-control"
            name="STF_Contact"
            value={formData.STF_Contact}
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
            name="SC_ID"
            value={formData.SC_ID}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.SC_ID} value={category.SC_ID}>
                {category.SC_Name}
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
        {/* Input fields for staff registration */}
        {/* Include similar structure as in StudentRegisterPage.jsx */}
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
}

export default StaffRegisterPage;
