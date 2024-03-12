const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3001;
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "cu infosis",
});

app.use(cors());
con.connect((error) => {
  if (error) {
    console.error("Error connecting to MySQL database:", error);
  } else {
    console.log("Connected to MySQL database");
  }
});

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); // Destination folder for uploaded images
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Unique filename for each uploaded image
  },
});

const upload = multer({ storage: storage });

// 888888888888888888888888888888888888888888888888888888888888888

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (
    (username === "faysal" && password === "1234") ||
    (username === "rifat" && password === "1234") ||
    (username === "saima" && password === "1234") ||
    (username === "arman" && password === "1234")
  ) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// Route to update student data
app.put("/student/:id", upload.single("image"), (req, res) => {
  const studentId = req.params.id;
  const { ST_Name, ST_Gmail, ST_Contact, ST_Batch, Dept_ID } = req.body;
  const pictureURL = req.file ? req.file.path : null; // Get the path of the uploaded image or null if no image is uploaded

  console.log("Received PATCH request to update student with ID:", studentId);
  console.log("Updated student data:", {
    ST_Name,
    ST_Gmail,
    ST_Contact,
    ST_Batch,
    Dept_ID,
    pictureURL,
  });

  const query = `
      UPDATE student_table
      SET ST_Name = ?, ST_Gmail = ?, ST_Contact = ?, ST_Batch = ?, Dept_ID = ?, pictureURL = ?
      WHERE ST_ID = ?
  `;
  const values = [
    ST_Name,
    ST_Gmail,
    ST_Contact,
    ST_Batch,
    Dept_ID,
    pictureURL,
    studentId,
  ];

  con.query(query, values, (error, results) => {
    if (error) {
      console.error("Error updating student:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json({ message: "Student updated successfully" });
    }
  });
});

// Route to delete a student
app.delete("/student/:id", (req, res) => {
  const studentId = req.params.id;
  const query = `
    DELETE FROM student_table
    WHERE ST_ID = ?
  `;
  con.query(query, studentId, (error, results) => {
    if (error) {
      console.error("Error deleting student:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json({ message: "Student deleted successfully" });
    }
  });
});

// Route to update teacher data
app.put("/teacher/:id", upload.single("image"), (req, res) => {
  const teacherId = req.params.id;
  const { T_Name, T_Gmail, T_Contact, Dept_ID, C_ID } = req.body;
  const pictureURL = req.file ? req.file.path : null; // Get the path of the uploaded image or null if no image is uploaded

  console.log("Received PUT request to update teacher with ID:", teacherId);
  console.log("Updated teacher data:", {
    T_Name,
    T_Gmail,
    T_Contact,
    Dept_ID,
    C_ID,
    pictureURL,
  });

  const query = `
      UPDATE teacher_table
      SET T_Name = ?, T_Gmail = ?, T_Contact = ?, Dept_ID = ?, C_ID = ?, pictureURL = ?
      WHERE T_ID = ?
  `;
  const values = [
    T_Name,
    T_Gmail,
    T_Contact,
    Dept_ID,
    C_ID,
    pictureURL,
    teacherId,
  ];

  con.query(query, values, (error, results) => {
    if (error) {
      console.error("Error updating teacher:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json({ message: "Teacher updated successfully" });
    }
  });
});

// Route to delete a teacher
app.delete("/teacher/:id", (req, res) => {
  const teacherId = req.params.id;
  const query = `
    DELETE FROM teacher_table
    WHERE T_ID = ?
  `;
  con.query(query, teacherId, (error, results) => {
    if (error) {
      console.error("Error deleting teacher:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json({ message: "Teacher deleted successfully" });
    }
  });
});

// Route to update staff data
app.put("/staff/:id", upload.single("image"), (req, res) => {
  const staffId = req.params.id;
  const { STF_Name, STF_Gmail, STF_Contact, Dept_ID } = req.body;
  const pictureURL = req.file ? req.file.path : null; // Get the path of the uploaded image or null if no image is uploaded

  console.log("Received PUT request to update staff with ID:", staffId);
  console.log("Updated staff data:", {
    STF_Name,
    STF_Gmail,
    STF_Contact,
    Dept_ID,
    pictureURL,
  });

  const query = `
      UPDATE staff_table
      SET STF_Name = ?, STF_Gmail = ?, STF_Contact = ?, Dept_ID = ?, pictureURL = ?
      WHERE STF_ID = ?
  `;
  const values = [
    STF_Name,
    STF_Gmail,
    STF_Contact,
    Dept_ID,
    pictureURL,
    staffId,
  ];

  con.query(query, values, (error, results) => {
    if (error) {
      console.error("Error updating staff:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json({ message: "Staff updated successfully" });
    }
  });
});

// Route to delete a staff
app.delete("/staff/:id", (req, res) => {
  const staffId = req.params.id;
  const query = `
    DELETE FROM staff_table
    WHERE STF_ID = ?
  `;
  con.query(query, staffId, (error, results) => {
    if (error) {
      console.error("Error deleting staff:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json({ message: "Staff deleted successfully" });
    }
  });
});

// Route to fetch student data
app.get("/student", (req, res) => {
  const query = `
  SELECT *, f.Fac_Name
  FROM student_table s
  INNER JOIN department_table d ON s.Dept_ID = d.Dept_ID
  INNER JOIN faculty_table f ON d.Fac_ID = f.Fac_ID
`;
  con.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching student data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

// Route to register a new student with image upload
// app.post('/register/student', upload.single('image'), (req, res) => {
//   const { ST_ID, ST_Name, ST_Gmail, ST_Contact, ST_Batch, Dept_ID } = req.body;
//   const pictureURL = req.file ? req.file.path : null; // Get the path of the uploaded image or null if no image is uploaded
//   const query = `
//     INSERT INTO student_table (ST_ID, ST_Name, ST_Gmail, ST_Contact, ST_Batch, Dept_ID, pictureURL)
//     VALUES (?, ?, ?, ?, ?, ?, ?)
//   `;
//   const values = [ST_ID, ST_Name, ST_Gmail, ST_Contact, ST_Batch, Dept_ID, pictureURL];
//   con.query(query, values, (error, results) => {
//     if (error) {
//       console.error('Error registering student:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     } else {
//       res.json({ message: 'Student registered successfully' });
//     }
//   });
// });

app.post("/register/student", upload.single("image"), async (req, res) => {
  const { ST_ID, ST_Name, ST_Gmail, ST_Contact, ST_Batch, Dept_ID } = req.body;
  const pictureURL = req.file ? req.file.path : null; // Get the path of the uploaded image or null if no image is uploaded

  try {
    // Check if a student with the provided email already exists
    const existingStudentByEmail = await new Promise((resolve, reject) => {
      con.query(
        "SELECT * FROM student_table WHERE ST_Gmail = ?",
        [ST_Gmail],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results.length > 0);
          }
        }
      );
    });

    if (existingStudentByEmail) {
      return res
        .status(400)
        .json({ error: "Student with this email already exists" });
    }

    // Check if a student with the provided contact already exists
    const existingStudentByContact = await new Promise((resolve, reject) => {
      con.query(
        "SELECT * FROM student_table WHERE ST_Contact = ?",
        [ST_Contact],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results.length > 0);
          }
        }
      );
    });

    if (existingStudentByContact) {
      return res
        .status(400)
        .json({ error: "Student with this contact already exists" });
    }

    // If no existing student with the provided email or contact, proceed to register
    const query = `
      INSERT INTO student_table (ST_ID, ST_Name, ST_Gmail, ST_Contact, ST_Batch, Dept_ID, pictureURL)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      ST_ID,
      ST_Name,
      ST_Gmail,
      ST_Contact,
      ST_Batch,
      Dept_ID,
      pictureURL,
    ];
    con.query(query, values, (error, results) => {
      if (error) {
        console.error("Error registering student:", error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.json({ message: "Student registered successfully" });
      }
    });
  } catch (error) {
    console.error("Error registering student:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to fetch teacher data with department information
app.get("/teacher", (req, res) => {
  const query = `
    SELECT *,f.Fac_Name
    FROM teacher_table t
    INNER JOIN department_table d ON t.Dept_ID = d.Dept_ID
    INNER JOIN teacher_category_table tc ON t.C_ID = tc.C_ID
    INNER JOIN faculty_table f ON d.Fac_ID = f.Fac_ID
  `;
  con.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching teacher data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

// Route to register a new teacher
// app.post("/register/teacher", (req, res) => {
//   const { T_ID, T_Name, T_Gmail, T_Contact, Dept_ID, C_ID } = req.body;
//   const query = `
//     INSERT INTO teacher_table (  T_ID, T_Name, T_Gmail, T_Contact, Dept_ID, C_ID)
//     VALUES ( ?, ?, ?, ?, ?, ?)
//   `;
//   const values = [T_ID, T_Name, T_Gmail, T_Contact, Dept_ID, C_ID];
//   con.query(query, values, (error, results) => {
//     if (error) {
//       console.error("Error registering teacher:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     } else {
//       res.json({ message: "Teacher registered successfully" });
//     }
//   });
// });

app.post("/register/teacher", upload.single("image"), async (req, res) => {
  const { T_ID, T_Name, T_Gmail, T_Contact, Dept_ID, C_ID } = req.body;
  const pictureURL = req.file ? req.file.path : null; // Get the path of the uploaded image or null if no image is uploaded

  try {
    // Check if a teacher with the provided email already exists
    const existingTeacherByEmail = await new Promise((resolve, reject) => {
      con.query(
        "SELECT * FROM teacher_table WHERE T_Gmail = ?",
        [T_Gmail],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results.length > 0);
          }
        }
      );
    });

    if (existingTeacherByEmail) {
      return res
        .status(400)
        .json({ error: "Teacher with this email already exists" });
    }

    // Check if a teacher with the provided contact already exists
    const existingTeacherByContact = await new Promise((resolve, reject) => {
      con.query(
        "SELECT * FROM teacher_table WHERE T_Contact = ?",
        [T_Contact],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results.length > 0);
          }
        }
      );
    });

    if (existingTeacherByContact) {
      return res
        .status(400)
        .json({ error: "Teacher with this contact already exists" });
    }

    // If no existing teacher with the provided email or contact, proceed to register
    const query = `
      INSERT INTO teacher_table (T_ID, T_Name, T_Gmail, T_Contact, Dept_ID, C_ID, pictureURL)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      T_ID,
      T_Name,
      T_Gmail,
      T_Contact,
      Dept_ID,
      C_ID,
      pictureURL,
    ];
    con.query(query, values, (error, results) => {
      if (error) {
        console.error("Error registering teacher:", error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.json({ message: "Teacher registered successfully" });
      }
    });
  } catch (error) {
    console.error("Error registering teacher:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Route to fetch staff data with department and category information
app.get("/staff", (req, res) => {
  const query = `
  SELECT *,f.Fac_Name
  FROM staff_table st
  INNER JOIN department_table d ON st.Dept_ID = d.Dept_ID
  INNER JOIN stuff_category_table sc ON st.SC_ID = sc.SC_ID
  INNER JOIN faculty_table f ON d.Fac_ID = f.Fac_ID
  `;
  con.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching staff data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

// Route to register a new staff
// app.post("/register/staff", (req, res) => {
//   const { STF_ID, STF_Name, STF_Gmail, STF_Contact, Dept_ID, SC_ID } = req.body;
//   const query = `
//     INSERT INTO staff_table (STF_ID, STF_Name, STF_Gmail, STF_Contact, Dept_ID, SC_ID)
//     VALUES (?, ?, ?, ?, ?, ?)
//   `;
//   const values = [STF_ID, STF_Name, STF_Gmail, STF_Contact, Dept_ID, SC_ID];
//   con.query(query, values, (error, results) => {
//     if (error) {
//       console.error("Error registering staff:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     } else {
//       res.json({ message: "Staff registered successfully" });
//     }
//   });
// });

app.post("/register/staff",upload.single("image"), async (req, res) => {
  const { STF_ID, STF_Name, STF_Gmail, STF_Contact, Dept_ID, SC_ID } = req.body;
  const pictureURL = req.file ? req.file.path : null;
  try {
    // Check if a staff member with the provided email already exists
    const existingStaffByEmail = await new Promise((resolve, reject) => {
      con.query(
        "SELECT * FROM staff_table WHERE STF_Gmail = ?",
        [STF_Gmail],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results.length > 0);
          }
        }
      );
    });

    if (existingStaffByEmail) {
      return res
        .status(400)
        .json({ error: "Staff member with this email already exists" });
    }

    // Check if a staff member with the provided contact already exists
    const existingStaffByContact = await new Promise((resolve, reject) => {
      con.query(
        "SELECT * FROM staff_table WHERE STF_Contact = ?",
        [STF_Contact],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results.length > 0);
          }
        }
      );
    });

    if (existingStaffByContact) {
      return res
        .status(400)
        .json({ error: "Staff member with this contact already exists" });
    }

    // If no existing staff member with the provided email or contact, proceed to register
    const query = `
      INSERT INTO staff_table (STF_ID, STF_Name, STF_Gmail, STF_Contact, Dept_ID, SC_ID ,pictureURL)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [STF_ID, STF_Name, STF_Gmail, STF_Contact, Dept_ID, SC_ID, pictureURL];

    con.query(query, values, (error, results) => {
      if (error) {
        console.error("Error registering staff:", error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.json({ message: "Staff registered successfully" });
      }
    });
  } catch (error) {
    console.error("Error registering staff:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




// Add a route to fetch department names
app.get("/departments", (req, res) => {
  const query = `
    SELECT Dept_ID, Dept_Name
    FROM department_table
  `;
  con.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching departments:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});



// Route to fetch teacher categories
app.get("/categories", (req, res) => {
  const query = `
    SELECT C_ID, C_Name
    FROM teacher_category_table
  `;
  con.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});




// Route to fetch staff categories
app.get("/staff-categories", (req, res) => {
  const query = `
    SELECT SC_ID, SC_Name
    FROM stuff_category_table
  `;
  con.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching staff categories:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
