import React from "react";
import "./EmployeeCreate.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const EmployeeCreate = () => {
  // State variables for employee information
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [active, setActive] = useState(true);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create employee information object
    const empInfo = { name, email, phone, active };

    // Make a POST request to create an employee
    fetch(`http://localhost:8000/employee`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(empInfo),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`Error creating an employee`);
      } else {
        response
          .json()
          .then(() => {
            // Display success message, navigate to the home page
            alert("Employee Created Successfully!!");
            navigate("/");
          })
          .catch((error) => {
            throw error;
          });
      }
    });
  };

  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          {/* Employee creation form */}
          <form
            className="container"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="card">
              <div className="card-title">
                <h2>Create Employee</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  {/* Employee ID */}
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Employeed Id:</label>
                      <input
                        className="form-control"
                        value={id}
                        onChange={(e) => {
                          setId(e.target.value);
                        }}
                        disabled
                      ></input>
                    </div>
                  </div>
                  {/* Employee Name */}
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Name:</label>
                      <input
                        required
                        className="form-control"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      ></input>
                    </div>
                  </div>
                  {/* Employee Email */}
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Email:</label>
                      <input
                        required
                        className="form-control"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      ></input>
                    </div>
                  </div>
                  {/* Employee Phone */}
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Phone:</label>
                      <input
                        required
                        className="form-control"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                        }}
                      ></input>
                    </div>
                  </div>
                  {/* Employee Active status */}
                  <div className="col-lg-12">
                    <div className="form-check">
                      <input
                        checked={active}
                        onChange={(e) => {
                          setActive(e.target.checked);
                        }}
                        type="checkbox"
                        className="form-check-input"
                      ></input>
                      <label className="form-check-label">Is Active</label>
                    </div>
                  </div>
                  {/* Save and Back buttons */}
                  <div className="col-lg-12">
                    <div className="form-group">
                      <button className="btn btn-success" type="submit">
                        Save
                      </button>
                      <Link to="/">
                        <button className="btn btn-primary">Back</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCreate;
