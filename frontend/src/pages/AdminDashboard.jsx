
import React from "react";
import { Link } from "react-router-dom";

function AdminDashboard() {
    return (
        <div className="container">
            <h1 className="my-4 text-center">Admin Dashboard</h1>
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body text-center">
                            <h5 className="card-title">Student Operations</h5>
                            <p className="card-text">Perform operations on student data.</p>
                            <Link to="/admin/student" className="btn btn-primary">Go to Student Operations</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body text-center">
                            <h5 className="card-title">Teacher Operations</h5>
                            <p className="card-text">Perform operations on teacher data.</p>
                            <Link to="/admin/teacher" className="btn btn-primary">Go to Teacher Operations</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body text-center">
                            <h5 className="card-title">Staff Operations</h5>
                            <p className="card-text">Perform operations on staff data.</p>
                            <Link to="/admin/staff" className="btn btn-primary">Go to Staff Operations</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
