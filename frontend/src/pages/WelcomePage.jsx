
// import React from 'react';
// import { Navbar, Nav } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap';
// import './welcome.css'; // Import CSS file for styling
// import myImage from '../../images/101.svg';

// function WelcomePage() {
//   return (
//     <div>
//       {/* <Navbar style={{ background: 'linear-gradient(to right, #ff7e5f, #feb47b)', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} expand="lg">
//         <Navbar.Brand style={{ fontFamily: 'Arial', fontSize: '24px', color: '#fff' }} href="#home">Welcome Page</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="mr-auto">
//             <LinkContainer to="/students">
//               <Nav.Link>Students</Nav.Link>
//             </LinkContainer>
//             <LinkContainer to="/teachers">
//               <Nav.Link>Teachers</Nav.Link>
//             </LinkContainer>
//             <LinkContainer to="/staffs">
//               <Nav.Link>Staff</Nav.Link>
//             </LinkContainer>
//           </Nav>
//           <Nav>
//             <LinkContainer to="/register/student">
//               <Nav.Link>Register as Student</Nav.Link>
//             </LinkContainer>
//             <LinkContainer to="/register/teacher">
//               <Nav.Link>Register as Teacher</Nav.Link>
//             </LinkContainer>
//             <LinkContainer to="/register/staff">
//               <Nav.Link>Register as Staff</Nav.Link>
//             </LinkContainer>

//             <LinkContainer to="/admin/login">
//               <Nav.Link>Admin</Nav.Link>
//             </LinkContainer>


//           </Nav>
//         </Navbar.Collapse>
//       </Navbar> */}


//       {/* Your other content goes here */}
//       <div className="welcome-image-container d-flex justify-content-center align-items-center">
//                 <img src={myImage} alt="Welcome" className="img-fluid welcome-image" style={{ maxWidth: '50%', maxHeight: '20%', width: 'auto', height: 'auto' }} />
//             </div>
//     </div>
//   );
// }

// export default WelcomePage;

import React from 'react';
import './welcome.css'; // Import CSS file for styling
import myImage from '../../images/101.svg';
function WelcomePage() {
  return (
    <div className="welcome-image-container d-flex justify-content-center align-items-center">
      <img src={myImage} alt="Welcome" className="img-fluid welcome-image" style={{ maxWidth: '50%', maxHeight: '20%', width: 'auto', height: 'auto' }} />
      <div className="welcome-container">
      </div>
      <div className="welcome-content">
        <h1 className="welcome-heading">Welcome to University of Chittagong</h1>
        <p className="welcome-text">Explore our student,teacher,and staff. Meet our faculty, and discover the opportunities waiting for you.</p>
      </div>
      <div className="welcome-image-container">
        <img src={myImage} alt="Welcome" className="img-fluid welcome-image" />
      </div>
    </div>
  );
}

export default WelcomePage;
