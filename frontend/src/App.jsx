// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import WelcomePage from './pages/WelcomePage';
// import StudentPage from './pages/StudentPage';
// import TeacherPage from './pages/TeacherPage';
// import StaffPage from './pages/StaffPage';
// import StudentRegisterPage from './pages/StudentRegisterPage';
// import TeacherRegisterPage from './pages/TeacherRegisterPage';
// import StaffRegisterPage from './pages/StaffRegisterPage';


// import AdminLoginPage from './pages/AdminLoginPage';
// import AdminDashboard from './pages/AdminDashboard';

// import StudentOperationsPage from './pages/StudentOperationsPage';
// import TeacherOperationsPage from './pages/TeacherOperationsPage'; // Import TeacherOperationsPage
// import StaffOperationsPage from './pages/StaffOperationsPage'; //

// import UpdateStudentForm from './pages/UpdateStudentForm';
// import UpdateTeacherForm from './pages/UpdateTeacherForm';
// import UpdateStaffForm from './pages/UpdateStaffForm';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path='/' element={<WelcomePage />} />
//         <Route path='/students' element={<StudentPage />} />
//         <Route path='/teachers' element={<TeacherPage />} />
//         <Route path='/staffs' element={<StaffPage />} />
//         <Route path='/register/student' element={<StudentRegisterPage />} />
//         <Route path='/register/teacher' element={<TeacherRegisterPage />} />
//         <Route path='/register/staff' element={<StaffRegisterPage />} />

//         <Route path='/admin/login' element={<AdminLoginPage />} />
//         <Route path='/admin' element={<AdminDashboard />} />

//         <Route path='/admin/student' element={<StudentOperationsPage />} />
//         <Route path='/admin/teacher' element={<TeacherOperationsPage />} /> // Add route for TeacherOperationsPage
//         <Route path='/admin/staff' element={<StaffOperationsPage />} />

//         <Route path='/admin/student/update/:studentId' element={<UpdateStudentForm />} />
//         <Route path='/admin/teacher/update/:teacherId' element={<UpdateTeacherForm />} />
//         <Route path='/admin/staff/update/:staffId' element={<UpdateStaffForm />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Layout'; // Import your layout component
import WelcomePage from './pages/WelcomePage';
import StudentPage from './pages/StudentPage';
import TeacherPage from './pages/TeacherPage';
import StaffPage from './pages/StaffPage';
import StudentRegisterPage from './pages/StudentRegisterPage';
import TeacherRegisterPage from './pages/TeacherRegisterPage';
import StaffRegisterPage from './pages/StaffRegisterPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import StudentOperationsPage from './pages/StudentOperationsPage';
import UpdateStudentForm from './pages/UpdateStudentForm';
import UpdateTeacherForm from './pages/UpdateTeacherForm';
import UpdateStaffForm from './pages/UpdateStaffForm';
import TeacherOperationsPage from './pages/TeacherOperationsPage'; // Import TeacherOperationsPage
import StaffOperationsPage from './pages/StaffOperationsPage'; // Import StaffOperationsPage

function App() {
  return (
    <Router>
      <Layout> {/* Wrap all routes with Layout component */}
        <Routes>
          <Route path='/' element={<WelcomePage />} />
          <Route path='/students' element={<StudentPage />} />
          <Route path='/teachers' element={<TeacherPage />} />
          <Route path='/staffs' element={<StaffPage />} />
          <Route path='/register/student' element={<StudentRegisterPage />} />
          <Route path='/register/teacher' element={<TeacherRegisterPage />} />
          <Route path='/register/staff' element={<StaffRegisterPage />} />
          <Route path='/admin/login' element={<AdminLoginPage />} />
          <Route path='/admin' element={<AdminDashboard />} />
          <Route path='/admin/student' element={<StudentOperationsPage />} />
          <Route path='/admin/student/update/:studentId' element={<UpdateStudentForm />} />
          <Route path='/admin/teacher/update/:teacherId' element={<UpdateTeacherForm />} />
          <Route path='/admin/staff/update/:staffId' element={<UpdateStaffForm />} />
          <Route path='/admin/teacher' element={<TeacherOperationsPage />} /> // Add route for TeacherOperationsPage
          <Route path='/admin/staff' element={<StaffOperationsPage />} /> // Add route for StaffOperationsPage
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;



