// //  HERE IS THE WELCOME PAGE

// import React from 'react';
// import './welcome.css'; // Import CSS file for styling
// import myImage from '../../images/101.svg';
// function WelcomePage() {
//   return (
//     <div className="welcome-image-container d-flex justify-content-center align-items-center">
//       <img src={myImage} alt="Welcome" className="img-fluid welcome-image" style={{ maxWidth: '50%', maxHeight: '10%', width: '10%', height: '10%' }} />

//       <div className="welcome-container">
//       </div>
//       <div className="welcome-content">
//         <h1 className="welcome-heading">Welcome to University of Chittagong</h1>
//         <p className="welcome-text">Explore our student,teacher,and staff. Meet our faculty, and discover the opportunities waiting for you.</p>
//       </div>
//       <div className="welcome-image-container">
//         <img src={myImage} alt="Welcome" className="img-fluid welcome-image" />
//       </div>
//     </div>
//   );
// }

// export default WelcomePage;

import React from "react";
import "./welcome.css"; // Import CSS file for styling
import myImage from "../../images/101.svg";

function WelcomePage() {
  return (
    <div className="welcome-container">
      <div className="welcome-image-container d-flex justify-content-center align-items-center">
        <img
          src={myImage}
          alt="Welcome"
          className="img-fluid welcome-image"
          style={{
            // maxWidth: "1000%",
            // maxHeight: "40%",
            width: "70%",
            height: "70%",
          }}
        />
      </div>
      <div className="welcome-content text-center">
        <h1 className="welcome-heading">Welcome to University of Chittagong</h1>
        <p className="welcome-text">
          Explore our student, teacher, and staff. Meet our faculty, and
          discover the opportunities waiting for you.
        </p>
      </div>
    </div>
  );
}

export default WelcomePage;
